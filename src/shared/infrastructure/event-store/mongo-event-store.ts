import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Event } from "./schema/event.schema";
import { EVENT_STORE_CONNECTION } from "src/core/core-constants";
import { Model } from "mongoose";
import { SerializableEvent } from "src/shared/domain/interfaces/serializable-event";
import { EventDeserializer } from "./deserializer/event-deserializer";
import { EventStore } from "src/shared/application/ports/event-store";


@Injectable()
export class MongoEventStore implements EventStore{
    private readonly logger = new Logger(MongoEventStore.name);

    constructor(
        @InjectModel(Event.name, EVENT_STORE_CONNECTION)
        private readonly eventStore: Model<Event>,
        private readonly eventDesirializer: EventDeserializer,
    ) {}

    async persist(
        eventOrEvent: SerializableEvent | SerializableEvent[]
    ): Promise<void> {
        const events = Array.isArray(eventOrEvent) 
            ? eventOrEvent
            : [eventOrEvent];
        
        const session = await this.eventStore.startSession();

        try {
            session.startTransaction();
            await this.eventStore.insertMany(events, {session , ordered: true});

            await session.commitTransaction();
            this.logger.debug('Events inserted successfully to the event store')
        } catch (error) {
            await session.abortTransaction();

            const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
            if (error?.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
                this.logger.error(`Events could not be persistant. Aggregate is stale.`)
                console.error(error.writeErrors?.[0]?.err?.errmsg);
            } else {
                throw error;
            }
        } finally {
            await session.endSession();
        }
    }

    async getEventByStreamId(streamId: string): Promise<SerializableEvent[]> {
        const events = await this.eventStore
            .find({ streamId })
            .sort({ position: 1 })
        if (events.length === 0)
            throw new Error(`aggregate with id ${streamId} does not exist!`)

        return events.map((event) => this.eventDesirializer.deserializer(event.toJSON()));
    }
}