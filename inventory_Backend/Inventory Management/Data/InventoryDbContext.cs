// Data/InventoryDbContext.cs
using Microsoft.EntityFrameworkCore;
using InventoryAPI.Models;

namespace InventoryAPI.Data
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options)
            : base(options) { }

        public DbSet<InventoryItem> InventoryItems => Set<InventoryItem>();
    }
}