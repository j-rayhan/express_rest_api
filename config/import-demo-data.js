/* eslint-disable no-console */
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const db = require('./db');
const { User, Employee, Car, Tour } = require('../models');

const employees = JSON.parse(fs.readFileSync(`${__dirname}/demo-data/employee.json`, 'utf-8'));
const cars = JSON.parse(fs.readFileSync(`${__dirname}/demo-data/car.json`, 'utf-8'));
const tours = JSON.parse(fs.readFileSync(`${__dirname}/demo-data/tour.json`, 'utf-8'));

// create a admin user
const admin = new User({
  username: 'johir',
  email: 'johir@admin.com',
  password: 'johirAdmin',
  role: 'Admin',
  designation: 'CEO',
});
// create a POS user
const user = new User({
  username: 'johir_pos',
  email: 'johir@pos.com',
  password: 'johirPos',
  designation: 'Employee',
});

// delete
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Tour.deleteMany();
    await Car.deleteMany();
    await Employee.deleteMany();
    console.log('deleted done ✅');
  } catch (error) {
    console.error('delete ERROR 🏮========>', error);
  }
  process.exit();
};

// import
const importDemoData = async () => {
  try {
    await admin.save();
    await user.save();
    await Tour.create(tours);
    await Car.create(cars);
    await Employee.create(employees);
    console.log('Item create done ✅');

    // fetch the user and test password verification
    const adminUser = await User.findOne({ username: 'johir' });
    let isMatch = await adminUser.validatePassword('johirAdmin');
    // adminUser.validatePassword('johirAdmin', (err, isMatch) => {
    //   if (err) throw err;
    console.log('johirAdmin:', isMatch); // -&gt; johirAdmin: true
    // });
    // test a failing password
    isMatch = await adminUser.validatePassword('123Password');
    console.log('123Password:', isMatch); // -&gt; 123Password: false
    console.log('User login test done ✅');
  } catch (error) {
    console.error('import ERROR 💣 ========>', error);
  }
  process.exit();
};

db.connectToMongoDB((err) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the demo data insert // delete
  if (process.argv[2] === '--import') { importDemoData(); }
  if (process.argv[2] === '--delete') { deleteData(); }
});

console.log('Process.argv 👉 ============>', process.argv);
// node config/import-demo-data.js --import
// node config/import-demo-data.js --delete
// process.argv[2] === '--import'
