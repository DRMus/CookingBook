import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { DatabaseModule } from 'src/database/database.module';
import { IngredientsController } from './ingredients.controller';

@Module({
  providers: [IngredientsService],
  imports: [DatabaseModule],
  exports: [IngredientsService],
  controllers: [IngredientsController]
})
export class IngredientsModule {}
