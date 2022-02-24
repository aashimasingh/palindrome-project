export interface Message {
    id: number;
    message: string;
    palindrome: boolean;
}

export interface MessageCreate {
    message: string;
}