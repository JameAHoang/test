const jwt = require("jsonwebtoken");
const { env } = require("../config/environment");

const authMiddleware = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },

  verifiyTokenAndAdminAuth: (req, res, next) => {
    authMiddleware.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.admin) {
        next();
      } else {
        res
          .status(403)
          .json("You do not have permission to perform this function");
      }
    });
  },
};

module.exports = authMiddleware;
