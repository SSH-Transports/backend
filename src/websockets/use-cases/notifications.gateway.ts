import { NotFoundException } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationStatus, NotificationType, OrderStatus } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/connections/prisma/prisma.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('sendNotification')
  async handleNotifyUser(
    @MessageBody() data: {
      userId: string;
      title: string;
      message: string;
      type: NotificationType;
      orderId: string;
      orderStatus: OrderStatus;
      link?: string;
    }
  ): Promise<void> {
    const order = await this.prismaService.order.findUnique({
      where: { id: data.orderId }
    })

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const { courierId, customerId } = order;

    if (data.type === NotificationType.ORDER) {
      await Promise.all(
        [courierId, customerId].map(
          async (userId) => {
            if (!userId) return;

            await this.prismaService.notification.create({
              data: {
                type: data.type,
                link: data.link,
                title: data.title,
                message: data.message,
                status: NotificationStatus.UNREAD,
                userId,
              }
            });

            this.server.emit('notification', data);
          })
      )
    }

    await this.prismaService.order.update({
      where: { id: data.orderId },
      data: { status: data.orderStatus }
    });

    this.server.emit('notification', data);
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody() ids: string[]
  ): Promise<void> {
    await this.prismaService.notification.updateMany({
      where: { id: { in: ids } },
      data: { status: NotificationStatus.READ }
    });
  }
}
