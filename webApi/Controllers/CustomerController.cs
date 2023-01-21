using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatabaseLab.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiApp.Models;


namespace WebApiApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class CustomersController : Controller
    {
        private readonly BLM19417EContext _context;

        public CustomersController(BLM19417EContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
           return await _context.Customers.Include(d => d.Vehicles).ToListAsync();

          //  return await _context.Customers.ToListAsync();

        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.Include(d => d.Vehicles)
                .Where(c => c.CustomerId == id).FirstOrDefaultAsync();

            //var customer = await _context.Customers.
            //    FirstOrDefaultAsync(m => m.CustomerId == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset(int id, Customer customer)
        {
            //if (id != employee.CustomerId)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(employee).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!CustomerExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();

            if (ModelState.IsValid)
            {



                var control = true;
                if (id != customer.CustomerId)
                {
                    return BadRequest();
                }
                var c = await _context.Customers.Include(d => d.Vehicles).AsNoTracking()
                    .Where(c => c.CustomerId == id).FirstOrDefaultAsync();

                if (c.CName != customer.CName)
                    control = false;
               

                if (control)
                {
                    return NoContent();
                }
                _context.Entry(customer).State = EntityState.Modified;

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

                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }

        }


        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
           
           

                if (ModelState.IsValid)
            {
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

            // DELETE: api/Customers/5
            [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}