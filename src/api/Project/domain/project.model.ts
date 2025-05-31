import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the project'],
        trim: true,
        maxlength: [100, 'Name must be shorter than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please enter the description of the project'],
        trim: true,
        maxlength: [1000, 'Description must be shorter than 1000 characters'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please enter the user who created the project'],
    },
    images: {
        type: [String],
        trim: true,
        maxlength: [100, 'Image must be shorter than 100 characters'],
    },
    links: {
        type: [String],
        trim: true,
        maxlength: [100, 'Link must be shorter than 100 characters'],
    },
    status: {
        type: Boolean,
    },
    notes: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Note',
            },
        ],
    },
});

export const ProjectModel = mongoose.model("Project", ProjectSchema);