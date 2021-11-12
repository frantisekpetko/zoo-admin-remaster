import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CommandsService } from '../commands/commands.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, CommandsService],
})
export class UploadModule {}
