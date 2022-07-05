export enum AdditiveType {
    NUTES='NUTES',
    PH='PH'
}

export class Additive {
    public id: number = 0;
    public brand?: string;
    public name: string = "";
    public tags?: string;
    public type: AdditiveType = AdditiveType.NUTES;
}

export class AdditiveDto {
    public id?: number;
    public brand?: string;
    public name!: string;
    public tags?: string;
    public type!: AdditiveType;
}