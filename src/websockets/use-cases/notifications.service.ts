import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../connections/prisma/prisma.service';
import { NotificationStatus } from '@prisma/client';
import { CreateNotificationDTO } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateNotificationDTO) {
    await this.prismaService.notification.create({
      data: {
        title: data.title,
        message: data.message,
        type: data.type,
        status: NotificationStatus.UNREAD,
        user: {
          connect: { id: data.userId },
        },
      }
    });
    return this.prismaService.notification.create({ data });
  }

  getUserNotifications(userId: string) {
    return this.prismaService.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
  }

  async markAsRead(ids: string[]) {
    await this.prismaService.notification.updateMany({
      where: { id: { in: ids } },
      data: { status: NotificationStatus.READ },
    });
  }
}
