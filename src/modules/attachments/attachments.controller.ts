import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Post()
  async CreateAttach(@Res() response, @Body() createAttachmentDto: CreateAttachmentDto) {
    try {
      const newAttach = await this.attachmentsService.createAttach(createAttachmentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Attachment has been created successfully',
        newAttach,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json(
        {
          statusCode: 400,
          message: 'Error: Attachment not created!',
          error: 'Bad Request',
        },
        response.error,
      );
    }
  }

  @Get()
  async getAttachs(@Res() response) {
    try {
      const allAttachData = await this.attachmentsService.getAllAttach();
      return response.status(HttpStatus.OK).json({
        message: 'All Attachments data found successfully',
        allAttachData,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json({ Mesage: 'Error in Fetching All Attachments' }, error.response);
    }
  }

  @Put('/:id')
  async updateAttach(
    @Res() response,
    @Param('id') attachId: number,
    @Body() updateAttachmentDto: UpdateAttachmentDto,
  ) {
    try {
      const updatedAttach = await this.attachmentsService.updateAttach(
        attachId,
        updateAttachmentDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Attachment has been successfully updated',
        updatedAttach,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json(
          { Mesage: 'Error in Updating this Particular Attachment' },
          error.response,
        );
    }
  }

  @Get('/:id')
  async getAttach(@Res() response, @Param('id') attachId: number) {
    try {
      const fetchedAttach = await this.attachmentsService.getAttach(attachId);
      return response.status(HttpStatus.OK).json({
        message: 'Attachment found successfully',
        fetchedAttach,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json(
          { Mesage: 'Error in Fetching this Particular Attachment' },
          error.response,
        );
    }
  }

  @Delete('/:id')
  async deleteAttach(@Res() response, @Param('id') attachId: number) {
    try {
      const deletedAttach = await this.attachmentsService.deleteAttach(attachId);
      return response.status(HttpStatus.OK).json({
        message: 'Attachment Deleted successfully',
        deletedAttach,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json({ Mesage: 'Error in Deleting this Attachment' }, error.response);
    }
  }
}
