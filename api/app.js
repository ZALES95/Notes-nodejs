const express = require("express")
const mongoose = require("mongoose")
const notesRouter = require("./routes/notesRouter")
const categoriesRouter = require("./routes/categoriesRouter")
const cors = require("cors")

const app = express()

const dbURI =
	"mongodb+srv://jakub7zalewski7:Zales2006@cluster0.cepie6h.mongodb.net/notesdb?retryWrites=true&w=majority"

mongoose
	.connect(dbURI, { useNewUrlParser: true })
	.then(result => app.listen(5000))
	.catch(err => console.log(err))

mongoose.set("useFindAndModify", false)
// przekodowanie danych
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
		optionsSuccessStatus: 204,
	})
)
app.use(express.json())

app.get("/", (req, res) => {
	res.redirect("/notes")
})

app.use("/notes", notesRouter)
app.use("/categories", categoriesRouter)
