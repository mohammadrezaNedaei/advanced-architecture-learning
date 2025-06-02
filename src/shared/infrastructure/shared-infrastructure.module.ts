import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "./event-store/schema/event.schema";
import { EVENT_STORE_CONNECTION } from "src/core/core-constants";
import { EventSerializer } from "./event-store/serializers/event-serializer";
import { MongoEventStore } from "./event-store/mongo-event-store";
import { EventStorePublisher } from "./event-store/publishers/event-store.publisher";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{name: Event.name, schema: EventSchema}],
            EVENT_STORE_CONNECTION
        )
    ],
    providers: [
        EventStorePublisher, EventSerializer, MongoEventStore
    ]
})
export class SharedInfrastructureModule {}
