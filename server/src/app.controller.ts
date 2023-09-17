import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser, CreateUserResponse } from './dto/CreateUser';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Пользователи")
@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @ApiResponse({status: 200, type: CreateUserResponse})
  @Post("create")
  async create(@Body() dto: CreateUser) {

    const dtoForCreate: CreateUser = {
      likes: "",
      ...dto
    }
    const res = await this.appService.saveSome(dtoForCreate);
    return res;
  }
}
