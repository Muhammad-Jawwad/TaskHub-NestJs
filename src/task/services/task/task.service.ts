import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createTaskDTO } from 'src/task/dtos/CreateTask.dto';
import { updateTaskDTO } from 'src/task/dtos/UpdateTask.dto';
import { Task } from 'src/typeorm/entities/Task';
import { UpdateTaskType } from 'src/utilities/types';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>
    ){}

    async createTask(taskBody : createTaskDTO ){
        try{
            const newTask = this.taskRepository.create({
                project_id: {
                    id: taskBody.project_id
                },
                user_id: {
                    id: taskBody.user_id
                },
                task_name: taskBody.task_name,
                status: taskBody.status,
                description: taskBody.description
            });
    
            await this.taskRepository.save(newTask);
            return newTask;
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async fetchTasks(){
        try{
            const tasks = await this.taskRepository.find();
            if(tasks.length === 0){
                throw new HttpException('Tasks not found...', HttpStatus.NOT_FOUND);
            }
            return tasks;
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getTasksById(id : number){
        try{
            const taskById = await this.taskRepository.findOne({
                where: { id }
            });
            if(!taskById){
                throw new HttpException('Task by id not found...', HttpStatus.NOT_FOUND);
            }
            return taskById;
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }
    
    async updateTask(id:number, taskBody: UpdateTaskType){
        try{
            const task = await this.taskRepository.findOne({
                where: { id }
            });
            if(!task){
                throw new HttpException("Task to update not found", HttpStatus.NOT_FOUND);
            }
            const updateTask = taskBody;
            await this.taskRepository.update({ id }, updateTask);
            return {
                message: "The task is updated sucessfully..."
            }
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async deleteTask(id : number){
        try{
            const task = await this.taskRepository.findOne({
                where: { id }
            });
            if(!task){
                throw new HttpException("Task to be deleted not found", HttpStatus.NOT_FOUND);
            }
            await this.taskRepository.delete({ id });
            return {
                message: "The task is deleted sucessfully..."
            }
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }
}
