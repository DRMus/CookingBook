import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const filename = uuid.v4() + '.png';
      const filepath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
      }
      fs.writeFileSync(path.join(filepath, filename), file.buffer);
      return filename;
    } catch (e) {
      throw new HttpException(
        { message: 'Ошибка при записи файла' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
