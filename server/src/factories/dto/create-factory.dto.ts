import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateFactoryDto {
  @IsNotEmpty()
  @IsString()
  firmName: string;

  @IsNotEmpty()
  @IsDateString()
  memberDate: string;

  @IsNotEmpty()
  @IsDateString()
  memberEndDate: string;

  @IsNotEmpty()
  @IsNumber()
  employeeCount: number;

  @IsNotEmpty()
  @IsBoolean()
  isFreeMember: boolean;

  @IsNotEmpty()
  @IsString()
  unitUsing: string;

  @IsNotEmpty()
  @IsNumber()
  usage: number;

  @IsNotEmpty()
  @IsNumber()
  usageFee: number;

  @IsNotEmpty()
  @IsBoolean()
  discountPrice: boolean;
}
