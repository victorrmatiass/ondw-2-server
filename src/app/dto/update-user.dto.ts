import { IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Preencha o nome' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 carac.' })
  firstName: string;

  @IsNotEmpty({ message: 'Preencha o sobrenome' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 carac.' })
  lastName: string;

  @IsEmail(undefined, { message: 'Informe um email válido.' })
  @IsNotEmpty({ message: 'Preencha o email.' })
  @MaxLength(255, { message: 'Tamanho máximo é de 255 carac.' })
  email: string;
}
