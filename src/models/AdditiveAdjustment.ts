import { AdditiveDosage, AdditiveDosageDto, AdditiveDosageSaveDto } from "./AdditiveDosage";
import { checkRequiredProperties } from "./ModelHelpers";

export enum AdditiveAdjustmentType {
    NUTES = 'NUTES',
    PH = 'PH'
}

export class AdditiveAdjustment {
    public id?: number;
    public dosages?: AdditiveDosage[];
    public finalReading?: number;
    public initialReading?: number;
    public type?: AdditiveAdjustmentType;

    constructor(type: AdditiveAdjustmentType, initialReading?: number) {
        this.type = type;
        this.initialReading = initialReading;
        this.finalReading = initialReading;
    }

    public static fromDTO = (dto: AdditiveDosageDto): AdditiveDosage => <AdditiveDosage>dto;
}

export class AdditiveAdjustmentDto {
    public id!: number;
    public dosages?: AdditiveDosageDto[];
    public finalReading!: number;
    public initialReading!: number;
    public type!: AdditiveAdjustmentType;
}

export class AdditiveAdjustmentSaveDto {
    public dosages?: AdditiveDosageSaveDto[] = undefined;
    public finalReading: number = 0;
    public initialReading: number = 0;
    public type: AdditiveAdjustmentType = AdditiveAdjustmentType.NUTES;

    public static fromView = (view: AdditiveAdjustment): AdditiveAdjustmentSaveDto => {
        checkRequiredProperties<AdditiveAdjustmentSaveDto, AdditiveAdjustment>(new AdditiveAdjustmentSaveDto(), view);

        const saveDto = <AdditiveAdjustmentSaveDto>view;

        if (view.dosages) saveDto.dosages = view.dosages.map(d => AdditiveDosageSaveDto.fromView(d));

        return saveDto;
    }
}
