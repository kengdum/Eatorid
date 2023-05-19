import Restaurant from "../models/Restaurant";

const restaurantNames = [
  "The Hungry Bear",
  "Casa di Pasta",
  "The Spice Route",
  "Taste of India",
  "Mamma Mia Pizzeria",
  "The Burger Joint",
  "Sushi Paradise",
  "Café Paris",
  "El Ranchero Grill",
  "Thai Orchid",
  "La Dolce Vita",
  "The Golden Dragon",
  "Chez Pierre",
  "Le Bistro",
  "Taco Loco",
  "Sabor Latino",
  "Gourmet Garden",
  "Bella Italia",
  "The BBQ Pit",
  "Ming's Noodle House",
  "The Olive Tree",
  "Chez Marie",
  "Peking Palace",
  "Café Canela",
  "Sushi Samurai",
  "Taste of Mexico",
  "Bistro du Chef",
  "Havana Nights",
  "The Mediterranean",
  "Gourmet Delights",
  "Flavors of Thailand",
  "Café Milano",
  "The Steakhouse",
  "Little Tokyo",
  "La Patisserie",
  "Burger Barbecue",
  "Spice of Life",
  "Ristorante Roma",
  "The Seafood Shack",
  "Taste of Brazil",
  "Café de Paris",
  "The Cozy Corner",
  "Salsa Fiesta",
  "Street Food Market",
  "The Urban Kitchen",
  "The Roasted Bean",
  "Mama's Kitchen",
  "Taste of Greece",
  "The Tandoori Oven",
  "Italian Trattoria",
  "The Fresh Catch",
];
const openingHours = [8, 9, 10, 11, 12];
const closingHours = [16, 17, 18, 19, 20, 21, 22];
const minimumOrderPrices = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const deliveryMaxDistances = [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
const deliveryPrices = [0, 2.99, 3.99, 4.99, 5.99, 6.99, 7.99, 8.99];
const extraDeliveryFees = [1.99, 2.99, 3.99, 4.99];

export const seedDatabase = async () => {
  try {
    if (process.env.NODE_ENV === "production") return;

    const count = await Restaurant.countDocuments({});

    if (count !== 0) return;

    const data = restaurantNames.map(name => ({
      name,
      schedule: Array.from({ length: 7 }).map(() =>
        Math.random() < 0.2
          ? { opening: null, closing: null }
          : {
              opening: `${openingHours[Math.floor(Math.random() * openingHours.length)]}:00`,
              closing: `${closingHours[Math.floor(Math.random() * closingHours.length)]}:00`,
            }
      ),
      minimumOrder: minimumOrderPrices[Math.floor(Math.random() * minimumOrderPrices.length)],
      deliveryMaxDistance: deliveryMaxDistances[Math.floor(Math.random() * deliveryMaxDistances.length)],
      deliveryPrice: deliveryPrices[Math.floor(Math.random() * deliveryPrices.length)],
      extraDeliveryFee: extraDeliveryFees[Math.floor(Math.random() * extraDeliveryFees.length)],
    }));

    await Restaurant.insertMany(data);

    console.log("Done seeding!");
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
};
