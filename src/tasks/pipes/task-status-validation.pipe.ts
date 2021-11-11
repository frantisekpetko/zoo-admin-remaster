import { TaskStatus } from './../task-status.enum';
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class TaskStatusValidation implements PipeTransform{

    readonly allowedStatutes = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE

    ];

    transform(value: any, { metatype }: ArgumentMetadata){
        console.log("value", value);
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;

    }

    private isStatusValid(status: any){
        const idx = this.allowedStatutes.indexOf(status);
        return idx !== -1;
    }

}