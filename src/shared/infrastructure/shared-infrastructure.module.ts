import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "./event-store/schema/event.schema";
import { EVENT_STORE_CONNECTION } from "src/core/core-constants";
import { EventSerializer } from "./event-store/serializers/event-serializer";
import { MongoEventStore } from "./event-store/mongo-event-store";
import { EventStorePublisher } from "./event-store/publishers/event-store.publisher";
import { EventDeserializer } from "./event-store/deserializer/event-deserializer";
import { eventBridge } from "./event-store/event-bridge";

@Module({
    imports: [
        MongooseModule.forFeature(
            [{name: Event.name, schema: EventSchema}],
            EVENT_STORE_CONNECTION
        )
    ],
    providers: [
        EventStorePublisher, EventSerializer, MongoEventStore, EventDeserializer, eventBridge,
    ]
})
export class SharedInfrastructureModule {}
