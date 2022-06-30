import AdditiveDosage from './AdditiveDosage';

export default class PHAdjustment {
    public id: number = 0;
    public dosages?: AdditiveDosage[];
    public finalPH: number = 0;
    public initialPH: number = 0;
}