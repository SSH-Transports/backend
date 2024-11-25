import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import dayjs from 'dayjs';
import { NotificationsGateway } from 'src/websockets/use-cases/notifications.gateway';
import { PrismaService } from '../../connections/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsGateway: NotificationsGateway,
  ) { }

  create(data: CreateOrderDto) {
    return this.prismaService.order.create({ data });
  }

  findAll() {
    return this.prismaService.order.findMany();
  }

  findOne(id: string) {
    return this.prismaService.order.findUnique({ where: { id } });
  }

  findByUserId(userId: string) {
    return this.prismaService.order.findMany({
      where: {
        OR: [
          { adminId: userId },
          { courierId: userId },
          { customerId: userId },
        ],
      },
    });
  }

  async update(id: string, data: UpdateOrderDto) {
    const oldOrder = await this.prismaService.order.findUnique({ where: { id } });

    if (!oldOrder) {
      throw new NotFoundException('Order not found');
    }

    if (oldOrder.status !== data.status) {
      this.notificationsGateway.notifyUser(oldOrder.adminId, `Order ${id} status updated to ${data.status}`);
      this.notificationsGateway.notifyUser(oldOrder.customerId, `Order ${id} status updated to ${data.status}`);
      this.notificationsGateway.notifyUser(oldOrder.courierId, `Order ${id} status updated to ${data.status}`);
    }


    return this.prismaService.order.update({
      where: { id },
      data,
    });
  }

  private getDateRange(filter: string) {
    const now = dayjs();
    switch (filter) {
      case 'Today':
        return {
          start: now.startOf('day').toDate(),
          end: now.endOf('day').toDate(),
        };
      case 'Week':
        return {
          start: now.startOf('week').toDate(),
          end: now.endOf('week').toDate(),
        };
      case 'Month':
        return {
          start: now.startOf('month').toDate(),
          end: now.endOf('month').toDate(),
        };
      case 'Year':
        return {
          start: now.startOf('year').toDate(),
          end: now.endOf('year').toDate(),
        };
      default:
        throw new Error('Invalid date range filter.');
    }
  }

  async findAllByRange(
    filter: "Today" | "Week" | "Month" | "Year" = "Today",
    status?: OrderStatus,
  ) {
    const dateRange = this.getDateRange(filter);

    const orders = await this.prismaService.order.findMany({
      where: {
        status,
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    switch (filter) {
      case 'Today':
        return orders;
      case 'Week':
        return this.groupByDay(orders);
      case 'Month':
        return this.groupByWeek(orders);
      case 'Year':
        return this.groupByMonth(orders);
      default:
        throw new BadRequestException('Invalid date range filter.');
    }
  }

  private groupByDay(orders: any[]) {
    return orders.reduce((groups, order) => {
      const date = dayjs(order.createdAt).format('YYYY-MM-DD');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
      return groups;
    }, {});
  }

  private groupByWeek(orders: any[]) {
    return orders.reduce((groups, order) => {
      const week = dayjs(order.createdAt).startOf('week').format('YYYY-MM-DD');
      if (!groups[week]) {
        groups[week] = [];
      }
      groups[week].push(order);
      return groups;
    }, {});
  }

  private groupByMonth(orders: any[]) {
    return orders.reduce((groups, order) => {
      const month = dayjs(order.createdAt).format('YYYY-MM');
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(order);
      return groups;
    }, {});
  }
}
