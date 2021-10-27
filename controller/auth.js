
// const { validationResult } = require("express-validator/check");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// //
// const config = require('../config/auth.config');
// const User = require("../models/user.model");

exports.signin = async (req, res) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     errors: errors.array()
  //   });
  // }

  // const { email, password } = req.body;
  // try {
  //   let user = await User.findOne({
  //     email
  //   });
  //   if (!user)
  //     return res.status(400).json({
  //       message: "User Not Exist"
  //     });

  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch)
  //     return res.status(400).json({
  //       message: "Incorrect Password !"
  //     });

  //   const payload = {
  //     user: {
  //       id: user.id
  //     }
  //   };

  //   jwt.sign(
  //     payload,
  //     config.secret,
  //     {
  //       expiresIn: 86400 * 3 // 24 hours
  //     },
  //     (err, token) => {
  //       if (err) throw err;
  //       res.status(200).json({
  //         token
  //       });
  //     }
  //   );
  // } catch (e) {
  //   console.error(e);
  //   res.status(500).json({
  //     message: "Server Error"
  //   });
  // }
}

exports.changePassword = async (req, res) => {
  // try {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({
  //       errors: errors.array()
  //     });
  //   }

  //   const { password } = req.body;
    
  //   // request.user is getting fetched from Middleware after token authentication
  //   User.findById(req.user.id).exec(async (err, user) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //     }
  //     if (user) {
  //       const salt = await bcrypt.genSalt(10);
  //       user.password = await bcrypt.hash(password, salt);
  //       await user.save();
  //       res.status(200).json({ message: "Password updated successfully!" });
  //     }
  //   })

  // } catch (e) {
  //   res.send({ message: "Error in updating password" });
  // }
}