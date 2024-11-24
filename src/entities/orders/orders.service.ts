import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../connections/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) { }

  create(data: CreateOrderDto) {
    return this.prismaService.order.create({ data });
  }

  findAll() {
    return this.prismaService.order.findMany();
  }

  findOne(id: string) {
    return this.prismaService.order.findUniqueOrThrow({ where: { id } });
  }
}
