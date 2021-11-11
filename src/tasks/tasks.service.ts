import { Task } from '../entity/old/task.entity';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository){}


    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user);
    }
    

    async getTaskById(
        id: number,
        user: User
    ): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if(!found){
            throw new NotFoundException(`Task with id ${id} not found.`);
        }
        return found;
    }        

    async createNewTask(
        createTaskDto: CreateTaskDto,
        user: User,

    ): Promise<Task>{
        return this.taskRepository.createNewTask(createTaskDto, user);  
    }


    async deleteTaskById(id: number, user: User): Promise<void>{
        const result = await this.taskRepository.delete({ id, userId: user.id });
        console.log(result);
        //const found = await this.getTaskById(id);
        //return await this.taskRepository.remove(found);
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User):Promise<Task>{
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save;
        return task;
    }

    /*
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    deleteTaskById(id: string): void{
        const found = this.getTaskById(id);
        this.tasks.filter(task => task.id !== found.id);
    }
  

    getTaskById(id:string):Task{
        const find = this.tasks.find(task => task.id === id);

        if(!find){
            throw new NotFoundException(`Task with id ${id} not found.`);
        }
        return find;
    }

    createNewTask(createTaskDto: CreateTaskDto): Task{
        const {title, description } = createTaskDto;
        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status: TasksStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TasksStatus): Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    getTaskWithFiltering(filterDto: GetTasksFilterDto): Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.description.includes(search))
        }

        return tasks;
    }
    */
}
