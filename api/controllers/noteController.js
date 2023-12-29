const Note = require("../models/notes")

const note_index = (req, res) => {
	Note.find()
		.sort({ isFavourite: -1, createdAt: -1 })
		.then(result => res.send(result))
		.catch(err => console.log(err))
}

const note_details_get = (req, res) => {
	const id = req.params.id

	Note.findById(id)
		.then(result => res.send(result))
		.catch(err => console.log(err))
}

const note_details_put = (req, res) => {
	const id = req.params.id

	Note.findByIdAndUpdate({ _id: id }, req.body)
		.then(result => res.send(result))
		.catch(err => console.log(err))
}

const note_details_delete = (req, res) => {
	const id = req.params.id

	Note.findByIdAndDelete(id)
		.then(response => res.send(response))
		.catch(err => console.log(err))
}

const note_post = (req, res) => {
	const newNote = req.body
	console.log(newNote)
	if (newNote.title === "") {
		return res.status(400).send("Uzupełnij Tytuł")
	}

	if (newNote.category === "") {
		return res.status(400).send("Uzupełnij Kategorię")
	}
	const note = new Note(newNote)

	note
		.save()
		.then(result => res.send(result))
		.catch(err => console.log(err))
}

module.exports = {
	note_index,
	note_post,
	note_details_get,
	note_details_put,
	note_details_delete,
}
