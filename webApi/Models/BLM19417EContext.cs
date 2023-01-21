using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WebApiApp.Models;

namespace DatabaseLab.Models
{
    public partial class BLM19417EContext : DbContext
    {
        public BLM19417EContext()
        {
        }

        public BLM19417EContext(DbContextOptions<BLM19417EContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; } = null!;

        public virtual DbSet<Maintenance> Maintenances { get; set; } = null!;

        //   public virtual DbSet<GeneralTable> GeneralTables { get; set; } = null!;

     
        public virtual DbSet<VehicleItem> VehicleItems { get; set; } = null!;
        
        public virtual DbSet<Vehicle> Vehicles { get; set; } = null!;
        public virtual DbSet<Employee> Employees { get; set; } = null!;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=BLM19417E;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                //  entity.Property(e => e.DeptIdFk).HasColumnName("deptId_fk");
                entity.HasKey(e => e.CustomerId);
              //  entity.Property(e => e.CustomerId).ValueGeneratedNever();

                entity.Property(e => e.CLastName)
                    .HasMaxLength(10)
                    .HasColumnName("CLastName")
                    .IsFixedLength();

                entity.Property(e => e.CName)
                    .HasMaxLength(10)
                    .HasColumnName("CName")
                    .IsFixedLength();

                entity.Property(e => e.Cinsiyet)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("Cinsiyet");

                
                  //entity.HasOne(e => e.Vehicless)
                  //.WithMany(p => p.customers)
                  //.HasForeignKey(d => d.CustomerId)
                  //.OnDelete(DeleteBehavior.Cascade)
                  //.HasConstraintName("CustomerId_fk");
                
                entity.Property(e => e.CNumber).HasColumnName("CNumber");

               
            });

            //modelBuilder.Entity<Department>(entity =>
            //{
            //    entity.Property(e => e.Id).ValueGeneratedNever();

            //    entity.Property(e => e.DepartmentName)
            //        .HasMaxLength(10)
            //        .IsFixedLength();
            //});

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee");

                entity.Property(e => e.EmployeeId).ValueGeneratedNever();

                entity.Property(e => e.EmployeeName)
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.EmpLastname)
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

           

            modelBuilder.Entity<Maintenance>(entity =>
            {

                entity.ToTable("Maintenance");
                entity.HasKey(e => e.MaintenanceId);

                entity.Property(e => e.MaintenanceId).HasColumnName("maintenanceId");


                //entity.HasOne(d => d.StudentIdFkNavigation)
                //    .WithMany(p => p.Maintenances)
                //    .HasForeignKey(d => d.VehicleId)
                //    .OnDelete(DeleteBehavior.Cascade)
                //    .HasConstraintName("VehicleId");
            });

            //modelBuilder.Entity<GeneralTable>(entity =>
            //{

            //    entity.ToTable("GeneralTable");
            //    entity.HasKey(e => e.Id);

            //    entity.Property(e => e.Id).HasColumnName("Id");

            //    //   entity.Property(e => e.Id).ValueGeneratedNever();

            //    entity.HasOne(d => d.VehicleNavigation)
            //        .WithMany(p => p.GeneralTables)
            //        .HasForeignKey(d => d.Id)
            //        .OnDelete(DeleteBehavior.Cascade);


            //    entity.HasOne(d => d.MaintenanceNavigation)
            //       .WithMany(p => p.GeneralTables)
            //       .HasForeignKey(d => d.Id)
            //       .OnDelete(DeleteBehavior.Cascade);

            //    entity.HasOne(d => d.CustomerNavigation)
            //       .WithMany(p => p.GeneralTables)
            //       .HasForeignKey(d => d.Id)
            //       .OnDelete(DeleteBehavior.Cascade);

            //});



            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.ToTable("Vehicle");

                //                entity.Property(e => e.VehicleId).ValueGeneratedNever();
                entity.HasKey(e => e.VehicleId);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Model)
                    .HasMaxLength(50)
                    .IsFixedLength();

                entity.Property(e => e.Plaka)
                    .HasMaxLength(50)
                    .IsFixedLength();

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Vehicles)
                    .HasForeignKey(d => d.CustomerId);


                //entity.HasOne(d => d.CustomerIdFkNavigation)
                //    .WithMany(p => p.Vehicles)
                //    .HasForeignKey(d => d.CustomerId);
                // .HasConstraintName("studentId_fk");

            });



            modelBuilder.Entity<VehicleItem>(entity =>

          
            {  
                entity.ToTable("VehicleItem");
                entity.HasIndex(e => e.VehicleId);

                entity.HasIndex(e => e.MaintenanceId);

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.VehicleItems)
                    .HasForeignKey(d => d.VehicleId);

                entity.HasOne(d => d.Maintenance)
                    .WithMany(p => p.VehicleItems)
                    .HasForeignKey(d => d.MaintenanceId);
            });






            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
