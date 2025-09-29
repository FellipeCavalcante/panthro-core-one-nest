import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EnterpriseService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create({
    id,
    name,
    description,
  }: {
    name: string;
    description: string;
    id: string;
  }): Promise<{
    access_token: string;
    enterprise: { id: string; name: string; description: string };
  }> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const enterpriseAllReadyExists = await this.prisma.enterprise.findFirst({
        where: { name },
      });

      if (enterpriseAllReadyExists) {
        throw new ConflictException('Enterprise all ready exists');
      }

      const enterpriseCreated = await this.prisma.enterprise.create({
        data: {
          name,
          description,
          users: { connect: { id: user.id } },
        },
      });

      const newUserRole = await this.prisma.users.update({
        where: { id: user.id },
        data: { enterprise_id: enterpriseCreated.id, type: 'ADMIN' },
      });

      const payload = {
        sub: newUserRole.id,
        email: newUserRole.email,
        type: newUserRole.type,
      };
      const token = await this.jwtService.signAsync(payload);

      return {
        access_token: token,
        enterprise: {
          id: enterpriseCreated.id,
          name: enterpriseCreated.name,
          description: enterpriseCreated.description,
        },
      };
    } catch (error: any) {
      console.log(error);
      if (
        error instanceof NotFoundException ||
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

  async getAll(page = 1, pageSize = 10) {
    try {
      const skip = (page - 1) * pageSize;

      const [enterprises, total] = await this.prisma.$transaction([
        this.prisma.enterprise.findMany({
          select: { id: true, name: true, description: true },
          skip,
          take: pageSize,
          orderBy: { name: 'asc' },
        }),
        this.prisma.enterprise.count(),
      ]);

      return {
        data: enterprises,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error: any) {
      throw new InternalServerErrorException({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}
