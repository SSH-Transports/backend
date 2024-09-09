import { Module } from '@nestjs/common';
import { AuthModule } from './entities/auth/auth.module';
import { UsersModule } from './entities/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
