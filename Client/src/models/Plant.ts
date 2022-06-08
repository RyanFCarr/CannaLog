export default class Plant {
    public name?: string;
    public strain?: string;
    public breeder?: string;
    public baseNutrientsBrand?: string;
    public isFeminized: boolean = true;
    public targetPH: number = 6;
    public transplantDate?: Date;
    public harvestDate?: Date;
}