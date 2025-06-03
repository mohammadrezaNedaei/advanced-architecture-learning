import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmAcknowledgedEvent } from "src/alarms/domain/events/alarm-acknowledged.event";
import { SerializedEventPayload } from "src/shared/domain/interfaces/serializable-event";
import { UpsertMaterializedAlarmRepository } from "../ports/upsert-materialized-alarm.repository";


@EventsHandler(AlarmAcknowledgedEvent)
export class AlarmAcknowledgedEventHandler implements IEventHandler<SerializedEventPayload<AlarmAcknowledgedEvent>> {
    private readonly logger = new Logger(AlarmAcknowledgedEventHandler.name);

    constructor(
        private readonly upsertMatrializedAlarmRepository: UpsertMaterializedAlarmRepository,
    ) {}

    async handle(event: SerializedEventPayload<AlarmAcknowledgedEvent>) {
        this.logger.debug(`alarm acknowledged event: ${JSON.stringify(event)}`);

        await this.upsertMatrializedAlarmRepository.upsert({
            id: event.alarmId,
            isAcknowledged: true,
        });
    }
}