import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { CreateUser, UserResponse } from 'src/users/dto/CreateUser';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /** Авторизация пользователя */
  async login(userDto: CreateUser) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  /** Регистрация пользователя */
  async registration(userDto: CreateUser) {
    /** Проверка на существование пользователя с таким логином в бд */
    const candidate = await this.usersService.getOneUserByUsername(
      userDto.username,
    );
    if (candidate) {
      throw new HttpException(
        'Данный логин уже используется',
        HttpStatus.BAD_REQUEST,
      );
    }

    /** Хеширование пароля */
    const hashedPassword = await hash(userDto.password, 10);
    userDto.password = hashedPassword;

    /** Создание пользователя в бд и отправка данных на создание токена */
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  /** Валидация полученного пользователя */
  private async validateUser(userDto: CreateUser) {
    /** Поиск пользователя в бд */
    const user = await this.usersService.getOneUserByUsername(userDto.username);

    if (!user) {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
    }

    /** Проверка на верность введенного пароль */
    const isPasswordEquals = await compare(userDto.password, user.password);

    /** Если user найден и пароль введен верно, возвращаем пользователя,
     *  иначе выбрасываем ошибку
     *  */
    if (user && isPasswordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
  }

  /** Генерация токена */
  private async generateToken(user: UserResponse) {
    const payload = { username: user.username, id: user.id, likes: user.likes };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
