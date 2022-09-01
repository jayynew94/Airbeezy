// backend/routes/api/users.js
const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  '/',
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password });
    
      if(user.email){
        res.status(403)
        res.json({
          message: "User already exists",
          statusCode: 403,
          errors: {
            email: "User with that email already exists",
          },
        });
      }

    const token = setTokenCookie(res, user)
    const signUpUser = user.toJSON()
    return res.json({
      id: signUpUser.id,
      firstName: signUpUser.firstName,
      lastName: signUpUser.lastName,
      email: signUpUser.email,
      username: signUpUser.username,
      token,
    
    });
  }
);


module.exports = router;
