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
import { createTaskDTO } from 'src/task/dtos/CreateTask.dto';
import { updateTaskDTO } from 'src/task/dtos/UpdateTask.dto';
import { TaskService } from 'src/task/services/task/task.service';

@Controller('tasks')
export class TaskController {
    constructor(private taskService:TaskService){}

    @Post('create')
    @UsePipes(new ValidationPipe())
    createTask(@Body() taskBody : createTaskDTO){
        const result = this.taskService.createTask(taskBody);
        return result;
    }

    @Get()
    getTasks(){
        const result  = this.taskService.fetchTasks();
        return result;
    }

    @Get(':taskId')
    getTaskById(@Param('taskId',ParseIntPipe) id: number){
        const result = this.taskService.getTasksById(id);
        return result;
    }

    @Patch('update/:taskId')
    @UsePipes(new ValidationPipe())
    updateTask(@Param('taskId', ParseIntPipe) id:  number, @Body() taskBody: updateTaskDTO){
        const result = this.taskService.updateTask(id, taskBody);
        return result;
    }

    @Delete('delete/:taskId')
    deleteTask(@Param('taskId',ParseIntPipe) id: number){
        const result = this.taskService.deleteTask(id);
        return result;
    }
}
