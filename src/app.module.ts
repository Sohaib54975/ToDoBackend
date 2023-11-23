import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { HistoryModule } from './modules/history/history.module';
import { AttachmentsModule } from './modules/attachments/attachments.module';
import { RolesModule } from './modules/roles/roles.module';
 
// Modules are containers for different parts of an application, such as controllers, services, and other related components. They serve as a way to organize and encapsulate the functionality of an application.

@Module({
  imports: [
    ConfigModule.forRoot(),
    TaskModule,
    UsersModule,
    HistoryModule,
    TypeOrmModule.forRoot({
      // type: process.env.DB_TYPE as any,
      // host: process.env.PG_HOST,
      // port: parseInt(process.env.PG_PORT),
      // username: process.env.PG_USER,
      // password: process.env.PG_PASSWORD,
      // database: process.env.PG_DB,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todocrud',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AttachmentsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
