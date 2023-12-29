const mongoose = require("mongoose")

const Schema = mongoose.Schema

const categorySchema = Schema(
	{
		title: {
			type: String,
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

const Category = mongoose.model("Category", categorySchema)

module.exports = Category
