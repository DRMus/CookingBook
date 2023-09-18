import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
/** Модуль доступа пользователя */
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /** Отлавливаем запрос */
    const req = context.switchToHttp().getRequest();

    try {
      /** Достаем из хедера токен */
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      /** Проверка на существование и верность токена */
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
