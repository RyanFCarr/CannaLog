using Microsoft.EntityFrameworkCore;
using Server.Contexts;
using Server.Repositories;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add DbContexts
builder.Services.AddDbContext<PlantContext>(b => b.UseSqlServer(builder.Configuration.GetConnectionString("CannaLog")));

// Add Services and Repos
builder.Services.AddScoped<IPlantService, PlantService>();
builder.Services.AddScoped<IPlantRepository, PlantRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS BS
var allowedOriginsPolicy = "allowedOriginsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: allowedOriginsPolicy,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allowedOriginsPolicy);
app.UseAuthorization();

app.MapControllers();

app.Run();
