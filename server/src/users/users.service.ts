import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUser } from './dto/CreateUser';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly recipesService: RecipesService,
  ) {}

  async getAllUsers() {
    return this.databaseService.user.findMany({
      include: { created_recipes: true },
    });
  }

  async getOneUserById(id: number) {
    return this.databaseService.user.findFirst({ where: { id } });
  }

  async getOneUserByUsername(username: string) {
    return this.databaseService.user.findFirst({ where: { username } });
  }

  async createUser(dto: CreateUser) {
    const newUser: CreateUser = {
      likes: '',
      ...dto,
    };
    return this.databaseService.user.create({ data: newUser });
  }

  async deleteUserById(id: number) {
    return this.databaseService.user.delete({ where: { id } });
  }

  async getUserLikes(id: number) {
    return this.databaseService.user.findFirst({
      where: { id },
      select: { likes: true },
    });
  }

  async getUserRecipes(id: number) {
    const userRecipes = await this.databaseService.user.findFirst({
      where: { id },
      select: { created_recipes: true },
    });
    const recipesIdList = userRecipes.created_recipes.map((item) => item.id);

    const favoriteRecipes =
      await this.recipesService.getAllRecipesByIdList(recipesIdList);

    return favoriteRecipes;
  }

  async addLikeUserById(id: number, recipeId: number) {
    const user = await this.databaseService.user.findFirst({ where: { id } });

    const userLikes = user.likes.split(',');
    const isRecipeIncluded = userLikes.find(
      (item) => item === recipeId.toString(),
    );

    if (!isRecipeIncluded) {
      userLikes.push(`${recipeId}`);
    }

    user.likes = userLikes.length > 0 ? userLikes.join(',') : '';

    const recipe = await this.databaseService.recipe.findFirst({
      where: { id: recipeId },
      select: { likes: true },
    });

    recipe.likes++;

    await this.databaseService.recipe.update({
      where: { id: recipeId },
      data: recipe,
    });

    return this.databaseService.user.update({ where: { id }, data: user });
  }

  async deleteUserLikeById(id: number, recipeId: number) {
    const user = await this.databaseService.user.findFirst({ where: { id } });

    const userLikes = user.likes
      .split(',')
      .filter((item) => item !== recipeId.toString());

    user.likes = userLikes.length > 0 ? userLikes.join(',') : '';

    const recipe = await this.databaseService.recipe.findFirst({
      where: { id: recipeId },
      select: { likes: true },
    });

    recipe.likes--;

    await this.databaseService.recipe.update({
      where: { id: recipeId },
      data: recipe,
    });

    return this.databaseService.user.update({ where: { id }, data: user });
  }

  async getUserFavorites(id: number) {
    const userFavorites = await this.databaseService.user.findFirst({
      where: { id },
      select: { likes: true },
    });
    const favoritesIdList = userFavorites.likes.split(',').map((item) => +item);

    const favoriteRecipes =
      await this.recipesService.getAllRecipesByIdList(favoritesIdList);

    return favoriteRecipes;
  }
}
