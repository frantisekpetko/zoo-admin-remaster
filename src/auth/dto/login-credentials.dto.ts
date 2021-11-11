import {
  IsNotEmpty,
  IsString
} from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  @IsNotEmpty({ message: 'username is empty' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'password is empty' })
  password: string;
}
