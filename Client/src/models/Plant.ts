export default class Plant {
    public Name?: string;
    public Strain?: string;
    public Breeder?: string;
    public BaseNutrientsBrand?: string;
    public IsFeminized: boolean = true;
    public TargetPH: number = 6;
    public TransplantDate?: Date;
    public HarvestDate?: Date;
}