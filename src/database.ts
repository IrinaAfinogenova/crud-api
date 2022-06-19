export interface UserInfo {
    userName: string;
    age: number;
    hobbies: string[]
}

export interface User extends UserInfo {
    id: string;
}

export const USERS: Record<string, User> = {};
