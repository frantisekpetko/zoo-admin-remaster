import { Task } from '../entity/old/task.entity';
import { TaskStatusValidation } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entity/user.entity';



@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskController');

    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]>{
        this.logger.verbose(`User "${user.username}" retriving all tasks. ${filterDto}`);
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task>{
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task>{
        this.logger.verbose(`User "${user.username}" creating new task. ${createTaskDto}`);
        return this.tasksService.createNewTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void>{
        return this.tasksService.deleteTaskById(id, user);
        
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidation) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status, user);
    }
    


    /*
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[]{
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFiltering(filterDto)
        }
        else {

            commands.log(filterDto);
            return this.tasksService.getAllTasks();
        }
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):string{
        this.tasksService.deleteTaskById(id);
        return 'success';
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):void{
        this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task{
        return this.tasksService.createNewTask(createTaskDto);
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidation) status: TasksStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
    */
   
}
