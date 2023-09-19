import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUser } from 'src/users/dto/CreateUser';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/AuthDto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Авторизация')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post('login')
  async login(@Body() userDto: CreateUser) {
    const res = await this.authService.login(userDto);
    return res;
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post('registration')
  async registration(@Body() userDto: CreateUser) {
    const res = await this.authService.registration(userDto);
    return res;
  }

  @ApiOperation({ summary: 'Проверка токена' })
  @ApiResponse({ status: 200, type: "boolean" })
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyUser() {
    return true
  }
}
