import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../connections/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateUserDto) {
    const user = await this.findByEmail(data.email);

    if (user) {
      throw new BadRequestException('Usuário já cadastrado');

    }

    return this.prismaService.user.create({ data });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
