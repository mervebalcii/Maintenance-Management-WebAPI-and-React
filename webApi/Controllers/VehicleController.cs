using DatabaseLab.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiApp.Models;

namespace WebApiApp.Controllers
{  
    [ApiController]
    [Route("api/[controller]")]
  
    public class VehicleController : Controller
    {
        private readonly BLM19417EContext _context;


        public VehicleController(BLM19417EContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
            //return await _context.Customers.Include(d => d.Deliveries).ToListAsync();
          //  return await _context.Vehicles.Include(d => d.Customer).ToListAsync();
         //   return await _context.Vehicles.ToListAsync();
            return await _context.Vehicles.Include(d => d.Customer).Include(d => d.VehicleItems)
                .ToListAsync();

        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {

            //var vehicle = await _context.Vehicles.
            //    FirstOrDefaultAsync(m => m.VehicleId == id);

            var products = await _context.VehicleItems.Include(c => c.Maintenance).
                Where(c => c.VehicleId == id).ToListAsync();

            var vehicle = await _context.Vehicles.Include(c => c.Customer)
                
                .Where(c => c.VehicleId == id).FirstOrDefaultAsync();
            vehicle.VehicleItems = products;

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }


        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
        {
            if (id != vehicle.VehicleId)
            {
                return BadRequest();
            }

            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehiclerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/Vehicle
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {

            /*
            Vehicle Nvehicle = new Vehicle();
            Nvehicle.VehicleId = vehicle.VehicleId;
            Nvehicle.Model = vehicle.Model;
            Nvehicle.CustomerId= vehicle.CustomerId;
            Nvehicle.Plaka = vehicle.Plaka;
            */
            //var customer = _context.Customers;
         
            if (ModelState.IsValid)
            {
                _context.Vehicles.Add(vehicle);
            //    _context.Entry(customer).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetVehicle", new { id = vehicle.VehicleId }, vehicle);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {

            //var delivery = await _context.Deliveries.Include(c => c.DeliveryItems)
            //    .Where(c => c.DeliveryId == id).FirstOrDefaultAsync();

            var vehicle = await _context.Vehicles.Include(c => c.VehicleItems)
                .Where(c => c.VehicleId == id).FirstOrDefaultAsync();

            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehiclerExists(int id)
        {
            return _context.Vehicles.Any(e => e.VehicleId == id);
        }


    }
}
