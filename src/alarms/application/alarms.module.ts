import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmQueryHandler } from './queries/get-alarm.query-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';
import { AcknowledgeAlarmCommandHandler } from './commands/acknowledge-alarm.command-handler';
import { AlarmAcknowledgedEventHandler } from './event-handlers/alarm-acknowledged.event-handler';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmFactory, 
    CreateAlarmCommandHandler,
    GetAlarmQueryHandler,
    AlarmCreatedEventHandler,
    AcknowledgeAlarmCommandHandler,
    AlarmAcknowledgedEventHandler
  ],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
