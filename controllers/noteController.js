const Notes = require("../models/Note");

const createNote = async (req,res,next) => {
    try {
        const { title, desc, cat } = req.body
        if(!title || !desc){
            throw new Error("Content are required")
        }
        if(req.user?._id){
            let note = await Notes.findOne({title});
            if(note){
                throw new Error('This title already used');
            }
            note = await Notes.create({
                title,
                desc,
                cat,
                img:req.file.filename,
                user:req.user._id
            })
            res.status(200).json(note)
        }
    } catch(error){
        next(error);
    }
};

const getAllNotes = async (req,res,next) => {
    const qCat = req.query.cat
    try{
        let note;
        if(qCat){
            note = await Notes.find({cat:{
                $in: [qCat],
            }});
        }else {
            note = await Notes.find();
        };

        if(note.length === 0){
            throw new Error('There are no notes');
        };
        res.status(200).json(note);
    }catch(error){
        next(error)
    }
};

const getMyNotes = async (req,res,next) => {
    try{
        if(req.user?._id) {
            let note = await Notes.find({user: req.user._id});
        if(!note){
            throw new Error('There are no notes');
        }
        res.status(200).json(note)
        }
    }catch(error){
        next(error)
    }
};

const getNote = async (req,res,next) => {
    try{
        if(req.user?._id){
            let note = await Notes.findById(req.params.id);
            if(!note){
                throw new Error('Note not found');
            };
            res.status(200).json(note);
        }
    }catch(error){
        next(error);
    }
};

const updateNote = async (req,res,next) => {
    try {
        const { title, desc } = req.body;
        if(!title || !desc) {
            throw new Error('Please enter content for updating');
        }
        let note = await Notes.findOne({_id:req.params.id,user:req.user._id});
        if(!note){
            throw new Error('Note not found');
        };
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id,{
            $set:{
                title,
                desc,
                img:req.file.filename
            }
        },{new:true});
        res.status(200).json(updatedNote);
    }catch(error){
        next(error)
    }
};

const deleteNote = async (req,res,next) => {
    try {
        let note = await Notes.findOne({_id:req.params.id,user:req.user._id});
        if(!note) {
            throw new Error('Note not found')
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json("Note deleted successfully");
    }catch(error){
        next(error);
    }
};

const adminUpdateNote = async (req,res,next) => {
    try {
        const { title, desc } = req.body;
        if(!title || !desc) {
            throw new Error('Please enter content for updating');
        }
        let note = await Notes.findById(req.params.id);
        if(!note){
            throw new Error('Note not found');
        };
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id,{
            $set:{
                title,
                desc,
                img:req.file.filename
            }
        },{new:true});
        res.status(200).json(updatedNote);
    }catch(error){
        next(error)
    }
};

const adminDeleteNote = async (req,res,next) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) {
            throw new Error('Note not found')
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json("Note deleted successfully");
    }catch(error){
        next(error);
    }
};


module.exports = { createNote, getAllNotes, getMyNotes, getNote, updateNote, deleteNote, adminUpdateNote, adminDeleteNote };