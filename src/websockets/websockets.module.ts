import { Module } from '@nestjs/common';
import { PrismaService } from 'src/connections/prisma/prisma.service';
import { NotificationsController } from './use-cases/notifications.controller';
import { NotificationsGateway } from './use-cases/notifications.gateway';
import { NotificationsService } from './use-cases/notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsGateway, NotificationsService, PrismaService],
  exports: [NotificationsGateway],
})
export class WebsocketsModule { }
