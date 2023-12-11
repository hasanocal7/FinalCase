import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
  IsStrongPasswordOptions,
  Matches,
  IsIn,
  Length,
} from 'class-validator';

const StrongPasswordOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minUppercase: 1,
  minNumbers: 1,
};

export class CreateUserDto {
  @IsNotEmpty()
  @Length(8)
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Only alphanumeric characters and space are allowed.',
  })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(StrongPasswordOptions)
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsIn(['editor', 'admin'])
  authority: string;
}
