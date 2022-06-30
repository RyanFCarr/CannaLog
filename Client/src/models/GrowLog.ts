import { toShortDate } from "../util/functions";
import AdditiveAdjustment from "./AdditiveAdjustment";

export default class GrowLog {
    // auto generated
    public id: number = 0;
    public plantName: string = "";
    public plantAge: number = 0;
    public logDate: string = toShortDate(new Date())!;

    public initialPH: number = 0;
    public initialPPM: number = 0;

    public finalPH: number = 0;
    public finalPPM: number = 0;
    public additiveAdjustments?: AdditiveAdjustment[];

    public lightHeight?: number;
    public plantHeight?: number;

    public airTemperature?: number;
    public humidity?: number;
    public growMediumTemperature?: number;

    public notes?: string;
    public tags?: string;
}