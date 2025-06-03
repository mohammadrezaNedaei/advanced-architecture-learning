import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { NotifyFacilitySupervisorCommand } from "./notify-facility-supervisor.command";
import { Logger } from "@nestjs/common";


@CommandHandler(NotifyFacilitySupervisorCommand)
export class NotifyFacilitySupervisorCommandHandler 
implements ICommandHandler<NotifyFacilitySupervisorCommand> {
    private readonly logger = new Logger(NotifyFacilitySupervisorCommandHandler.name);

    async execute(command: NotifyFacilitySupervisorCommand): Promise<any> {
        this.logger.debug(`processing "NotifyFacilitySupervisorCommand": ${JSON.stringify(command)}`);

        //TODO: in real life applications we may need something more than a log
        //sms service or an email service maybe
    }
}