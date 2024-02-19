const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken
};


async function login(req, res) {

    console.log(req.body.email)  
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      res.json( createJWT(user) );
    } catch {
      res.status(400).json('Login Failed');
    }
  }

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
};

// Helper functions

function createJWT(user) {
    console.log("hello")
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

function checkToken(req, res) {
    console.log('req.user', req.user);
    res.json(req.exp);
}