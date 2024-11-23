import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'Teste',
    required: true,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'teste@gmail.com',
    required: true,
  })
  @IsEmail({}, { message: 'Insira um e-mail válido' })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'Teste@123',
    required: true,
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve conter no mínimo 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial',
    },
  )
  password: string;

  @ApiProperty({
    description: 'O cargo do usuário',
    example: 'ADMIN',
    required: true,
  })
  @IsEnum(Role)
  role: Role;
}
