import mongoose, { Model, Document } from "mongoose";

export interface IMessage extends Document {
    id: string;
    message: string;
    palindrome: boolean;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    archived_at?: Date;
}

const messageSchema = new mongoose.Schema({
    id: {
        auto: true,
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
        minlength: 1
    },
    palindrome: {
        type: Boolean,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    archived_at: {
        type: Date,
    }
});

messageSchema.set('timestamps', true);

const Message: Model<IMessage> = mongoose.model('Message', messageSchema);
export { Message };