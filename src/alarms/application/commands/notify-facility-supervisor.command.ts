export class NotifyFacilitySupervisorCommand {
    constructor(
        public readonly facilityId: string,
        public readonly alarmsIds: string[],
    ) {}
}