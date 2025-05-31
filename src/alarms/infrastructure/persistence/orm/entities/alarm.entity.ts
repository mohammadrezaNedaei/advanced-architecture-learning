import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { AlarmItemEntity } from "./alarm-item.entity";

@Entity('alams')
export class AlarmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    severity: string;

    @Column()
    triggeredAt: Date;

    @Column()
    isAcknowledged: boolean;

    @OneToMany(() => AlarmItemEntity, (item) => item.alarm, {cascade: true})
    items: AlarmItemEntity[];

}