import { Body, Controller, Get, Logger, Post, ValidationPipe } from '@nestjs/common';
import { Trait } from '../entity/old/trait.entity';
import { GetTraitsDto } from './dto/get-traits.dto';
import { CreateTraitsDto } from './dto/store-traits.dto';
import { TraitsService } from './traits.service';

@Controller('traits')
export class TraitsController {

    private logger = new Logger('TraitsController');

    constructor(private traitsService: TraitsService) { }

    @Get()
    gettraits(): Promise<Trait[]> {
       
        return this.traitsService.getTraits();
    }

    @Post('/data')
    getInitialData(@Body() createTraitsDto: CreateTraitsDto): Promise<Trait> {
        return this.traitsService.storeInitialData(createTraitsDto);
    }
}
