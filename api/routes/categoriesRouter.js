const express = require("express")
const categoryController = require("../controllers/categoryController")

const router = express.Router()

router.get("/", categoryController.categories_get)
router.get("/create", categoryController.categories_post)

module.exports = router
