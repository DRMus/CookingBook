import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FilesModule } from 'src/files/files.module';
import { IngredientsModule } from 'src/ingredients/ingredients.module';

@Module({
  providers: [RecipesService],
  controllers: [RecipesController],
  imports: [DatabaseModule, FilesModule, IngredientsModule]
})
export class RecipesModule {}
