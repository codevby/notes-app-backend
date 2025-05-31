import mongoose, { Schema } from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the title of the note'],
        trim: true,
    },
    content: {
        type: String,
    },
    type: {
        type: String,
        required: [true, 'Please enter the type of the note'],
        enum: ['bugreport', 'featurerequest'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter the user who created the note'],
    },
    images: {
        type: [String],
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    }
})

export const NoteModel = mongoose.model('Note', NoteSchema)