import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EnvironmentModule } from 'src/integrations/environment/environment.module';

import { TypeORMService } from './typeorm.service';

const baseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  logging: ['error'],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: '_typeorm_migrations',
};

const metadataTypeORMFactory = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  ...baseConfig,
  url: configService.get<string>('PG_DATABASE_URL'),
  schema: 'metadata',
  entities: ['dist/src/metadata/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/database/typeorm/metadata/migrations/*{.ts,.js}'],
  name: 'metadata',
});

const coreTypeORMFactory = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  ...baseConfig,
  url: configService.get<string>('PG_DATABASE_URL'),
  schema: 'core',
  entities: ['dist/src/core/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/database/typeorm/core/migrations/*{.ts,.js}'],
  name: 'core',
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        metadataTypeORMFactory(configService),
      name: 'metadata',
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        coreTypeORMFactory(configService),
      name: 'core',
      inject: [ConfigService],
    }),
    EnvironmentModule,
  ],
  providers: [TypeORMService],
  exports: [TypeORMService],
})
export class TypeORMModule {}
