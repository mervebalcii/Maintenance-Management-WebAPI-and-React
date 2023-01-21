using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace WebApiApp.Models;
using System.Text.Json.Serialization;

public partial class Vehicle
{


    public Vehicle()
    {
        VehicleItems = new HashSet<VehicleItem>();
    }

    public int VehicleId { get; set; }

    public string? Model { get; set; }

    public DateTime? Date { get; set; }

    public int? CustomerId { get; set; }

    public string? Plaka { get; set; }



   // [JsonIgnore]
    public virtual Customer? Customer { get; set; }


    public virtual ICollection<VehicleItem>? VehicleItems { get; set; }

    // public virtual ICollection<Customer> Customers { get; set; }
    //public virtual ICollection<Maintenance> Maintenances { get; set; }

    // public virtual ICollection<GeneralTable> GeneralTables { get; set; }
}