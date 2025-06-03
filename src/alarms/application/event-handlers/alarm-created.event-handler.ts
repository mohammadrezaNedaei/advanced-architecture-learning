import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-event";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler implements IEventHandler<SerializedEventPayload<AlarmCreatedEvent>> {
    constructor(
        private readonly upsertMatrializedAlarmRepository: UpsertMaterializedAlarmRepository
    ) {}
    
    private readonly logger = new Logger(AlarmCreatedEventHandler.name);



    async handle(event: SerializedEventPayload<AlarmCreatedEvent>) {
        this.logger.debug(`processing "AlarmCreatedEventHandler": ${JSON.stringify(event)}`);
        
        await this.upsertMatrializedAlarmRepository.upsert({
            id: event.alarm.id,
            name: event.alarm.name,
            severity: event.alarm.severity,
            triggeredAt: new Date(event.alarm.triggeredAt),
            isAcknowledged: event.alarm.isAcknowledged,
            items: event.alarm.items,
            
        })
    }
}