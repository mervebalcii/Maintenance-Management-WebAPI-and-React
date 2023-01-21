using DatabaseLab.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiApp.Models;

namespace WebApiApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleItemsController : Controller
    {
        private readonly BLM19417EContext _context;

        public VehicleItemsController(BLM19417EContext context)
        {
            _context = context;
        }

        // GET: api/Maintenance
        [HttpGet]


        public async Task<ActionResult<IEnumerable<VehicleItem>>> GetVehicleItem()
        {
            return await _context.VehicleItems.ToListAsync();


        }

        // GET: api/Maintenances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleItem>> GetVehicleItem(int id)
        {
            var product = await _context.VehicleItems.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754

        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleItem(int id, VehicleItem maintenance)
        {
            if (id != maintenance.VehicleItemId)
            {
                return BadRequest();
            }

            _context.Entry(maintenance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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


        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<VehicleItem>> PostVehicleItem(VehicleItem customer)
        {

            _context.VehicleItems.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVehicleItem", new { id = customer.VehicleItemId }, customer);


        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.VehicleItems.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            _context.VehicleItems.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.VehicleItems.Any(e => e.VehicleItemId == id);
        }
    }
}
