const express = require("express")
const noteController = require("../controllers/noteController")

const router = express.Router()

router.get("/", noteController.note_index)
// router.get("/create", noteController.note_post)
router.get("/:id", noteController.note_details_get)
router.put("/:id", noteController.note_details_put)
router.delete("/:id", noteController.note_details_delete)
router.post("/", noteController.note_post)

module.exports = router
