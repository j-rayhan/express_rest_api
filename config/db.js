const mongoose = require('mongoose')
const uri = process.env.DB_URI

module.exports = {
  connectToMongoDB: async function (callback) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('Connected to DB !!')
      return callback()
    } catch (e) {
      console.log('DB connection error', e)
      return callback(e)
    }
  },
}
