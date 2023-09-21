import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Ингредиенты')
@Controller('api/ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {

  }

  @ApiOperation({ summary: 'Получение всех ингредиентов' })
  @Get()
  async getAll() {
    return await this.ingredientsService.getAllIngredients();
  }
}
