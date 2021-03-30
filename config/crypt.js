var bcrypt = require('bcrypt');
var saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

var Crypt = function(data) {
	return Crypt.crypt(data);
};

Crypt.crypt = function(data) {
	return bcrypt.hashSync(String(data), salt);
};

Crypt.compare = function(data, to) {
   return bcrypt.compareSync(String(data), to);
};

module.exports = Crypt;