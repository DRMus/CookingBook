import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { FilesModule } from './files/files.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { ServeStaticModule} from "@nestjs/serve-static"
import * as path from 'path';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    RecipesModule,
    FilesModule,
    IngredientsModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static")
    })
  ],
  providers: [UsersService],
})
export class AppModule {}
