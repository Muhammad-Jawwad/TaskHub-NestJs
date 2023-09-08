import { 
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { createProjectDTO } from 'src/project/dtos/CreateProject.dto';
import { ProjectService } from 'src/project/services/project/project.service';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService){}

    @Post('create')
    @UsePipes(new ValidationPipe())
    createProject(@Body() projectBody: createProjectDTO){
        console.log("Create Project Body:", projectBody);
        
        
        return projectBody;
    }

}
