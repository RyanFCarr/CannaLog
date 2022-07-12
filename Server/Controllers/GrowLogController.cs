using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GrowLogController : ControllerBase
    {
        private readonly ILogger<GrowLogController> _logger;
        private readonly IGrowLogService _growLogService;
        private readonly IMapper _mapper;

        public GrowLogController(ILogger<GrowLogController> logger, IGrowLogService growLogService, IMapper mapper)
        {
            _logger = logger;
            _growLogService = growLogService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get() => Ok(_growLogService.GetAll());

        [HttpGet("{id}", Name = "GetGrowLogById")]
        public IActionResult GetById([FromRoute] int id)
        {
            var growLog = _growLogService.GetOne(id);
            if (growLog == null) return NotFound();

            return Ok(_mapper.Map<GrowLogDto>(growLog));
        }

        [HttpPost]
        public IActionResult Create([FromBody] GrowLogSaveDto newGrowLog)
        {
            var growLog = _growLogService.Create(_mapper.Map<GrowLog>(newGrowLog));
            return CreatedAtRoute("GetGrowLogById", new { id = growLog.Id }, growLog);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] GrowLogSaveDto growLog)
        {
            var updatedGrowLog = _growLogService.Update(_mapper.Map<GrowLog>(growLog, opts => opts.AfterMap((o, g) => g.Id = id)));
            return Ok(updatedGrowLog);
        }
    }
}
