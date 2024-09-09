import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../connections/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prismaService.user.create({ data });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findById(id: string) {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUniqueOrThrow({ where: { email } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
