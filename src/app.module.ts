import { Module, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
//module
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { LeavesModule } from './modules/leaves/leaves.module';
import { SalariesModule } from './modules/salaries/salaries.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { DepartmentsModule } from './modules/departments/departments.module';
//entity
import { Users } from './modules/users/users.entity';
import { Companies } from './modules/companies/companies.entity';
import { Employees } from './modules/employees/employees.entity';
import { Departments } from './modules/departments/departments.entity';
import { Leaves } from './modules/leaves/leaves.entity';
import { Salaries } from './modules/salaries/salaries.entity';

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
        Employees,
        Departments,
        Leaves,
        Salaries,
        Session,
      ],
    }),

    UsersModule,
    CompaniesModule,
    EmployeesModule,
    DepartmentsModule,
    LeavesModule,
    SalariesModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
