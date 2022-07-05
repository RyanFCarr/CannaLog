import { toShortDate } from "../util/functions";
import AdditiveAdjustment from "./AdditiveAdjustment";

export default class GrowLog {
    public id: number = 0;
    public plantId: number = 0;
    public plantAge: number = 0;
    public logDate: string = toShortDate(new Date())!;

    public initialPH: number = 0;
    public initialPPM: number = 0;

    public finalPH: number = 0;
    public finalPPM: number = 0;
    public nutrientAdjustment?: AdditiveAdjustment;
    public phAdjustment?: AdditiveAdjustment;

    public lightHeight?: number;
    public plantHeight?: number;

    public airTemperature?: number;
    public humidity?: number;
    public growMediumTemperature?: number;

    public notes?: string;
    public tags?: string;
}