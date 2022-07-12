import AdditiveDosage, { AdditiveDosageDto } from "./AdditiveDosage";

export enum AdditiveAdjustmentType {
    NUTES='NUTES',
    PH='PH'
}

export default class AdditiveAdjustment {
    public id?: number;
    public dosages?: AdditiveDosage[];
    public finalReading?: number;
    public initialReading?: number;
    public type?: AdditiveAdjustmentType;

    constructor(type: AdditiveAdjustmentType, initialReading: number) {
        this.type = type;
        this.initialReading = initialReading;
        this.finalReading = initialReading;
    }
}

export class AdditiveAdjustmentDto {
    public id!: number;
    public dosages?: AdditiveDosage[];
    public finalReading!: number;
    public initialReading!: number;
    public type!: AdditiveAdjustmentType;
}

export class AdditiveAdjustmentSaveDto {
    public dosages?: AdditiveDosage[];
    public finalReading!: number;
    public initialReading!: number;
    public type!: AdditiveAdjustmentType;
}
