const Comments = require('../models/Comment');
const Notes = require('../models/Note')

const writeComment = async (req,res,next) => {
    try {
        const { text } = req.body
        if(!text) {
            throw new Error("Comment can't be blank");
        }
        const note = await Notes.findById(req.params.id);
        const comment = await Comments.create({
            toNote:req.params.id,
            toUser:note.user,
            fromUser:req.user.name,
            text:text,

        });
        res.status(200).json(comment);
    }catch(error){
        next(error);
    }
};

const getComments = async (req,res,next) => {
    try {
        const allcomments = await Comments.find({toNote:req.params.id});
        res.status(200).json(allcomments);
    }catch(error){
        next(error)
    }
}

module.exports = { writeComment, getComments };