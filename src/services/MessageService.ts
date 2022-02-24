import { Message, MessageCreate } from "../models/Message";

export class MessageService {
    public get(id: number, message?: string): Message {
        return {
            id,
            message: 'banana',
            palindrome: false
        }
    }

    public create(message: MessageCreate): Message {
        return {
            id: Math.floor(Math.random() * 10000),
            message: message.message,
            palindrome: false,
        }
    }
}