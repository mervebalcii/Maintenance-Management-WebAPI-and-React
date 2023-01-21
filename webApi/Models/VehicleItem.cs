using System.Text.Json.Serialization;

namespace WebApiApp.Models
{
    public class VehicleItem
    {


        public int VehicleItemId { get; set; }

        public int? MaintenanceId { get; set; }
        public int? VehicleId { get; set; }

        //[JsonIgnore]
        public virtual Vehicle? Vehicle { get; set; }


      //  [JsonIgnore]
        public virtual Maintenance? Maintenance { get; set; }




    }
}
