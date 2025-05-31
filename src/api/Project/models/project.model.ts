import { Note } from "../../Note/models/note.model";

export interface Project {
    _id: string;
    name: string;
    description: string;
    images: string[];
    links: string[];
    user: string;
    status: boolean;
    notes: Note[];
}