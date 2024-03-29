import { Message, IMessage } from '../../src/models/Message';
import { MessageCreate, MessageUpdate } from '../../src/models/MessageCreateAndUpdate';
import { MessageService } from '../../src/services/MessageService';

const messages = [
    {
        id: '12345',
        message: 'racecar',
        palindrome: true,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        id: "12348",
        message: 'abc',
        palindrome: false,
        active: true,
        created_at: new Date(),
        updated_at: new Date()
    }
]

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

describe('MessageService', () => {
    describe('getMessage', () =>{
        test('should return all messages', async () => {
            const id = messages[0].id;

            const findSpy = jest.spyOn(Message, 'findOne').mockResolvedValueOnce(messages[0] as IMessage);

            const result = await new MessageService().get(id);

            expect(findSpy).toHaveBeenCalledWith({id});
            expect(result).toHaveProperty('id', id);
        });

        test('should throw 404 if message not found', async () => {
            const id = messages[0].id;

            const findSpy = jest.spyOn(Message, 'findOne').mockResolvedValueOnce(null);

            await expect(new MessageService().get(id)).rejects.toThrowError('Message not found');

            expect(findSpy).toHaveBeenCalledWith({id});

        })
    })

    describe('createMessage', () => {
        test('should create message', async () => {
            const input: MessageCreate = {
                message: 'abba',
            }

            const saveSpy = jest.spyOn(Message.prototype, 'save').mockImplementation();

            const result = await new MessageService().create(input);

            expect(saveSpy).toBeCalledTimes(1);
            expect(result).toHaveProperty('palindrome', true);
        })
    })

    describe('updateMessage', () => {
        test('should update message', async () => {
            const input: MessageUpdate = {
                message: 'civic'
            }
            const findSpy = jest.spyOn(Message, 'findOne').mockResolvedValueOnce(new Message(messages[1]));
            const saveSpy = jest.spyOn(Message.prototype, 'save').mockImplementation();

            const result = await new MessageService().update(messages[1].id, input);

            expect(findSpy).toBeCalledWith({id: messages[1].id});
            expect(saveSpy).toBeCalledTimes(1);
            expect(result).toHaveProperty('palindrome', true);
        })

        test('should throw 404 if message not found', async () => {
            const input: MessageUpdate = {
                message: 'civic'
            }
            const id = messages[1].id;

            const findSpy = jest.spyOn(Message, 'findOne').mockResolvedValueOnce(null);

            await expect(new MessageService().update(messages[1].id, input)).rejects.toThrowError('Message not found');

            expect(findSpy).toHaveBeenCalledWith({id});
        })
    })
});