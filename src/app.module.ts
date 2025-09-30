import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserModule } from './user/user.module';
import { SectorModule } from './sector/sector.module';
import { SubSectorModule } from './subSector/subSector.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    EnterpriseModule,
    UserModule,
    SectorModule,
    SubSectorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
