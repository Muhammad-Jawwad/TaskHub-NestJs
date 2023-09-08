import { Module } from '@nestjs/common';
import { ProjectController } from './controllers/project/project.controller';
import { ProjectService } from './services/project/project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
