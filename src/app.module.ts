import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { FilesModule } from './modules/files/files.module';
import { CompanyPlanModule } from './modules/company-plan/company-plan.module';
import { CompanyPlan } from './modules/company-plan/company-plan.entity';

//midleware,controller
import { JwtMiddleware } from './middleware/jwt.middleware';
import { EmployeesController } from './modules/employees/employees.controller';
import { CompanyPlanMiddleware } from './middleware/company-plan.middleware';
import { SalariesController } from './modules/salaries/salaries.controller';
import { LeavesController } from './modules/leaves/leaves.controller';
import { DepartmentsController } from './modules/departments/departments.controller';
import { CompanyPlanController } from './modules/company-plan/company-plan.controller';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [
        Users,
        Plans,
        Companies,
        Employees,
        Departments,
        Leaves,
        Salaries,
        CompanyPlan,
      ],
    }),
    TypeOrmModule.forFeature([CompanyPlan, Employees]),
    ScheduleModule.forRoot(),
    CronModule,
    SeederModule,
    FilesModule,
    AuthModule,
    PlansModule,
    UsersModule,
    CompaniesModule,
    CompanyPlanModule,
    EmployeesModule,
    DepartmentsModule,
    LeavesModule,
    SalariesModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: ErrorFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
    consumer
      .apply(CompanyPlanMiddleware)
      .forRoutes(
        EmployeesController,
        SalariesController,
        LeavesController,
        DepartmentsController,
        CompanyPlanController,
      );
  }
}
