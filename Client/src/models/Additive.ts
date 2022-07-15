import { checkRequiredProperties } from "./ModelHelpers";

export enum AdditiveType {
    NUTES = 'NUTES',
    PH = 'PH'
}

export class Additive {
    public id?: number;
    public brand?: string;
    public name?: string;
    public tags?: string;
    public type?: AdditiveType;

    public static fromDTO = (dto: AdditiveDto): Additive => <Additive>dto;
}

export class AdditiveDto {
    public id?: number;
    public brand?: string;
    public name!: string;
    public tags?: string;
    public type!: AdditiveType;
}

export class AdditiveSaveDto {
    public brand?: string = undefined;
    public name: string = "";
    public tags?: string = undefined;
    public type: AdditiveType = AdditiveType.NUTES;

    public static fromView = (view: Additive): AdditiveSaveDto => {
        checkRequiredProperties<AdditiveSaveDto, Additive>(new AdditiveSaveDto(), view);

        return <AdditiveSaveDto>view;
    }
}
