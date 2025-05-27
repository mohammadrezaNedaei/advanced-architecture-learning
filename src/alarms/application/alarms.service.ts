import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/craete-alarm.command';

@Injectable()
export class AlarmsService {
  create(CreateAlarmCommand: CreateAlarmCommand) {
    return 'This action adds a new alarm';
  }

  findAll() {
    return `This action returns all alarms`;
  }
}
