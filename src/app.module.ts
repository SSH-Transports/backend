import { Module } from '@nestjs/common';
import { AuthModule } from './entities/auth/auth.module';
import { UsersModule } from './entities/users/users.module';
import { OrdersModule } from './entities/orders/orders.module';

@Module({
  imports: [AuthModule, UsersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
