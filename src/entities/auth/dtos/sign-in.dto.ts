import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
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
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;

  @ApiProperty({
    description: 'Propriedade que define se está vindo do web ou mobile',
    example: false,
    required: true,
  })
  @IsBoolean({ message: 'A propriedade isFromMobile deve ser um booleano' })
  isFromMobile: boolean;
}
