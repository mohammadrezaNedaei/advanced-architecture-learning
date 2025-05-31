import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmQuery } from "./get-alarm.query";
import { FindAlarmRepository } from "../ports/find-alarm.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";


@QueryHandler(GetAlarmQuery)
export class GetAlarmQueryHandler implements IQueryHandler<GetAlarmQuery, AlarmReadModel[]> {
    constructor(
        private readonly alarmRepository: FindAlarmRepository,
    ) {}

    async execute(query: GetAlarmQuery): Promise<AlarmReadModel[]> {
        return this.alarmRepository.findAll();
    }
}