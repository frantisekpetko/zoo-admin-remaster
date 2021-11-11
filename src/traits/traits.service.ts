import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trait } from '../entity/old/trait.entity';
import { GetTraitsDto } from './dto/get-traits.dto';
import { CreateTraitsDto } from './dto/store-traits.dto';
import { TraitRepository } from './trait.repository';

@Injectable()
export class TraitsService {


    constructor(@InjectRepository(TraitRepository) private traitRepository: TraitRepository) { }

    getTraits(): Promise<Trait[]>
    {
        return this.traitRepository.getTraits();
    }

    storeInitialData(createTraitsDto: CreateTraitsDto): Promise<Trait>
    {
        return this.traitRepository.storeInitialData(createTraitsDto);
    }
}
