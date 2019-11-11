const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
        let { username, password } = req.headers;
        
        if (username && password ) {
            Users.findBy({ username })
            .first()
            .then(user => {
              if (user && bcrypt.compareSync(password, user.password )) {
                next();
              } else {
                res.status(401).json({ message: 'Invalid Credentials' });
              }
            })
            .catch(error => {
              res.status(500).json({message: 'Ran into an error in the db'});
            });
        } else {
            res.status(400).json({message: 'Please provide credentials'})
        }
}