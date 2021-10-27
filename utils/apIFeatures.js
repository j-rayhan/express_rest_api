
class AppFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filter(){
        const queryOb = {...this.queryString}
        const excludedFields = ['page', 'limit', 'sort', 'fields']
        excludedFields.forEach(el => delete queryOb[el]);
        
        let queryStr = JSON.stringify(queryOb);
        queryStr = queryStr.replace(/\b(get|gt|lte|lt)\b/g, match => `$${match}`);
        
        console.log('FFF --------filter------->', queryStr);
        this.query = this.query.find(JSON.parse(queryStr))

        return this;
    }

    sort () {
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').reduce((a, item) =>{ 
                const key = `${item}`.startsWith('-') ? item.split('-')[1] : item 
                const value = `${item}`.startsWith('-') ? -1 : 1 
                return ({ ...a, [key]: value})
            }, {}) 
        this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort({'createdAt': 1});
        }
        return this;
    }

    limitFields(){
        if(this.queryString.fields){
        const fields = this.queryString.fields.split(',').reduce((a, item) => ({ ...a, [item]: 1}), {}) ;
        console.log('FFF limitFields --------------->', fields);
        this.query = this.query.project(fields)
        } 
        return this;
    }

    paginate(){
        let { page, limit } = this.queryString;
        page = page * 1 || 1
        limit = limit * 1 || 20
        const skip = (page - 1) * limit
        console.log('FFF paginate --------------->', page, limit, skip);

        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}

module.exports = AppFeatures;
