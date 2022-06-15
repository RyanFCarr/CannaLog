﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Contexts;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(PlantContext))]
    [Migration("20220614233402_AddStatusAndTerminationReason")]
    partial class AddStatusAndTerminationReason
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Server.Models.Plant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("BaseNutrientsBrand")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Breeder")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GrowMedium")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GrowType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("HarvestDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsFeminized")
                        .HasColumnType("bit");

                    b.Property<string>("LightingSchedule")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LightingType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Strain")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TargetPH")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("TerminationReason")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("TransplantDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Plants");
                });
#pragma warning restore 612, 618
        }
    }
}
