import {
    Body,
    Controller,
    Get,
    Put,
    Delete,
    Path,
    Post,
    Query,
    Response,
    Route,
    SuccessResponse,
  } from "tsoa";
import { ApiError } from "../models/ApiError";
  import { MessageOutput, MessageCreate, MessageUpdate } from "../models/MessageCreateAndUpdate";
  import { MessageService } from "../services/MessageService";
import MessageTransformer from "../transformers/MessageTransformer";
  
  @Route("messages")
  export class MessageController extends Controller {
    @SuccessResponse(200, "Message found")
    @Get("{messageId}")
    @Response<ApiError>(404, "Message not found")
    public async getMessage(
      @Path() messageId: string,
    ): Promise<MessageOutput> {
      const message = await new MessageService().get(messageId);
      return MessageTransformer.outgoing(message);
    }

    @SuccessResponse(200, "Message found")
    @Get()
    public async getMessages(
      @Query() message?: string,
      @Query() active?: boolean
    ): Promise<MessageOutput[]> {
      const messages = await new MessageService().filterMessages({
          message,
          active
      });
      return messages.map((i) => MessageTransformer.outgoing(i));
    }
  
    @SuccessResponse("201", "Message created") // Custom success response
    @Post()
    @Response<ApiError>(400, "Message cannot be empty")
    @Response<ApiError>(500, "Message could not be saved")
    public async createMessage(
      @Body() requestBody: MessageCreate
    ): Promise<MessageOutput> {
      this.setStatus(201); // set return status 201
      const message = await new MessageService().create(requestBody);
      return MessageTransformer.outgoing(message);
    }

    @SuccessResponse("201", "Message updated") // Custom success response
    @Put("{messageId}")
    @Response<ApiError>(404, "Message not found")
    public async updateMessage(
      @Path() messageId: string,
      @Body() requestBody: MessageUpdate
    ): Promise<MessageOutput> {
      this.setStatus(201); // set return status 201
      const message = await new MessageService().update(messageId, {
          message: requestBody.message,
          reactivate: requestBody.reactivate,
      });
      return message;
    }

    @SuccessResponse("201", "Message deleted") // Custom success response
    @Delete("{messageId}")
    @Response<ApiError>(404, "Message not found")
    public async deleteMessage(
      @Path() messageId: string,
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      await new MessageService().delete(messageId);
      return;
    }
  }