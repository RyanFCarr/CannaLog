import { toShortDate } from "../util/functions";
import { AdditiveAdjustment, AdditiveAdjustmentDto, AdditiveAdjustmentSaveDto } from "./AdditiveAdjustment";
import { checkRequiredProperties } from "./ModelHelpers";

export default class GrowLog {
    public id?: number;
    public plantId?: number;
    public plantAge?: number;
    public logDate: string = toShortDate(new Date())!;

    public initialPH?: number;
    public initialPPM?: number;

    public finalPH?: number;
    public finalPPM?: number;
    public nutrientAdjustment?: AdditiveAdjustment;
    public phAdjustment?: AdditiveAdjustment;

    public lightHeight?: number;
    public plantHeight?: number;

    public airTemperature?: number;
    public humidity?: number;
    public growMediumTemperature?: number;

    public notes?: string;
    public tags?: string;

    public static fromDTO = (dto: GrowLogDto): GrowLog => <GrowLog>dto;
}

export class GrowLogDto {
    public id!: number;
    public plantId!: number;
    public plantAge!: number;
    public logDate!: string;
    public initialPH!: number;
    public initialPPM!: number;
    public finalPH!: number;
    public finalPPM!: number;
    public nutrientAdjustment?: AdditiveAdjustmentDto;
    public phAdjustment?: AdditiveAdjustmentDto;
    public lightHeight?: number;
    public plantHeight?: number;
    public airTemperature?: number;
    public humidity?: number;
    public growMediumTemperature?: number;
    public notes?: string;
    public tags?: string;
}

export class GrowLogSaveDto {
    public plantId: number = 0;
    public plantAge: number = 0;
    public logDate: string = "";
    public initialPH: number = 0;
    public initialPPM: number = 0;
    public finalPH: number = 0;
    public finalPPM: number = 0;
    public nutrientAdjustment?: AdditiveAdjustmentSaveDto = undefined;
    public phAdjustment?: AdditiveAdjustmentSaveDto = undefined;
    public lightHeight?: number = undefined;
    public plantHeight?: number = undefined;
    public airTemperature?: number = undefined;
    public humidity?: number = undefined;
    public growMediumTemperature?: number = undefined;
    public notes?: string = undefined;
    public tags?: string = undefined;

    public static fromView = (view: GrowLog): GrowLogSaveDto => {
        // This is going to be more complicated because of the nested objects not being of the same type
        // checkRequiredProperties<GrowLogSaveDTO, GrowLog>(new GrowLogSaveDTO(), view);
        const saveDto = <GrowLogSaveDto>view;
        if (view.nutrientAdjustment) saveDto.nutrientAdjustment = AdditiveAdjustmentSaveDto.fromView(view.nutrientAdjustment);
        if (view.phAdjustment) saveDto.phAdjustment = AdditiveAdjustmentSaveDto.fromView(view.phAdjustment);

        return <GrowLogSaveDto>view;
    }
}
