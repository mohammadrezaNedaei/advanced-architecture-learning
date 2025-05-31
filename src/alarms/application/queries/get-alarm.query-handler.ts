import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmQuery } from "./get-alarm.query";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmRepository } from "../ports/alarm.repository";


@QueryHandler(GetAlarmQuery)
export class GetAlarmQueryHandler implements IQueryHandler<GetAlarmQuery, Alarm[]> {
    constructor(
        private readonly alarmRepository: AlarmRepository,
    ) {}

    async execute(query: GetAlarmQuery): Promise<Alarm[]> {
        return this.alarmRepository.findAll();
    }
}