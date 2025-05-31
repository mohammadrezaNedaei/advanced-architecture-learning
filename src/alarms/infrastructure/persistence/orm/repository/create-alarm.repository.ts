import { Injectable } from "@nestjs/common";
import { CreateAlarmRepository } from "src/alarms/application/ports/create-alarm.repository";
import { Repository } from "typeorm";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mapper/alarm.mapper";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class OrmCreateAlarmRepository implements CreateAlarmRepository {
    constructor(
        @InjectRepository(AlarmEntity)
        private readonly alarmRepository: Repository<AlarmEntity>
    ) {}

    async save(alarm: Alarm): Promise<Alarm> {
        const PersistenceModel = AlarmMapper.toPersistence(alarm);
        const newEntity = await this.alarmRepository.save(PersistenceModel);
        return AlarmMapper.toDomain(newEntity);
    }
}