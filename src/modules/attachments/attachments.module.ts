import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnAttachment } from './entities/attachment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EnAttachment])],
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
})
export class AttachmentsModule {}
