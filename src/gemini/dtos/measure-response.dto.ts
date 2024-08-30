import { IMetadata } from 'src/common/interfaces';
import { Measure } from '../entities';

export class MeasureResponseDto {
  metadata: IMetadata;
  data: Measure[];

  constructor(data: Partial<MeasureResponseDto>) {
    Object.assign(this, data);
  }
}
