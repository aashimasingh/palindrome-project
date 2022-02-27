import { ApiError } from "../models/ApiError";
import { IMessage, Message } from "../models/Message";
import { MessageCreate, MessageFilter, MessageUpdate } from "../models/MessageCreateAndUpdate";

export class MessageService {
    public async get(id: string): Promise<IMessage> {
        const message = await Message.findOne({id});
        if (!message) {
            throw new ApiError("MessageNotFound", 404, "Message not found");
        }
        return message;
    }

    public async filterMessages(messageFilter: MessageFilter): Promise<IMessage[]> {
        const messages = await Message.find({
            message: messageFilter.message ?? { $exists: true },
            active: messageFilter.active ?? { $exists: true }
        }).exec();
        return messages;
    }

    public async create(message: MessageCreate): Promise<IMessage> {
        if (message.message.length === 0) {
            throw new ApiError("BadRequest", 400, "Message cannot be empty");
        }
        const createdMessage: IMessage = new Message({
            message: message.message,
            palindrome: this.checkPalindrome(message.message),
            active: true
        });
        try {
            await createdMessage.save();
            return createdMessage;
        } catch (err) {
            throw new ApiError("InternalServerError", 500, "Message could not be saved");
        }
    }

    public async update(id: string, messageUpdate: MessageUpdate): Promise<IMessage> {
        const message: IMessage | null = await Message.findOne({id});
        if (!message) {
            throw new ApiError("MessageNotFound", 404, "Message not found");
        }
        message.message = messageUpdate.message ?? message.message;
        message.active = messageUpdate.reactivate ? true : message.active;
        message.archived_at = messageUpdate.reactivate ? undefined : message.archived_at;
        message.palindrome = this.checkPalindrome(message.message);
        message.updated_at = new Date();
        await message.save();
        return message;
    }

    public async delete(messageId: string): Promise<void> {
        const message = await Message.findOne({id: messageId});
        if (!message) {
            throw new ApiError("MessageNotFound", 404, "Message not found");
        }
        message.active = false;
        message.archived_at = new Date();
        await message.save();
    }

    private checkPalindrome = (message: string) : boolean => {
        const len = message.length;
        for (let i = 0; i < len/2; i++) {
            if (message[i] !== message[len-i-1]) {
                return false;
            }
        }
        return true;
    }
}