import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/config/database/prisma.service";

@Injectable()
export class SubSectorService {
  constructor(private prisma: PrismaService) {}

  async create({
    id,
    name,
    sector,
  }: {
    id: string;
    name: string;
    sector: string;
  }): Promise<{ id: string; name: string; sectorId: string }> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id },
        select: { enterprise_id: true },
      });

      if (!user) throw new NotFoundException("User not found");

      const sectorExists = await this.prisma.sector.findFirst({
        where: { id: sector },
        select: { enterprise_id: true },
      });

      if (!sectorExists) throw new NotFoundException("Sector not found");

      if (sectorExists.enterprise_id !== user.enterprise_id)
        throw new ForbiddenException("Sector id and user do not match");

      const subSector = await this.prisma.sub_sector.create({
        data: {
          name,
          sector_id: sector,
        },
      });

      return {
        id: subSector.id,
        name: subSector.name,
        sectorId: subSector.sector_id,
      };
    } catch (error: any) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}
