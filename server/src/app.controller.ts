import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from './dto/CreateUser';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
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
