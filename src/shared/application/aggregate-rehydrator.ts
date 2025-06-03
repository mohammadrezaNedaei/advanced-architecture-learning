import { Injectable, Type } from "@nestjs/common";
import { EventStore } from "./ports/event-store";
import { EventPublisher } from "@nestjs/cqrs";
import { VersionedAggregateRoot } from "../domain/aggregate-root";


@Injectable()
export class AggregateRehydrator {
    constructor(
        private readonly eventStore: EventStore,
        private readonly eventPublisher: EventPublisher,
    ) {}

    async rehydrate<T extends VersionedAggregateRoot>(
        aggregateId: string,
        AggregateCls: Type<T>,
    ): Promise<T> {
        const events = await this.eventStore.getEventByStreamId(aggregateId);

        const aggregateClsWithDispatcher = 
            this.eventPublisher.mergeClassContext(AggregateCls);
        const aggregate = new aggregateClsWithDispatcher(aggregateId)
        
        aggregate.loadFromHistory(events);
        return aggregate;
    }
}