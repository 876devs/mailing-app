var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mailing');

var ClientSchema = mongoose.Schema({
		name: {type: String, required: true},
		email: {type: String, required: true, unique: true},
		created: {type: Date, required: true, default: Date.now()}
	});

module.exports = mongoose.model('Client', ClientSchema);