export interface Message {
    username: string;
    message: string;
    userId: string;
    isUpdated?: boolean;
    _id?: string;
    created?: any; // optional field
    createdAt?: any; // optional field
    updatedAt?: any; // optional field
}