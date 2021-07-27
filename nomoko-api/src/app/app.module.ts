import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { GeoModule } from '@app/geo/geo.module';

@Module({
  imports: [
    ConfigModule.load('dist/**/*.config.js', {
      modifyConfigName: (name) => name.replace('.config', ''),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('app.database'),
      inject: [ConfigService],
    }),
    GeoModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
