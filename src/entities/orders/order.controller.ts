import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { stat } from 'fs';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Body() id: string) {
    return this.ordersService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('user/:userId')
  async findByUserId(@Body() userId: string) {
    return this.ordersService.findByUserId(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('report/range')
  async findAllByRange(
    @Query('filter', new DefaultValuePipe("Today")) filter: "Today" | "Week" | "Month" | "Year",
    @Query('status') status?: OrderStatus,
  ) {
    return this.ordersService.findAllByRange(filter, status);
  }
}
