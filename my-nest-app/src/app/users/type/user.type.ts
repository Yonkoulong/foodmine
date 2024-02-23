export type UserData = {
    user: UserType,
    records: Records;
}

export type UserType = {
    id: string;
    username: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export type Records = {
    page: number;
    limit: number;
    total: number;
}