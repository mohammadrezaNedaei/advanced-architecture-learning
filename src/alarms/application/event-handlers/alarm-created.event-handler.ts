import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler implements IEventHandler<AlarmCreatedEvent> {
    private readonly logger = new Logger(AlarmCreatedEvent.name);

    handle(event: AlarmCreatedEvent) {
        this.logger.debug(`processing "AlarmCreatedEventHandler": ${JSON.stringify(event)}`);
    }
}