import { IMessage } from "../models/Message";
import { MessageOutput } from "../models/MessageCreateAndUpdate";

export default class MessageTransformer{
    static outgoing = (data: IMessage): MessageOutput => ({
        id: data.id,
        message: data.message,
        palindrome: data.palindrome,
        active: data.active,
        created_at: data.created_at,
        updated_at: data.updated_at,
        archived_at: data.archived_at,
    }) 
}