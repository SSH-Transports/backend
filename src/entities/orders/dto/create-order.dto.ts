import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Latitude do destino',
    example: -23.55052,
    required: true,
  })
  @IsNumber({}, { message: 'A latitude deve ser um número' })
  latitude: number;

  @ApiProperty({
    description: 'Peso do pedido',
    example: -23.55052,
    required: true,
  })
  weight: string;

  @ApiProperty({
    description: 'Tempo do pedido',
    required: true,
  })
  time: string;

  @ApiProperty({
    description: 'Distância do pedido',
    required: true,
  })
  distance: string;

  @ApiProperty({
    description: 'Custo do pedido',
    required: true,
  })
  @IsNumber({}, { message: 'O custo do pedido deve ser um numero' })
  cost: number;

  @ApiProperty({
    description: 'Longitude do destino',
    example: -46.633308,
    required: true,
  })
  @IsNumber({}, { message: 'A longitude deve ser um número' })
  longitude: number;
}
