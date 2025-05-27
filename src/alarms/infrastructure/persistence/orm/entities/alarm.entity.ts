import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('alams')
export class AlarmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    severity: string;
}