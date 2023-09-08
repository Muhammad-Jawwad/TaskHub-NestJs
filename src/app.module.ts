
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './configuration/config';
import { Project } from './typeorm/entities/Project';
import { Task } from './typeorm/entities/Task';
import { Team } from './typeorm/entities/Team';
import { TeamMembers } from './typeorm/entities/TeamMembers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'taskhub',
      entities: [User,Project,Task,Team,TeamMembers], 
      synchronize: true
  }),
    UsersModule,
    AuthModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './typeorm/entities/User';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { config } from './config';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [config],
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get('host'),
//         port: configService.get('port'),
//         username: configService.get('username'),
//         password: configService.get('password'),
//         database: configService.get('database'),
//         entities: [User],
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     }),
//     UsersModule,
//     AuthModule,
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}