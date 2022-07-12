using AutoMapper;

namespace Server.Models
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Plant, PlantDto>();
            CreateMap<PlantSaveDto, Plant>()
                .ForMember(dest => dest.GrowLogs, opt => opt.Ignore());

            CreateMap<GrowLog, GrowLogDto>()
                .ForMember(dest => dest.PlantId, opt => opt.MapFrom(src => src.Plant.Id))
                .ForMember(dest => dest.NutrientAdjustment, opt => opt.MapFrom(src => src.AdditiveAdjustments.FirstOrDefault(a => a.Type == "NUTES")))
                .ForMember(dest => dest.PHAdjustment, opt => opt.MapFrom(src => src.AdditiveAdjustments.FirstOrDefault(a => a.Type == "PH")));
            CreateMap<GrowLogSaveDto, GrowLog>()
                .ForMember(dest => dest.Plant, opt => opt.Ignore())
                .ForMember(dest => dest.AdditiveAdjustments, opt => opt.MapFrom(src => CreateAdjustments(src.NutrientAdjustment, src.PHAdjustment)));

            CreateMap<AdditiveAdjustment, AdditiveAdjustmentDto>();
            CreateMap<AdditiveAdjustmentSaveDto, AdditiveAdjustment>();

            CreateMap<AdditiveDosage, AdditiveDosageDto>();
            CreateMap<AdditiveDosageSaveDto, AdditiveDosage>()
                .ForMember(dest => dest.Additive, opt => opt.Ignore());
        }

        private static List<AdditiveAdjustmentSaveDto>? CreateAdjustments(AdditiveAdjustmentSaveDto? nute, AdditiveAdjustmentSaveDto? ph)
        {
            var adjustments = new List<AdditiveAdjustmentSaveDto>();
            if (nute != null) adjustments.Add(nute);
            if (ph != null) adjustments.Add(ph);

            if (adjustments.Any()) return adjustments;
            return null;
        }
    }
}
