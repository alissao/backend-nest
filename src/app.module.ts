import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RoutesModule } from './routes/routes.module';
import { ConfigModule } from '@nestjs/config';
import { MapsModule } from './maps/maps.module';
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true ,
      load: [config]
    }),
    PrismaModule, 
    RoutesModule, 
    MapsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
