import { Types } from "mongoose"

enum NoteType {
    bugreport,
    featurerequest,
}

export type Note = {
    title: string,
    content: string,
    type: NoteType,
    userId: string,
    images: string[],
    project: Types.ObjectId
}