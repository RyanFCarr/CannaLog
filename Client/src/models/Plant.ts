import { checkRequiredProperties } from "./ModelHelpers";

// View model used by our page
export default class Plant {
    public id?: number;
    public name?: string;
    public strain?: string;
    public breeder?: string;
    public baseNutrientsBrand?: string;
    public isFeminized?: boolean;
    public targetPH?: number;
    public transplantDate?: string;
    public harvestDate?: string;
    public age?: number;
    public growType?: string;
    public growMedium?: string;
    public lightingType?: string;
    public lightingSchedule?: string;
    public status?: string;
    public terminationReason?: string;
  
    // Very simple since the View model is more permissive of nulls
    public static fromDTO = (dto: PlantDto): Plant => <Plant>dto;
  }
  
  // DTO we get back from the server
export class PlantDto {
    public id!: number;
    public name!: string;
    public strain?: string;
    public breeder?: string;
    public baseNutrientsBrand!: string;
    public isFeminized!: boolean;
    public targetPH!: number;
    public transplantDate?: string;
    public harvestDate?: string;
    public age?: number;
    public growType!: string;
    public growMedium!: string;
    public lightingType!: string;
    public lightingSchedule!: string;
    public status!: string;
    public terminationReason?: string;
  }
  
  // DTO we send to the server
  // The default values are needed so that we can properly use Object.keys()
  // Without them, JS just sees an empty object coming back from the constructor
export class PlantSaveDto {
    public name: string = "";
    public strain?: string = undefined;
    public breeder?: string = undefined;
    public baseNutrientsBrand: string = "";
    public isFeminized: boolean = false;
    public targetPH: number = 0;
    public transplantDate?: string = undefined;
    public harvestDate?: string = undefined;
    public age?: number = undefined;
    public growType: string = "";
    public growMedium: string = "";
    public lightingType: string = "";
    public lightingSchedule: string = "";
    public status: string = "";
    public terminationReason?: string = undefined;
  
    // More involved since we want to do some validations and the DTO is more strict about nulls
    public static fromView = (view: Plant): PlantSaveDto => {
        checkRequiredProperties<PlantSaveDto, Plant>(new PlantSaveDto(), view);
  
        return <PlantDto>view;
    }
}