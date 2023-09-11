import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task/task.controller';
import { TaskService } from './services/task/task.service';
import { Task } from 'src/typeorm/entities/Task';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task
    ])
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
