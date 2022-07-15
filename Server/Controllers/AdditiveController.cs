using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdditiveController : ControllerBase
    {
        private readonly ILogger<AdditiveController> _logger;
        private readonly IAdditiveService _additiveService;

        public AdditiveController(ILogger<AdditiveController> logger, IAdditiveService additiveService)
        {
            _logger = logger;
            _additiveService = additiveService;
        }

        [HttpGet]
        public IActionResult Get() => Ok(_additiveService.GetAll());
    }
}
