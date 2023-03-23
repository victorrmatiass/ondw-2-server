import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;
}
