import { Module } from '@nestjs/common';
import { NotificationsGateway } from './use-cases/notifications.gateway';

@Module({
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class WebsocketsModule {}
