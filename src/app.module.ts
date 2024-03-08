import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ErrorFilter } from './helper/error.filter';

//module
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { LeavesModule } from './modules/leaves/leaves.module';
import { SalariesModule } from './modules/salaries/salaries.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { PlansModule } from './modules/plans/plans.module';
import { SeederModule } from './modules/seeder/seeder.module';
import { AuthModule } from './modules/auth/auth.module';
import { SchedulerModule as CronModule } from './modules/scheduler/scheduler.module';
//entity
import { Users } from './modules/users/users.entity';
import { Companies } from './modules/companies/companies.entity';
import { Employees } from './modules/employees/employees.entity';
import { Departments } from './modules/departments/departments.entity';
import { Leaves } from './modules/leaves/leaves.entity';
import { Salaries } from './modules/salaries/salaries.entity';
import { Plans } from './modules/plans/plan.entity';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'piaway',
      synchronize: true,
      entities: [
        Users,
        Companies,
        Plans,
        Employees,
        Departments,
        Leaves,
        Salaries,
      ],
    }),
    SeederModule,
    AuthModule,
    UsersModule,
    PlansModule,
    CompaniesModule,
    EmployeesModule,
    DepartmentsModule,
    LeavesModule,
    SalariesModule,
    ScheduleModule.forRoot(),
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: ErrorFilter }],
})
export class AppModule {}
