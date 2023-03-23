import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.customer.findMany();
  }

  async createNew(data) {
    try {
      return await this.prismaService.customer.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    return this.prismaService.customer.findFirstOrThrow();
  }

  async updateById(id: string, data) {
    return await this.prismaService.customer.update({
      where: { id },
      data: { ...data, updateAt: new Date() },
    });
  }

  async deleteById(id: string) {
    await this.prismaService.customer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
