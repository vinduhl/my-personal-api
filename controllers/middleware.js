const skills = require("../skills/skillz");

module.exports = {

  addHeaders(req, res, next) {
    res.status(200).set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "default-src 'self' devmountain.github.io"
    });

    next();
  },

  generatedId(req, res, next) {
    const nextId = skills.length + 1;
    req.body.id = nextId;
    next();
  },

  verifyUser(req, res, next) {
    let username = req.params.username;
    let pin = req.params.pin;

    if(username === "vinduhl" && pin === "123456") {
      next();
    } else {
      res.status(401).json({ "message": "You are unauthorized to get secrets!" });
    }

  }

}
