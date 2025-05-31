import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmEntity } from "./entities/alarm.entity";
import { CreateAlarmRepository } from "src/alarms/application/ports/create-alarm.repository";
import { OrmCreateAlarmRepository } from "./repository/create-alarm.repository";
import { AlarmItemEntity } from "./entities/alarm-item.entity";
import { FindAlarmRepository } from "src/alarms/application/ports/find-alarm.repository";
import { OrmFindAlarmRepository } from "./repository/find-alarms.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarms/application/ports/upsert-materialized-alarm.repository";
import { OrmUpsertMaterializedAlarmRepository } from "./repository/upsert-matrialized-alarm.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { MaterializedAlarmView, MaterializedAlarmViewSchema } from "./entities/schemas/materialized-alarm-view.schema";

@Module({
    imports: [
        TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
        MongooseModule.forFeature([
            {name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema}
        ]),
    ],
    providers: [
        {
            provide: CreateAlarmRepository,
            useClass: OrmCreateAlarmRepository
        },
        {
            provide: FindAlarmRepository,
            useClass: OrmFindAlarmRepository
        },
        {
            provide: UpsertMaterializedAlarmRepository,
            useClass: OrmUpsertMaterializedAlarmRepository
        }
    ],
    exports: [
        CreateAlarmRepository,
        FindAlarmRepository,
        UpsertMaterializedAlarmRepository,
    ]
})
export class OrmAlarmPersistenceModule {}