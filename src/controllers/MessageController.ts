import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
  } from "tsoa";
  import { Message, MessageCreate } from "../models/Message";
  import { MessageService } from "../services/MessageService";
  
  @Route("messages")
  export class MessageController extends Controller {
    @SuccessResponse(200, "Message found")
    @Get("{messageId}")
    public async getMessage(
      @Path() messageId: number,
      @Query() message?: string
    ): Promise<Message> {
      return new MessageService().get(messageId, message);
    }
  
    @SuccessResponse("201", "Message created") // Custom success response
    @Post()
    public async createMessage(
      @Body() requestBody: MessageCreate
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      new MessageService().create(requestBody);
      return;
    }
  }