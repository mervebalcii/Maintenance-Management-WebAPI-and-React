using System;
using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiApp.Models
{
    public partial class Maintenance
    {
        public Maintenance()
        {

            VehicleItems = new HashSet<VehicleItem>();
        }

        public int MaintenanceId { get; set; }

        public double? Bakim { get; set; }

        public string? Name { get; set; }





        public virtual ICollection<VehicleItem>? VehicleItems { get; set; }



        //    public virtual ICollection<GeneralTable> GeneralTables { get; set; }
    }
    /*
    [Keyless]
    public class ProductModel
    {
        public List<Maintenance> Maintenances { get; set; }
    }
    */
}
