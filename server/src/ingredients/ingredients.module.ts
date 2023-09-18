import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [IngredientsService],
  imports: [DatabaseModule],
  exports: [IngredientsService]
})
export class IngredientsModule {}
