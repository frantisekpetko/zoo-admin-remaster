import { Injectable, Logger } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from '../entity/animal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalRepository } from './animals.repository';

@Injectable()
export class AnimalsService {
  private logger: Logger = new Logger(`<${AnimalsService.name}>`);

  constructor(
    @InjectRepository(AnimalRepository)
    private animalRepository: AnimalRepository,
  ) {}

  create(createAnimalDto: CreateAnimalDto) {
    return 'This action adds a new animal';
  }

  async getPagesNumber(limit: number, search: string): Promise<number> {
    return this.animalRepository.getPagesNumber(limit, search);
  }

  findAll(page: number, limit: number, search: string): Promise<Animal[]> {
    return this.animalRepository.getAll(page, limit, search);
  }

  findOne(id: number): Promise<Animal> {
    this.logger.log(`This action returns a #${id} animal`);
    return this.animalRepository.findOne(+id);
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
