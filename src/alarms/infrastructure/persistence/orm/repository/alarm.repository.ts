import { Injectable } from "@nestjs/common";
import { AlarmRepository } from "src/alarms/application/ports/alarm.repository";
import { Repository } from "typeorm";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mapper/alarm.mapper";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class OrmAlarmRepository implements AlarmRepository {
    constructor(
        @InjectRepository(AlarmEntity)
        private readonly alarmRepository: Repository<AlarmEntity>
    ) {}

    async findAll(): Promise<Alarm[]> {
        const entities = await this.alarmRepository.find();
        return (entities).map((item) => AlarmMapper.toDomain(item));
    }

    async save(alarm: Alarm): Promise<Alarm> {
        const PersistenceModel = AlarmMapper.toPersistence(alarm);
        const newEntity = await this.alarmRepository.save(PersistenceModel);
        return AlarmMapper.toDomain(newEntity);
    }
}