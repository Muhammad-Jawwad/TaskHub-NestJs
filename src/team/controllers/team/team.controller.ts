import { 
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { createTeamDTO } from 'src/team/dtos/CreateTeam.dto';
import { TeamService } from 'src/team/services/team/team.service';

@Controller('team')
export class TeamController {
    constructor(private teamServices: TeamService){}

    @Post('create')
    @UsePipes(new ValidationPipe())
    createTeam(@Body() teamBody: createTeamDTO){
        console.log("Create Team Body", teamBody);
        let result = this.teamServices.createTeam(teamBody);
        return result;
    }
}
