const mongoose = require('mongoose');

const uri = process.env.DB_URI;

module.exports = {
  async connectToMongoDB(callback) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // eslint-disable-next-line no-console
      console.log('Connected to DB !!');
      return callback();
    } catch (e) {
      return callback(e);
    }
  },
};
