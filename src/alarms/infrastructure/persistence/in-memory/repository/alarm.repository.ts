import { Injectable } from "@nestjs/common";
import { AlarmRepository } from "src/alarms/application/ports/alarm.repository";
import { AlarmEntity } from "../entities/alarm.entity";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mapper/alarm.mapper";


@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
    private readonly alarms = new Map<string, AlarmEntity>

    async findAll(): Promise<Alarm[]> {
        const entities = Array.from(this.alarms.values());
        return (entities).map((item) => AlarmMapper.toDomain(item));
    }

    async save(alarm: Alarm): Promise<Alarm> {
        const PersistenceModel = AlarmMapper.toPersistence(alarm);
        this.alarms.set(PersistenceModel.id, PersistenceModel);

        const newEntity = this.alarms.get(PersistenceModel.id);
        return AlarmMapper.toDomain(newEntity);
    }
}