import { Module } from '@nestjs/common';
import { PrismaService } from '../../connections/prisma/prisma.service';
import { OrdersController } from './order.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
  exports: [OrdersService],
})
export class OrdersModule {}
