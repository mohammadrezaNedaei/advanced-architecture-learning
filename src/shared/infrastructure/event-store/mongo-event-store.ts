import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Event } from "./schema/event.schema";
import { EVENT_STORE_CONNECTION } from "src/core/core-constants";
import { Model } from "mongoose";
import { SerializableEvent } from "src/shared/domain/interfaces/serializable-event";


@Injectable()
export class MongoEventStore {
    private readonly logger = new Logger(MongoEventStore.name);

    constructor(
        @InjectModel(Event.name, EVENT_STORE_CONNECTION)
        private readonly eventStore: Model<Event>
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

            session.commitTransaction();
            this.logger.debug('Events inserted successfully to the event store')
        } catch (error) {
            session.abortTransaction();

            const UNIQUE_CONSTRAINT_ERROR_CODE = 11000;
            if (error?.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
                this.logger.error(`Events could not be persistant. Aggregate is stale.`)
                console.error(error.writeErrors?.[0]?.err?.errmsg);
            } else {
                throw error;
            }
        } finally {
            session.endSession();
        }
    }
}