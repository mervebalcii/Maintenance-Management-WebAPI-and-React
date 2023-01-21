using DatabaseLab.Models;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using System.Buffers.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using WebApiApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<BLM19417EContext>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddAutoMapper();
var options = new JsonSerializerOptions
{
    ReferenceHandler = ReferenceHandler.Preserve
};

//string json = JsonSerializer.Serialize(objectWithLoops, options);

//// -----------------------------------------
//// for asp.net core 3.1 (globaly)
//builder.Services.AddMvc()
// .AddJsonOptions(o => {
//     o.JsonSerializerOptions
//        .ReferenceHandler = ReferenceHandler.Preserve

//           });


//builder.Services.AddMvc()
//     .AddNewtonsoftJson(
//          options => {
//              options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
//          });


builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


builder.Services.AddCors(options =>
{

    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
var app = builder.Build();
app.UseCors();


//var app = builder.Build();

app.UseRouting();
app.UseCors();
app.UseAuthorization();





// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
