﻿// Models/InventoryItem.cs
namespace InventoryAPI.Models
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
    }
}