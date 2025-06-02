import { Types } from "mongoose"

export type User = {
    name: string,
    email: string,
    password: string,
    status: boolean,
    projects: Types.ObjectId[]
}

export type Token = {
    username: string;
    userId: string;
    status: boolean;
}