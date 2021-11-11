import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceController } from './choice.controller';
import { ChoiceRepository } from './choice.repository';
import { ChoiceService } from './choice.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ChoiceRepository])
    ],
    controllers: [ChoiceController],
    providers: [ChoiceService]
})
export class ChoiceModule { }
