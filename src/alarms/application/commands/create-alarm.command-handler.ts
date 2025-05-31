import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./craete-alarm.command";
import { Logger } from "@nestjs/common";
import { AlarmRepository } from "../ports/alarm.repository";
import { AlarmFactory } from "src/alarms/domain/factories/alarm.factory";


@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler 
    implements ICommandHandler<CreateAlarmCommand> {
        constructor(
            private readonly alarmRepository: AlarmRepository,
            private readonly alarmFactory: AlarmFactory,
        ) {}
        private readonly logger = new Logger(CreateAlarmCommandHandler.name);

        async execute(command: CreateAlarmCommand): Promise<any> {
            this.logger.debug(`processing "create alarm command": ${JSON.stringify(command)}`);
            
            const alarm = this.alarmFactory.create(command.name, command.severity);
            return this.alarmRepository.save(alarm)
        }
    }