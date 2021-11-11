import { Module } from '@nestjs/common';
import { TraitsController } from './traits.controller';
import { TraitsService } from './traits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraitRepository } from './trait.repository';

@Module({
  imports: [
     TypeOrmModule.forFeature([TraitRepository]),
  ],
  controllers: [TraitsController],
  providers: [TraitsService]
})
export class TraitsModule {}
