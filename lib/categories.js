const list = [
    {
      "category": "Supermarket",
      "icon" : "",
      "subcategories": [
          "Beverages",
          "Bakery",
          "Canned Food",
          "Dairy Products",
          "Frozen Food",
          "Meat and Poultry",
          "Snacks",
          "Sauces and Spices",
          "Toiletries",
          "Household Essentials"
      ]
  },
  {
    "category": "Health & Beauty",
    "subcategories": [
        "Personal Care",
        "Cosmetics",
        "Fragrances",
        "Hair Care",
        "Skin Care",
        "Oral Care",
        "Vitamins and Supplements",
        "Weight Management",
        "Men's Grooming",
        "Women's Hygiene"
    ]
},  
{
  "category": "Home & Office",
  "subcategories": [
      "Furniture",
      "Home Decor",
      "Bedding",
      "Bath",
      "Kitchen and Dining",
      "Appliances",
      "Office Supplies",
      "Stationery",
      "Storage and Organization",
      "Cleaning Supplies"
  ]
},
{
  "category": "Phones & Tablets",
  "subcategories": [
      "Smartphones",
      "Tablets",
      "Cases and Covers",
      "Screen Protectors",
      "Chargers and Cables",
      "Power Banks",
      "Headphones and Earphones",
      "Bluetooth Speakers",
      "Memory Cards",
      "Phone Accessories"
  ]
},
{
  "category": "Computing",
  "subcategories": [
      "Laptops",
      "Desktops",
      "Monitors",
      "Printers and Scanners",
      "Networking",
      "Storage Devices",
      "Computer Components",
      "Software",
      "Gaming Computers",
      "Tablet Accessories"
  ]
},
{
  "category": "Electronics",
  "subcategories": [
      "TVs",
      "Home Theater Systems",
      "Cameras",
      "Gaming Consoles",
      "Speakers",
      "DVD and Blu-ray Players",
      "Smart Watches",
      "Drones",
      "Projectors",
      "Car Electronics"
  ]
},
{
  "category": "Fashion",
  "subcategories": [
      "Men's Clothing",
      "Women's Clothing",
      "Kid's Clothing",
      "Shoes",
      "Jewelry",
      "Watches",
      "Bags and Wallets",
      "Sunglasses",
      "Hats and Caps",
      "Belts"
  ]
},
{
  "category": "Baby Products",
  "subcategories": [
      "Diapers and Wipes",
      "Baby Clothing",
      "Baby Gear",
      "Baby Feeding",
      "Baby Bathing",
      "Baby Health and Safety",
      "Baby Toys",
      "Baby Nursery",
      "Maternity Clothing",
      "Pregnancy and Nursing"
  ]
},
]

const categories = list.map(category => ({
  category: category.category.toLowerCase(),
  subcategories: category.subcategories.map(subcategory => subcategory.toLowerCase())
}));

export default categories;