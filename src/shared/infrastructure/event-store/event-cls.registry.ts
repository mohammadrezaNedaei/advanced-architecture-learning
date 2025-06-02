import { Type } from "@nestjs/common";

export class EventClsRegistry {
    private static readonly eventClsMap = new Map<string, any>();

    static add(eventCls: Type) {
        this.eventClsMap.set(eventCls.name, eventCls)
    }

    static get(eventClsName: string): Type {
        const eventCls = this.eventClsMap.get(eventClsName);
        if(!eventCls)
            throw new Error(`event class ${eventClsName} not registered`);
        
        return eventCls
    }
}