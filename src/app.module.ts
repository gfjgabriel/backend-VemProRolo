import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VehicleModule } from './modules/vehicle.module';
import {LikeModule} from "./modules/like.module";

let envFilePath = '.env.development';
console.log(`Running in ${process.env.ENVIRONMENT}`)
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  envFilePath = '.env.production'
} else if (process.env.ENVIRONMENT === 'TEST') {
  envFilePath = '.env.testing'
}
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: Number.parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASS,
      database: process.env.MYSQL_DB_NAME,
      entities: ["dist/entities/*{.ts,.js}"],
      migrations: ["dist/database/migrations/*{.ts,.js}"],
      migrationsRun: true
    }),
    UserModule,
    AuthModule,
    VehicleModule,
    LikeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
