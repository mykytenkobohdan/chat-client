export interface Message {
    username: string;
    message: string;
    userId: string;
    isRemoved?: boolean;
    isUpdated?: boolean;
    _id?: string;
    createdAt?: any; // optional field
    updatedAt?: any; // optional field
}