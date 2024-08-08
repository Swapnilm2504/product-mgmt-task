using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ProductManagementApp.Service;

namespace ProductManagementApp.Service
{
    public class ProductService
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "products.json");

        public async Task<List<Product>> GetProductsAsync()
        {
            try
            {
                if (!File.Exists(_filePath))
                {
                    return new List<Product>();
                }

                using var jsonFileReader = new StreamReader(_filePath);
                var fileContent = await jsonFileReader.ReadToEndAsync();
                var products = JsonSerializer.Deserialize<List<Product>>(fileContent);

                return products ?? new List<Product>();
            }
            catch (Exception)
            {
                return new List<Product>();
            }
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            var products = await GetProductsAsync();
            return products.FirstOrDefault(p => p.Id == id);
        }

        public async Task AddProductAsync(Product newProduct)
        {
            var products = await GetProductsAsync();
            newProduct.Id = products.Any() ? products.Max(p => p.Id) + 1 : 1;
            products.Add(newProduct);
            await SaveProductsAsync(products);
        }

        public async Task UpdateProductAsync(Product updatedProduct)
        {
            var products = await GetProductsAsync();
            var productIndex = products.FindIndex(p => p.Id == updatedProduct.Id);
            if (productIndex >= 0)
            {
                products[productIndex] = updatedProduct;
                await SaveProductsAsync(products);
            }
        }

        public async Task DeleteProductAsync(int id)
        {
            var products = await GetProductsAsync();
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product != null)
            {
                products.Remove(product);
                await SaveProductsAsync(products);
            }
        }

        private async Task SaveProductsAsync(List<Product> products)
        {
            using var outputStream = File.OpenWrite(_filePath);
            outputStream.SetLength(0); // Clear the file before writing to it
            await JsonSerializer.SerializeAsync(outputStream, products);
        }
    }
}
