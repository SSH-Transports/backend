import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  @Get(':userId')
  async getUserNotifications(@Param('userId') userId: string) {
    console.log('userId', userId);
    
    return this.notificationsService.getUserNotifications(userId);
  } 
}
