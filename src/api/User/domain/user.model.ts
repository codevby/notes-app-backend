import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    status:{
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        required: true,
        enum: ['developer', 'user'],
    }
}, { discriminatorKey: 'role'} );

export const UserModel = mongoose.model("User", UserSchema);

export const Developer = UserModel.discriminator('Developer', new mongoose.Schema({
    projects:{
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project',
            },
        ],
    }
}));