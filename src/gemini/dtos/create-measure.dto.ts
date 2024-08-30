import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { EMeasureType } from 'src/common/enums';

export class CreateMeasureDto {
  @IsOptional()
  image: any;

  @IsNotEmpty()
  @IsUUID()
  customer_code: string;

  @IsNotEmpty()
  @IsDateString()
  measure_date: string;

  @IsNotEmpty()
  @IsEnum(EMeasureType)
  measure_type: string;
}
