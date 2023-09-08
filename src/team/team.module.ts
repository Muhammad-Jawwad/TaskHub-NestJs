import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team/team.controller';
import { TeamService } from './services/team/team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/typeorm/entities/Team';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Team
    ])
  ],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
