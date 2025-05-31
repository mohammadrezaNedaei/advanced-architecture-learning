import { Alarm } from "../alarm";

export class AlarmCreatedEvent {
    constructor(public alarm: Alarm) {}
}