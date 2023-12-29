const mongoose = require("mongoose")

const Schema = mongoose.Schema

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: false,
		},
		category: {
			type: String,
			required: true,
		},
		isFavourite: {
			type: Boolean,
			required: true,
		},
		backgroundColor: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
)

const Note = mongoose.model("Note", noteSchema)
module.exports = Note
