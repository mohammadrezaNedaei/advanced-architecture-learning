import { Injectable } from "@nestjs/common";
import { FindAlarmRepository } from "src/alarms/application/ports/find-alarm.repository";
import { MaterializedAlarmView } from "../entities/schemas/materialized-alarm-view.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";


@Injectable()
export class OrmFindAlarmRepository implements FindAlarmRepository {
    constructor(
        @InjectModel(MaterializedAlarmView.name)
        private readonly alarmModel: Model<MaterializedAlarmView>,
    ) {}

    async findAll(): Promise<AlarmReadModel[]> {
        return await this.alarmModel.find();
    }
}