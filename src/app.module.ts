import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  // connection to the sqlite database 
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',// the type of the database
    database: 'db.sqlite',// the name of the database
    entities: [User, Report],//the difrent entities of the database
    synchronize: true,/* synchronize is a feature that chagnes the structure  
                        of the database only in development mode*/
  }),
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
