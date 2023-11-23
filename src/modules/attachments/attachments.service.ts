import { CreateHistoryDto } from './../history/dto/create-history.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnAttachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentsService {

  constructor(@InjectRepository(EnAttachment)
  private attachRepository: Repository<EnAttachment>) { }

  async createAttach(createAttachmentDto: CreateAttachmentDto): Promise<EnAttachment> {
    const newAttach = this.attachRepository.create(createAttachmentDto);
    return this.attachRepository.save(newAttach);
  }

  //   Get All the Attachments 
  async getAllAttach(): Promise<EnAttachment[]> {
    const AttachData = await this.attachRepository.find();
    if (!AttachData || AttachData.length == 0) {
      throw new NotFoundException('Attachments data not found!');
    }
    return AttachData;
  }

  //   Get the Attachments against particular Id
  async getAttach(attachId: number): Promise<EnAttachment> {
    const existingAttach = await this.attachRepository.findOne({
      where: { id: attachId }, // Assuming the primary key is named 'id'
    });

    if (!existingAttach) {
      throw new NotFoundException(`Attachment #${attachId} not found`);
    }

    return existingAttach;
  }

  //   Delete the Attachment against particular Id
  async deleteAttach(attachId: number): Promise<EnAttachment> {
    const existingAttach = await this.attachRepository.findOne({
      where: { id: attachId }, // Assuming the primary key is named 'id'
    });

    if (!existingAttach) {
      throw new NotFoundException(`Attachment #${attachId} not found`);
    }

    await this.attachRepository.remove(existingAttach);

    return existingAttach;
  }


  //   Update the Attachment against particular Id
  async updateAttach(attachId: number, updateAttachmentDto: UpdateAttachmentDto): Promise<EnAttachment> {
    const existingAttach = await this.attachRepository.findOne({
      where: { id: attachId }, // Assuming the primary key is named 'id'
    });


    if (!existingAttach) {
      throw new NotFoundException(`Attachment #${attachId} not found`);
    }

    // Merge the existing Attachment with the new data
    this.attachRepository.merge(existingAttach, updateAttachmentDto);

    // Save the updated Attachment
    const updatedAttach = await this.attachRepository.save(existingAttach);

    return updatedAttach;
  }
}
