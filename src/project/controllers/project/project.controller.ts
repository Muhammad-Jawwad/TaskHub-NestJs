import { 
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Get,
    Patch,
    Delete,
    Param,
    ParseIntPipe,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { createProjectDTO } from 'src/project/dtos/CreateProject.dto';
import { updateProjectDTO } from 'src/project/dtos/UpdateProject.dto';
import { updateProjectStatusDTO } from 'src/project/dtos/UpdateProjectStatus.dto';
import { ProjectService } from 'src/project/services/project/project.service';

@Controller('projects')
export class ProjectController {
    constructor(private projectService: ProjectService){}

    @Post('create')
    @UsePipes(new ValidationPipe())
    createProject(@Body() projectBody: createProjectDTO){
        console.log("Create Project Body:", projectBody);
        const result = this.projectService.createProject(projectBody);
        return result;
    }
    
    @Get()
    getProjects(){
        const result = this.projectService.fetchProjects();
        return result;
    }

    @Get(':projectId')
    getProjectById(@Param('projectId', ParseIntPipe) id: number){
        const result = this.projectService.getProjectById(id);
        return result;
    }

    @Patch('update/:projectId')
    @UsePipes(new ValidationPipe())
    updateProject(@Param('projectId', ParseIntPipe) id: number, @Body() projectRequest: updateProjectDTO){
        console.log(projectRequest);
        if(Object.keys(projectRequest).length === 0){
            throw new HttpException('Empty Body request is not allowed',HttpStatus.BAD_REQUEST);
        }
        const result = this.projectService.updateProject(id, projectRequest);
        return result;

    }

    @Delete('delete/:projectId')
    deleteProject(@Param('projectId',ParseIntPipe) id: number){
        console.log(id);
        const result = this.projectService.deleteProject(id);
        return result;
    }

    //Get Project by Project Manager Id
    @Get('projectByPM/:PM_Id')
    getProjectsByPMId(@Param('PM_Id', ParseIntPipe) PM_Id: number){
        console.log("Project Manager Id", PM_Id);
        const result = this.projectService.getProjectsByPM(PM_Id);
        return result;
    }

    @Get('projectByTL/:TL_Id')
    getProjectByTLId(@Param('TL_Id', ParseIntPipe) TL_Id: number){
        console.log("Team Lead Id", TL_Id);
        const result = this.projectService.getProjectsByTL(TL_Id);
        return result;
    }

    @Patch('updateProjectStatus')
    @UsePipes(new ValidationPipe())
    updateProjectStatus(@Body() projectBody: updateProjectStatusDTO){
        const result = this.projectService.updateProjectStatus(projectBody);
        return result;
    }
}
