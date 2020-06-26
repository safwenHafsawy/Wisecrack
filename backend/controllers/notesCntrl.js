const Note = require('../models/notesModel');

exports.createNote = (req, res, next) =>{
    const { jwtPayload } = req
    const note = new Note({
        title : req.body.title,
        description : req.body.description,
        user : jwtPayload.user 
    });

    note.save().then(
        () => {
            res.status(201).json({ message : 'note saved succefully !'});
        }
    ).catch(
        (error) => {
            res.status(400).json({error : error});
        }
    )
    };

exports.findNote = (req, res, next) => {
    Note.findOne({
        _id : req.params.id
    }).then(
        (note) => {
            res.status(200).json(note);
        }
    ).catch(
        (error) => {
            res.status(404).json({error : error});
        }
    )
};

exports.updateNote = (req, res, next) => {
    const note = new Note({
        _id : req.params.id,
        title : req.body.title,
        description : req.body.description
    })
    Note.updateOne({ _id: req.params.id }, note).then(
        () => {
            res.status(201).json({message : 'updated successfully ! '});
        }
    ).catch(
        (error) => {
            res.status(400).json({ error : error });
        }
    )
};

exports.deleteNote = (req, res, next) => {
    Note.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({ message : 'Deleted successfully !'});
        }
    ).catch (
        (error) => {
            res.status(400).json({ error : error });
        }
    )
};

exports.notes = (req, res, next ) => {
    const { jwtPayload } = req
    Note.find({ user : jwtPayload.user }).then((notes)=>{
        res.status(200).json(notes)
    }).catch((error) => {
        res.status(404).json({
            message : 'No notes found !'
        })
    });
};
