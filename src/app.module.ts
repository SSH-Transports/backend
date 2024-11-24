import { Module } from '@nestjs/common';
import { AuthModule } from './entities/auth/auth.module';
import { OrdersModule } from './entities/orders/orders.module';
import { UsersModule } from './entities/users/users.module';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [AuthModule, UsersModule, OrdersModule, WebsocketsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
