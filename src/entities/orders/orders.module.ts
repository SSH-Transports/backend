import { Module } from '@nestjs/common';
import { WebsocketsModule } from 'src/websockets/websockets.module';
import { PrismaService } from '../../connections/prisma/prisma.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [WebsocketsModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
  exports: [OrdersService],
})
export class OrdersModule { }
