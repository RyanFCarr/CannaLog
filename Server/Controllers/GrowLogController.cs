using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GrowLogController : ControllerBase
    {
        private readonly ILogger<GrowLogController> _logger;
        private readonly IGrowLogService _growLogService;

        public GrowLogController(ILogger<GrowLogController> logger, IGrowLogService growLogService)
        {
            _logger = logger;
            _growLogService = growLogService;
        }

        [HttpGet]
        public IActionResult Get() => Ok(_growLogService.GetAll());

        [HttpGet("{id}", Name = "GetGrowLogById")]
        public IActionResult GetById([FromRoute] int id)
        {
            var growLog = _growLogService.GetOne(id);
            if (growLog == null) return NotFound();

            return Ok(growLog);
        }

        /**
         * All nested objects have required fields, which cause us to need to supply them, even if they already exist
         * We want to be able to either provide the full object or just its Id if it already exists
         * What happens if we give it a nonzero Id with different info
         * Does it update or ignore the additional info.
         */
        [HttpPost]
        public IActionResult Create([FromBody] GrowLog newGrowLog)
        {
            var growLog = _growLogService.Create(newGrowLog);
            return CreatedAtRoute("GetGrowLogById", new { id = growLog.Id }, growLog);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] GrowLog growLog)
        {
            var updatedGrowLog = _growLogService.Update(growLog);
            return Ok(updatedGrowLog);
        }
    }
}
