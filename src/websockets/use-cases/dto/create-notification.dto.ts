import { ApiProperty } from '@nestjs/swagger';
import { NotificationStatus, NotificationType } from '@prisma/client';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateNotificationDTO {
  @ApiProperty({
    description: 'O título da notificação',
    example: 'Nova ordem recebida',
    required: true,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  title: string;

  @ApiProperty({
    description: 'Mensagem da notificação',
    example: 'Você recebeu uma nova ordem',
    required: true,
  })
  @IsString({ message: 'Insira um e-mail válido' })
  message: string;

  @ApiProperty({
    description: 'O tipo da notificação',
    example: 'ORDER',
    required: true,
  })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({
    description: 'Status da notificação',
    required: true,
    example: 'UNREAD',
    enum: NotificationStatus,
  })
  @IsEnum(NotificationStatus)
  status: NotificationStatus;

  @ApiProperty({
    description: 'Id do cliente',
    required: true,
  })
  @IsUUID('4', { message: 'Id do cliente inválido' })
  userId: string;
}
