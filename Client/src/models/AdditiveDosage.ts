import { Additive, AdditiveDto, AdditiveSaveDto } from './Additive';
import { checkRequiredProperties } from './ModelHelpers';

export class AdditiveDosage {
    public id?: number;
    public additive?: Additive;
    public amount?: number;
    public unitofMeasure: string = "mL";

    public static fromDTO = (dto: AdditiveDosageDto): AdditiveDosage => <AdditiveDosage>dto;
}

export class AdditiveDosageDto {
    public id!: number;
    public additive!: AdditiveDto;
    public amount!: number;
    public unitofMeasure!: string;
}

export class AdditiveDosageSaveDto {
    public additiveId: number = 0;
    public amount: number = 0;
    public unitofMeasure: string = "";

    public static fromView = (view: AdditiveDosage): AdditiveDosageSaveDto => {
        //checkRequiredProperties<AdditiveDosageSaveDto, AdditiveDosage>(new AdditiveDosageSaveDto(), view);

        const saveDto = <AdditiveDosageSaveDto>view;
        saveDto.additiveId = view.additive!.id!;

        return saveDto;
    }
}
