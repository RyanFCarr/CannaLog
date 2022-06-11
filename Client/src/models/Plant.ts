export default class Plant {
    public id?: number;
    public name?: string;
    public strain?: string;
    public breeder?: string;
    public baseNutrientsBrand?: string;
    public isFeminized: boolean = true;
    public targetPH: number = 6;
    public transplantDate?: string;
    public harvestDate?: string;
    public growType?: string;
    public growMedium?: string;
    public lightingType?: string;
    public lightingSchedule?: string;
}