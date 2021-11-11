import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalRepository } from './animals.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalRepository])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
