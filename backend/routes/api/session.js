// backend/routes/api/session.js
const express = require("express");
const { setTokenCookie, requireAuth, restoreUser} = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();




const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  const token = setTokenCookie(res, user);
  const currUser = user.toJSON();
  return res.json({
    id: currUser.id,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    username: currUser.username,
    token,
  });
});

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

//Get current User
router.get("/", restoreUser, async (req, res) => {
  const user = req.user;
  if(user){
  console.log();
  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  });
}else {
  return res.json(null)
}
});







module.exports = router;
