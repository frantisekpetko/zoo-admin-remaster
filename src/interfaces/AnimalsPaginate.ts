import { Animal } from '../entity/animal.entity';

export interface AnimalsPaginate {
  animals: Animal[];
  pages: number;
}
