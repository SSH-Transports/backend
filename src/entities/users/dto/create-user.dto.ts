import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'teste@gmail.com',
    required: true,
  })
  @IsEmail({}, { message: 'Insira um e-mail válido' })
  email;

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
  password;

  @ApiProperty({
    description: 'O cargo do usuário',
    example: 'ADMIN',
    required: true,
  })
  @IsEnum(Role)
  role;
}
