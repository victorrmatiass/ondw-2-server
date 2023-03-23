import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      where: {
        deletedAt: null,
      },
    });
  }

  async createNew(data) {
    try {
      data.password = await this.hashPassword(data.password);
      return await this.prismaService.user.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    return this.prismaService.user.findFirstOrThrow({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      where: { id },
    });
  }

  async updateById(id: string, data: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
    delete user.password;
    return user;
  }

  async deleteById(id: string) {
    await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
}
