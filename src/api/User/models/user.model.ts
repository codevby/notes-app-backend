enum UserRole {
    developer,
    user,
}

export type User = {
    name: string,
    email: string,
    password: string,
    status: boolean,
    role: UserRole,
}