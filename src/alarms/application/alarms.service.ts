import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/craete-alarm.command';
import { AlarmRepository } from './ports/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}

  create(CreateAlarmCommand: CreateAlarmCommand) {
    const alarm = this.alarmFactory.create(
      CreateAlarmCommand.name, 
      CreateAlarmCommand.severity
    );

    return this.alarmRepository.save(alarm);
  }

  findAll() {
    return this.alarmRepository.findAll()
  }
}
