import { Injectable, Type } from "@nestjs/common";
import { Event } from "../schema/event.schema";
import { SerializableEvent } from "src/shared/domain/interfaces/serializable-event";
import { EventClsRegistry } from "../event-cls.registry";

@Injectable()
export class EventDeserializer {
    deserializer<T>(event: Event): SerializableEvent {
        const eventCls = this.getEventClassByType(event.type);
        return {
            ...event,
            data: this.instantiateSerializedEvent(eventCls, event.data),
        }
    }

    private getEventClassByType(type: string) {
        return EventClsRegistry.get(type);
    }

    private instantiateSerializedEvent<T extends Type>(
        eventCls: T,
        data: Record<string, any>    
    ) {
        return Object.assign(Object.create(eventCls.prototype), data);
    }
}