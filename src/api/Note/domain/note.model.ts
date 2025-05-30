import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
    }
})

export const NoteModel = mongoose.model('Note', NoteSchema)