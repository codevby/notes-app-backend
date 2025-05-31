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
}