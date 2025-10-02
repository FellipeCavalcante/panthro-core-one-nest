import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/config/database/prisma.service";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create({
    id,
    title,
    description,
    memberIds,
    subSectorIds,
  }: {
    id: string;
    title: string;
    description: string;
    memberIds?: string[];
    subSectorIds?: string[];
  }) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id } });

      if (!user) throw new NotFoundException("User not found");

      const task = await this.prisma.tasks.create({
        data: {
          title,
          description,
          enterprise_id: user.enterprise_id || "",
          status: "PENDING",
          task_members: {
            connect: memberIds?.map((memberId) => ({ id: memberId })) || [],
          },
          task_sub_sector: {
            connect:
              subSectorIds?.map((subSectorId) => ({ id: subSectorId })) || [],
          },
        },
      });

      return { task };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
