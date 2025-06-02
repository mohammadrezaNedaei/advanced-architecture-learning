import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Event, EventDocument } from "./schema/event.schema";
import { Model } from "mongoose";
import { EventBus } from "@nestjs/cqrs";
import { ChangeStream, ChangeStreamInsertDocument } from "mongodb";
import { EventDeserializer } from "./deserializer/event-deserializer";
import { EVENT_STORE_CONNECTION } from "src/core/core-constants";

@Injectable()
export class eventBridge 
implements OnApplicationBootstrap, OnApplicationShutdown{
    private changeStream: ChangeStream
    constructor(
        @InjectModel(Event.name, EVENT_STORE_CONNECTION)
        private readonly eventStore: Model<Event>,
        private readonly eventbus: EventBus,
        private readonly eventDeserializer: EventDeserializer
    ) {}

    onApplicationBootstrap() {
        this.changeStream = this.eventStore
            .watch()
            .on('change', (change: ChangeStreamInsertDocument<EventDocument>) => {
                if(change.operationType === 'insert')
                    this.handleEventStoreChange(change); 
            });
    }

    onApplicationShutdown() {
        this.changeStream.close();
    }

    handleEventStoreChange(change: ChangeStreamInsertDocument<EventDocument>){
        const insertedEvent = change.fullDocument;

        const eventInstance = this.eventDeserializer.deserializer(insertedEvent);
        this.eventbus.subject$.next(eventInstance.data);
    }
}