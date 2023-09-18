import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { FilesModule } from './files/files.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    RecipesModule,
    FilesModule,
    IngredientsModule,
  ],
  providers: [UsersService],
})
export class AppModule {}
