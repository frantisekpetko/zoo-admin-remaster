import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    //commands.log(salt);

    const user = new User();

    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, user.salt);

    //commands.log(user.password);
    try {
      await user.save();
    } catch (error) {
      if (error.errno === 19) {
        //duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
      //commands.log(error);
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    //commands.log(username, password);
    const user = await this.findOne({ username });
    //commands.log('user', user);
    //commands.log('user.validatePassword()', user.validatePassword(password));
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
