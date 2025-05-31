import { Alarm } from "../alarm";

export class AlarmCreatedEvent {
    constructor(private readonly alarm: Alarm) {}
}