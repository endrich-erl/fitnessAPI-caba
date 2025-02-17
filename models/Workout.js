const mongoose = require('mongoose');

//[SECTION]Schema/Blueprint
const workoutSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is Required']
	},
	duration: {
		type: Number,
		required: [true, 'Duration is Required']
	},
	dateAdded: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		default: 'On Progress'
	}

})

//[SECTION] Model
module.exports = mongoose.model('Workout', workoutSchema)