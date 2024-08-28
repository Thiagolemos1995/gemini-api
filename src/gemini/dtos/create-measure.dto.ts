import {
  IsBase64,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { EMeasureType } from 'src/common/enums';

export class CreateMeasureDto {
  @IsBase64()
  @IsNotEmpty()
  image: string;

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
