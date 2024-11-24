import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.clients.set(userId, client);
      console.log(`User ${userId} connected`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = Array.from(this.clients.entries())
      .find(([, socket]) => socket.id === client.id)?.[0];
    if (userId) {
      this.clients.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  }

  notifyUser(userId: string, message: string) {
    const client = this.clients.get(userId);
    if (client) {
      console.log(`User ${userId} notified`);
      console.log(`Message: ${message}`);
      client.emit('delivery-notification', message);
    } else {
      console.log(`User ${userId} not connected`);
    }
  }

  notifyAll(message: string) {
    console.log('Notifying all users');
    console.log(`Message: ${message}`);
    this.server.emit('delivery-notification', message);
  }
}
