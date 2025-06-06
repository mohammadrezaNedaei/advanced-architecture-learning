import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./craete-alarm.command";
import { Logger } from "@nestjs/common";
import { CreateAlarmRepository } from "../ports/create-alarm.repository";
import { AlarmFactory } from "src/alarms/domain/factories/alarm.factory";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";


@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler 
    implements ICommandHandler<CreateAlarmCommand> {
        constructor(
            private readonly eventPublisher: EventPublisher,
            private readonly alarmFactory: AlarmFactory,
        ) {}
        private readonly logger = new Logger(CreateAlarmCommandHandler.name);

        async execute(command: CreateAlarmCommand): Promise<any> {
            this.logger.debug(`processing "create alarm command": ${JSON.stringify(command)}`);
            
            const alarm = this.alarmFactory.create(
                command.name,
                command.severity,
                command.triggeredAt,
                command.items);
                
            this.eventPublisher.mergeObjectContext(alarm);
            alarm.commit();
            return alarm;
        }
    }