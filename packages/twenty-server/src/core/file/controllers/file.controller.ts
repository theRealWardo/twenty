import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { checkFilePath, checkFilename } from 'src/core/file/file.utils';
import { FilePathGuard } from 'src/core/file/guards/file-path-guard';
import { FileService } from 'src/core/file/services/file.service';

// TODO: Add cookie authentication
@Controller('files')
@UseGuards(FilePathGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Serve files from local storage
   * We recommend using an s3 bucket for production
   */
  @Get('*/:filename')
  async getFile(@Param() params: string[], @Res() res: Response) {
    console.log('params', params);
    const folderPath = checkFilePath(params[0]);
    const filename = checkFilename(params['filename']);
    const fileStream = await this.fileService.getFileStream(
      folderPath,
      filename,
    );

    fileStream.on('error', () => {
      res.status(404).send({ error: 'File not found' });
    });

    // console.log('fileStream', fileStream);
    fileStream.pipe(res);
  }
}
