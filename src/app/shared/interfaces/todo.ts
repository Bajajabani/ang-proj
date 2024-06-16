export interface Todo {
    "id": number,
    "todo": string,
    "completed": boolean,
    "userId": number
}

export interface TodoDelete {
    "id": number,
    "todo": string,
    "completed": boolean,
    "userId": number,
    "isDeleted": boolean,
    "deletedOn": string
}
