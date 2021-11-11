import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Animal } from '../entity/animal.entity';

@EntityRepository(Animal)
export class AnimalRepository extends Repository<Animal> {
  private logger: Logger = new Logger(`<${AnimalRepository.name}>`);

  async getPagesNumber(limit: number, search: string): Promise<number> {
    const queryLength = this.createQueryBuilder('animal');

    if (search !== '') {
      queryLength
        .select([
          'animal.id',
          'animal.name',
          'animal.latinname',
          'animal.createdAt',
          'animal.updatedAt',
        ])
        .innerJoinAndSelect(`animal.images`, 'image')
        .where('animal.name like :name', { name: `%${search}%` })
        .orWhere('animal.latinname like :name', { name: `%${search}%` });
    } else {
      queryLength
        .select([
          'animal.id',
          'animal.name',
          'animal.latinname',
          'animal.createdAt',
          'animal.updatedAt',
        ])
        .innerJoinAndSelect(`animal.images`, 'image');
    }

    try {
      const animalsLength = await queryLength.getMany();
      this.logger.log(animalsLength.length, 'animalsLength');
      return animalsLength.length !== 0
        ? Math.ceil(animalsLength.length / limit) - 1
        : animalsLength.length;
    } catch (error) {
      this.logger.error(`Failed to get tasks for animals`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getAll(page: number, limit: number, search: string): Promise<Animal[]> {
    const query = this.createQueryBuilder('animal');

    if (search !== '') {
      query
        .select([
          'animal.id',
          'animal.name',
          'animal.latinname',
          'animal.createdAt',
          'animal.updatedAt',
        ])
        .innerJoinAndSelect(`animal.images`, 'image')
        .where('animal.name like :name', { name: `%${search}%` })
        .orWhere('animal.latinname like :name', { name: `%${search}%` });
    } else {
      query
        .select([
          'animal.id',
          'animal.name',
          'animal.latinname',
          'animal.createdAt',
          'animal.updatedAt',
        ])
        .innerJoinAndSelect(`animal.images`, 'image');
    }

    try {
      const animals = await query
        .skip(page === 1 ? 0 : page * limit)
        .take(limit)
        .getMany();

      return animals;
    } catch (error) {
      this.logger.error(`Failed to get tasks for animals`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id): Promise<Animal> {
    const query = this.createQueryBuilder('animal');
    query
      .where('animal.id = :animalId', { animalId: id })
      .innerJoinAndSelect(`animal.images`, 'image')
      .innerJoinAndSelect('animal.extlinks', 'extlink');

    try {
      const animal = await query.getOne();
      return animal;
    } catch (error) {
      this.logger.error(`Failed to get tasks for animals`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
