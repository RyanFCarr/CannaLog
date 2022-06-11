using Microsoft.AspNetCore.Http;
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

        public PlantController(ILogger<PlantController> logger, IPlantService plantService)
        {
            _logger = logger;
            _plantService = plantService;
        }

        [HttpGet]
        public IEnumerable<Plant> GetAll()
        {
            return _plantService.GetAll();
        }

        [HttpGet("{id}", Name = "GetById")]
        public IActionResult GetById([FromRoute] int id)
        {
            var plant = _plantService.GetOne(id);
            if (plant == null) return NotFound();

            return Ok(plant);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Plant newPlant)
        {
            var plant = _plantService.Create(newPlant);
            return CreatedAtRoute("GetById", new { id = plant.Id }, plant);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] Plant plant)
        {
            var updatedPlant = _plantService.Update(plant);
            return Ok(updatedPlant);
        }
    }
}
