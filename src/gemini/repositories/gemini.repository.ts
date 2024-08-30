import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { Measure } from '../entities';
import { MeasureFilterDto, CreateMeasureDto } from '../dtos';
import { EMeasureType } from 'src/common/enums';

@Injectable()
export class GeminiRepository {
  private entityManager: EntityManager;
  private queryRunner: QueryRunner;
  constructor(private readonly dataSource: DataSource) {
    this.entityManager = this.dataSource.createEntityManager();
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  async fetchMeasures(payload: MeasureFilterDto): Promise<[Measure[], number]> {
    try {
      const { order, skip, take } = payload;

      const result = await this.entityManager.find(Measure, {
        skip,
        take,
        order: {
          createdAt: order ?? 'DESC',
        },
      });

      return [result, result.length];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetchMeasureById(id: string): Promise<Measure> {
    try {
      return this.entityManager.findOne(Measure, {
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async fetchByCustomerCode(customerCode: string, measureType: EMeasureType) {
    try {
      const measures = await this.entityManager.findBy(Measure, {
        customer_code: customerCode,
        measure_type: measureType,
      });

      return {
        customer_code: customerCode,
        measures: measures,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createMeasure(payload: CreateMeasureDto): Promise<Measure> {
    try {
      const entity = new Measure({
        image: payload.image,
        customer_code: payload.customer_code,
        measure_date: payload.measure_date,
        measure_type: payload.measure_type,
      });

      return await this.entityManager.save(entity, {
        transaction: false,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateMeasure(id: string, payload: Measure): Promise<Measure> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const entityManager = this.queryRunner.manager;

      const existingMeasure = await entityManager.findOne(Measure, {
        where: { id },
      });

      entityManager.merge(Measure, existingMeasure, payload);

      const updateMeasure = await entityManager.save(existingMeasure);

      await this.queryRunner.commitTransaction();

      return updateMeasure;
    } catch (error) {
      await this.queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(error);
    } finally {
      await this.queryRunner.release();
    }
  }

  async softDelete(id: string): Promise<void> {
    this.queryRunner.connect();
    this.queryRunner.startTransaction();
    try {
      const entityManager = this.queryRunner.manager;

      await entityManager.softDelete(Measure, id);
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(error);
    } finally {
      await this.queryRunner.release();
    }
  }
}
