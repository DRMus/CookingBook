import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('api/ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {

  }

  @Get()
  async getAll() {
    return await this.ingredientsService.getAllIngredients();
  }
}
