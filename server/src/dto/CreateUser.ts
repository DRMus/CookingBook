import { ApiProperty } from "@nestjs/swagger";

export class CreateUser {
  @ApiProperty({example: "hello"})
  username: string;

  @ApiProperty({example: "123456"})
  password: string;

  likes: string;
}

export class CreateUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  likes: string;
  
  @ApiProperty()
  created_at: string;
}