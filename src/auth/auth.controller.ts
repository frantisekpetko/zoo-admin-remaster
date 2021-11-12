import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from '../entity/user.entity';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  singIn(
    @Body(ValidationPipe) authCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string, username: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  /*
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        commands.log('user',user);
    }
    */
}
