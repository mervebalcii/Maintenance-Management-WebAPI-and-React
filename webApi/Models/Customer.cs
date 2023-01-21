using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApiApp.Models
{
   
    public partial class Customer
    {
        public Customer()
        {
            Vehicles = new HashSet<Vehicle>();
        }


        public int CustomerId { get; set; }

        public string? CName { get; set; }

        public string? CLastName { get; set; }
        public double? CNumber { get; set; }


        public string? Cinsiyet { get; set; }


        public virtual ICollection<Vehicle>? Vehicles { get; set; }
        //public virtual ICollection<Vehicle> Vehicles { get; set; }

        //     public virtual ICollection<GeneralTable> GeneralTables { get; set; }

    }
}
