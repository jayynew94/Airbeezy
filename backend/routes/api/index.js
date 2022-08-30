// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews')
const { restoreUser } = require("../../utils/auth.js");



// GET /api/set-token-cookie
const { setTokenCookie,requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});



router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/spots", spotsRouter)

router.use('/reviews', reviewsRouter)





module.exports = router;
