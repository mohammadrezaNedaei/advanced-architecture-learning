import { Module } from "@nestjs/common";
import { OrmAlarmPersistenceModule } from "./persistence/orm/orm.persistance.module";
import { InMemoryAlarmPersistenceModule } from "./persistence/in-memory/in-memory.persistance.module";

@Module({})
export class AlarmInfrastructure {
    static use(driver: 'orm' | 'in-memory') {
        const persistenceModule = 
            driver === 'orm'
            ? OrmAlarmPersistenceModule
            : InMemoryAlarmPersistenceModule;

        return {
            module: AlarmInfrastructure,
            imports: [persistenceModule],
            exports: [persistenceModule],
        }
    }
}