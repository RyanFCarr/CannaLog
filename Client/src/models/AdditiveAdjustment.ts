import AdditiveDosage from "./AdditiveDosage";

export default class AdditiveAdjustment {
    public id: number = 0;
    public dosages?: AdditiveDosage[];
    public finalReading: number = 0;
    public initialReading: number = 0;
}