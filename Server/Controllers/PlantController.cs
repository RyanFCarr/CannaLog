using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly ILogger<PlantController> _logger;
        private readonly IPlantService _plantService;
        private readonly IGrowLogService _growLogService;
        private readonly IMapper _mapper;

        public PlantController(ILogger<PlantController> logger, IPlantService plantService, IGrowLogService growLogService, IMapper mapper)
        {
            _logger = logger;
            _plantService = plantService;
            _growLogService = growLogService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_plantService.GetAll().Select(p => _mapper.Map<PlantDto>(p)));

        [HttpGet("{id}", Name = "GetPlantById")]
        public IActionResult GetById([FromRoute] int id)
        {
            var plant = _plantService.GetOne(id);
            if (plant == null) return NotFound();

            return Ok(_mapper.Map<PlantDto>(plant));
        }

        [HttpGet("{id}/growlog")]
        public IActionResult GetGrowLogsForPlant([FromRoute] int id) => Ok(_growLogService.GetAll(g => g.PlantId == id).Select(g => _mapper.Map<GrowLogDto>(g)));

        [HttpPost]
        public IActionResult Create([FromBody] PlantSaveDto newPlant)
        {
            var plant = _plantService.Create(_mapper.Map<Plant>(newPlant));
            return CreatedAtRoute("GetPlantById", new { id = plant.Id }, _mapper.Map<PlantDto>(plant));
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] PlantSaveDto plant)
        {
            var updatedPlant = _plantService.Update(_mapper.Map<Plant>(plant, opts => opts.AfterMap((o,p) => p.Id = id)));
            return Ok(_mapper.Map<PlantDto>(updatedPlant));
        }
    }
}
