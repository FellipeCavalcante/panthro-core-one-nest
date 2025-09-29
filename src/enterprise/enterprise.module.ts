import { PrismaService } from 'src/database/prisma.service';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseController } from './enterprise.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EnterpriseController],
  providers: [EnterpriseService, PrismaService],
})
export class EnterpriseModule {}
