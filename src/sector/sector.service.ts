import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

Injectable();
export class SectorService {
  constructor(private prisma: PrismaService) {}

  async create({ id, name }: { id: string; name: string }): Promise<{
    message: string;
    id: string;
    name: string;
    enterprise_id: string;
  }> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (
        (user.type !== 'ADMIN' && user.type !== 'MANAGER') ||
        !user.enterprise_id
      ) {
        throw new UnauthorizedException('User not authorized');
      }

      const sectorAlreadyExists = await this.prisma.sector.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
          enterprise_id: user.enterprise_id,
        },
      });

      if (sectorAlreadyExists) {
        throw new ConflictException('Sector already exists');
      }

      const sector = await this.prisma.sector.create({
        data: {
          name,
          enterprise_id: user.enterprise_id,
        },
      });

      return {
        message: 'Sector created successfully',
        id: sector.id,
        name: sector.name,
        enterprise_id: sector.enterprise_id,
      };
    } catch (error: any) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

  async getAll(id: string, page = 1, pageSize = 10) {
    try {
      const skip = (page - 1) * pageSize;
      const user = await this.prisma.users.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!user.enterprise_id) {
        throw new UnauthorizedException('User not authorized');
      }

      const [sectors, total] = await this.prisma.$transaction([
        this.prisma.sector.findMany({
          where: { enterprise_id: user.enterprise_id },
          skip,
          take: pageSize,
          orderBy: { name: 'asc' },
        }),
        this.prisma.sector.count({
          where: { enterprise_id: user.enterprise_id },
        }),
      ]);

      return {
        data: sectors,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error: any) {
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}
