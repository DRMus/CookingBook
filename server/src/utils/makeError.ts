import { BadRequestException } from '@nestjs/common';

export function makeError(exception: any) {
  switch (exception.name) {
    case 'PrismaClientKnownRequestError':
      if (exception.code === 'P2002') {
        throw new BadRequestException({
          message: 'Данный никнейм уже используется',
          ...exception.meta,
        });
      }
      throw new BadRequestException(exception);
    default:
      throw new BadRequestException(exception);
  }
}
