import { Additive, AdditiveDto } from './Additive';

export default class AdditiveDosage {
    public id: number = 0;
    public additive: Additive = new Additive();
    public amount?: number;
    public unitofMeasure: string = "mL";
}

export class AdditiveDosageDto {
    public id?: number;
    public additive?: AdditiveDto;
    public amount?: number;
    public unitofMeasure?: string = "mL";
}
