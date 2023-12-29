const Category = require("../models/categories")

const categories_get = (req, res) => {
	Category.find()
		.then(result => res.send(result))
		.catch(err => console.log(err))
}

const categories_post = (req, res) => {
	const category = new Category({
		title: "Inne",
		backgroundColor: "#059669",
	})

	category
		.save()
		.then(result => res.send(result))
		.catch(err => console.log(err))
}

module.exports = {
	categories_get,
	categories_post,
}
