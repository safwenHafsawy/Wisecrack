const express = require('express');
const noteCntrl = require('../controllers/notesCntrl');
const router = express.Router();
const auth = require("../middleware/auth");

router.get('/notes',auth ,noteCntrl.notes);
router.post('/createnote', auth, noteCntrl.createNote);
router.put('/updatenotes/:id',auth , noteCntrl.updateNote);
router.get('/notes/:id',auth ,noteCntrl.findNote);
router.delete('/notes/:id',auth ,noteCntrl.deleteNote);

module.exports = router; 