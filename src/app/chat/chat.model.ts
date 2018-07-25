export interface Message {
    username: string;
    message: string;
    userId: string;
    created?: any; // optional field
    createdAt?: any; // optional field
    updatedAt?: any; // optional field
}