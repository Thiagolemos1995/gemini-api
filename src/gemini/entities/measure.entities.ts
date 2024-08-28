import { EMeasureType } from '../../common/enums/measure-type.enum';
import { CustomBaseEntity } from '../../common/interfaces/custom-base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Measure extends CustomBaseEntity {
  @Column({ name: 'measure_id', type: 'uuid', unique: true })
  measure_id: string;

  @Column()
  image: string;

  @Column()
  customer_code: string; //Could be a foreign key to a customer table if had more customer information and some management for it

  @Column()
  measure_date: Date;

  @Column({ type: 'enum', enum: EMeasureType, default: EMeasureType.WATER })
  measure_type: string;
}
