import { VersionedAggregateRoot } from "src/shared/domain/aggregate-root";
import { SerializableEvent } from "src/shared/domain/interfaces/serializable-event";

export class EventSerializer {
    Serialize<T>(
        event: T,
        dispatcher: VersionedAggregateRoot
    ): SerializableEvent<T> {
        const eventType = event.constructor?.name;
        if (!eventType)
            throw new Error('incompatable event type');

        const aggregateId = dispatcher.id;

        return {
            streamId: aggregateId,
            position: dispatcher.version.value + 1,
            type: eventType,
            data: this.toJSON(event)
        }
    }

    private toJSON<T>(data: T) {
        if(typeof data !== 'object' || data === null)
            return data;

        if('toJSON' in data && typeof data.toJSON === 'function')
            return data.toJSON();

        if(Array.isArray(data))
            return data.map((item) => this.toJSON(item));

        return Object.entries(data).reduce((acc, [key, value]) => {
            acc[key] = this.toJSON(value);
            return acc
        }, {});
    }
}