import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTeamDTO } from 'src/team/dtos/CreateTeam.dto';
import { Team } from 'src/typeorm/entities/Team';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team) private teamRepository: Repository<Team>
    ){}

    createTeam(teamDetails: createTeamDTO){
        const { team_name } = teamDetails;
        const newTeam = this.teamRepository.create({
            team_lead : {
                id : teamDetails.team_lead
            },
            team_name: team_name
        })
        console.log("newTeam",newTeam)
        let res = this.teamRepository.save(newTeam);
        return res;
    }
}
