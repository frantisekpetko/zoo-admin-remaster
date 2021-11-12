import { Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  async upload() {
    await this.uploadService.upload();
  }
}
