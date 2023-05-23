import mongoose from "mongoose";
import Restaurant from "../models/Restaurant";
import Menu from "../models/Menu";

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
const menus = [
  { name: "Margherita Pizza", description: "Classic pizza with tomato, mozzarella, and basil" },
  { name: "Pepperoni Pizza", description: "Pizza topped with pepperoni slices and cheese" },
  { name: "BBQ Chicken Pizza", description: "Pizza topped with BBQ sauce, chicken, and cheese" },
  { name: "Vegetarian Pizza", description: "Pizza with assorted vegetables and cheese" },
  { name: "Buffalo Chicken Pizza", description: "Pizza with spicy buffalo sauce, chicken, and cheese" },
  { name: "Spinach and Feta Pizza", description: "Pizza with spinach, feta cheese, and olive oil" },
  { name: "Classic Cheeseburger", description: "Juicy beef patty with cheese, lettuce, and tomato" },
  { name: "Spicy Chicken Burger", description: "Burger with spicy breaded chicken and toppings" },
  { name: "Double Cheeseburger", description: "Burger with two beef patties and cheese" },
  { name: "Western Burger", description: "Burger with onion rings, bacon, and BBQ sauce" },
  { name: "Blue Cheese Burger", description: "Burger with blue cheese crumbles and toppings" },
  { name: "Jalapeno Burger", description: "Burger with jalapenos and spicy toppings" },
  { name: "Avocado Burger", description: "Burger topped with fresh avocado slices and toppings" },
  { name: "Clam Chowder", description: "Creamy soup with clams and potatoes" },
  { name: "Lentil Soup", description: "Soup made with nutritious lentils and spices" },
  { name: "Cream of Mushroom Soup", description: "Rich and creamy soup with mushrooms" },
  { name: "French Onion Soup", description: "Soup made with caramelized onions and melted cheese" },
  { name: "Corn Chowder", description: "Hearty soup with sweet corn and potatoes" },
  { name: "Beef Stew", description: "Thick and flavorful stew with tender beef and vegetables" },
  { name: "Butternut Squash Soup", description: "Soup made with roasted butternut squash and spices" },
  { name: "Broccoli Cheddar Soup", description: "Soup with broccoli and cheddar cheese" },
  { name: "Carbonara", description: "Pasta with egg, cheese, pancetta, and black pepper" },
  { name: "Shrimp Scampi", description: "Pasta with shrimp, garlic, and butter sauce" },
  { name: "Grilled Chicken Breast", description: "Juicy chicken breast grilled to perfection" },
  { name: "Chicken Parmesan", description: "Breaded chicken topped with tomato sauce and melted cheese" },
  { name: "BBQ Chicken Wings", description: "Chicken wings glazed with BBQ sauce" },
  { name: "Butter Chicken", description: "Indian chicken dish cooked in a buttery tomato-based sauce" },
  { name: "Teriyaki Chicken", description: "Chicken marinated and grilled in teriyaki sauce" },
  { name: "Lemon Pepper Chicken", description: "Chicken seasoned with zesty lemon pepper seasoning" },
  { name: "Chicken Caesar Salad", description: "Salad with grilled chicken, lettuce, croutons, and Caesar dressing" },
  { name: "Honey Mustard Chicken", description: "Chicken glazed with a sweet and tangy honey mustard sauce" },
  {
    name: "Chicken Enchiladas",
    description: "Tortillas filled with chicken, cheese, and sauce, baked until melted and bubbly",
  },
  { name: "New York Strip Steak", description: "Classic New York strip steak" },
  { name: "Prime Rib", description: "Slow-roasted prime rib with au jus" },
  { name: "Surf and Turf", description: "Combination of steak and seafood, typically lobster or shrimp" },
  { name: "Beef Tacos", description: "Tacos filled with seasoned ground beef and toppings" },
  { name: "Beef Burrito", description: "Burrito filled with beef, rice, beans, and toppings" },
  { name: "Beef Stir Fry", description: "Beef and vegetables stir-fried in a savory sauce" },
  { name: "Beef Kebabs", description: "Skewered beef marinated and grilled to perfection" },
  { name: "Grilled Salmon", description: "Fresh salmon fillet grilled and seasoned with herbs" },
  { name: "Grilled Vegetables", description: "Assorted vegetables grilled to perfection" },
  { name: "Vegetable Stir Fry", description: "Assorted vegetables stir-fried in a savory sauce" },
  { name: "Greek Salad", description: "Salad with cucumbers, tomatoes, olives, feta cheese, and dressing" },
  { name: "Caesar Salad", description: "Salad with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing" },
  { name: "Cobb Salad", description: "Salad with grilled chicken, bacon, avocado, eggs, and blue cheese" },
  {
    name: "Mediterranean Salad",
    description: "Salad with mixed greens, olives, feta cheese, and Mediterranean dressing",
  },
  { name: "Fruit Salad", description: "Assorted fresh fruits served in a salad" },
  { name: "Chocolate Cake", description: "Rich and moist chocolate cake with chocolate frosting" },
  { name: "Cheesecake", description: "Creamy and decadent cheesecake with a graham cracker crust" },
  { name: "Strawberry Shortcake", description: "Dessert with fresh strawberries, whipped cream, and cake" },
  { name: "Ice Cream Sundae", description: "Sundae with ice cream, toppings, whipped cream, and a cherry on top" },
  { name: "Lemon Tart", description: "Tart with tangy lemon filling and a buttery crust" },
  { name: "Banana Split", description: "Classic dessert with a split banana, ice cream, and toppings" },
  { name: "Panna Cotta", description: "Italian dessert with a silky cream base, served with fruit sauce" },
  { name: "Key Lime Pie", description: "Pie with a tangy lime filling and a crumbly graham cracker crust" },
  { name: "Fudge Brownie", description: "Rich and fudgy chocolate brownie" },
  { name: "Carrot Cake", description: "Moist cake with grated carrots and cream cheese frosting" },
  { name: "Baklava", description: "Sweet pastry made with layers of filo dough and nuts" },
  { name: "Cinnamon Roll", description: "Sweet roll with cinnamon filling and cream cheese frosting" },
];
const prices = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const openingHours = [8, 9, 10, 11, 12];
const closingHours = [16, 17, 18, 19, 20, 21, 22];
const minimumOrderPrices = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const deliveryMaxDistances = [2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
const deliveryPrices = [0, 2.99, 3.99, 4.99, 5.99, 6.99, 7.99, 8.99];
const extraDeliveryFees = [1.99, 2.99, 3.99, 4.99];
const colors = [
  ["#01295F", "#013E8D", "#0150B7"],
  ["#82204A", "#A3295E", "#C43171"],
  ["#494331", "#625A41", "#7A7052"],
  ["#539987", "#6DB0A0", "#88BFB2"],
  ["#564D65", "#6D627F", "#817595"],
  ["#9381FF", "#BAADFF", "#DDD6FF"],
  ["#CCA300", "#F5C400", "#FFD21F"],
];
const paths = [
  [
    "M0 59L30 83.2C60 107.3 120 155.7 180 175.8C240 196 300 188 360 184.8C420 181.7 480 183.3 540 184.5C600 185.7 660 186.3 720 177.5C780 168.7 840 150.3 870 141.2L900 132L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
    "M0 336L30 335.7C60 335.3 120 334.7 180 327.7C240 320.7 300 307.3 360 304.3C420 301.3 480 308.7 540 312.8C600 317 660 318 720 305.7C780 293.3 840 267.7 870 254.8L900 242L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
    "M0 385L30 381.3C60 377.7 120 370.3 180 372C240 373.7 300 384.3 360 409.8C420 435.3 480 475.7 540 479.8C600 484 660 452 720 433.3C780 414.7 840 409.3 870 406.7L900 404L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
  ],
  [
    "M0 124L30 114.2C60 104.3 120 84.7 180 93.3C240 102 300 139 360 147.7C420 156.3 480 136.7 540 126.3C600 116 660 115 720 117.2C780 119.3 840 124.7 870 127.3L900 130L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
    "M0 278L30 289.5C60 301 120 324 180 316.3C240 308.7 300 270.3 360 262.3C420 254.3 480 276.7 540 297.8C600 319 660 339 720 339C780 339 840 319 870 309L900 299L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
    "M0 529L30 523.3C60 517.7 120 506.3 180 503.3C240 500.3 300 505.7 360 486.8C420 468 480 425 540 402.3C600 379.7 660 377.3 720 390.2C780 403 840 431 870 445L900 459L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
  ],
  [
    "M0 112L30 109C60 106 120 100 180 102.8C240 105.7 300 117.3 360 114.5C420 111.7 480 94.3 540 107C600 119.7 660 162.3 720 188C780 213.7 840 222.3 870 226.7L900 231L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
    "M0 346L30 349.7C60 353.3 120 360.7 180 353.3C240 346 300 324 360 312.8C420 301.7 480 301.3 540 311.7C600 322 660 343 720 356.5C780 370 840 376 870 379L900 382L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
    "M0 442L30 433.3C60 424.7 120 407.3 180 420.2C240 433 300 476 360 471.2C420 466.3 480 413.7 540 390.3C600 367 660 373 720 397.3C780 421.7 840 464.3 870 485.7L900 507L900 601L870 601C840 601 780 601 720 601C660 601 600 601 540 601C480 601 420 601 360 601C300 601 240 601 180 601C120 601 60 601 30 601L0 601Z",
  ],
  [
    "M0 129L18.8 152.2C37.7 175.3 75.3 221.7 112.8 213.7C150.3 205.7 187.7 143.3 225.2 126.7C262.7 110 300.3 139 337.8 138.7C375.3 138.3 412.7 108.7 450.2 112.5C487.7 116.3 525.3 153.7 562.8 174.8C600.3 196 637.7 201 675.2 193.5C712.7 186 750.3 166 787.8 170.8C825.3 175.7 862.7 205.3 881.3 220.2L900 235L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z",
    "M0 279L18.8 269C37.7 259 75.3 239 112.8 242C150.3 245 187.7 271 225.2 282.8C262.7 294.7 300.3 292.3 337.8 280.7C375.3 269 412.7 248 450.2 258.2C487.7 268.3 525.3 309.7 562.8 330.2C600.3 350.7 637.7 350.3 675.2 344C712.7 337.7 750.3 325.3 787.8 303.3C825.3 281.3 862.7 249.7 881.3 233.8L900 218L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z",
    "M0 471L18.8 474C37.7 477 75.3 483 112.8 465.3C150.3 447.7 187.7 406.3 225.2 414C262.7 421.7 300.3 478.3 337.8 492.5C375.3 506.7 412.7 478.3 450.2 448C487.7 417.7 525.3 385.3 562.8 369.7C600.3 354 637.7 355 675.2 381.7C712.7 408.3 750.3 460.7 787.8 490.8C825.3 521 862.7 529 881.3 533L900 537L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z",
  ],
  [
    "M0 105L18.8 104.7C37.7 104.3 75.3 103.7 112.8 97C150.3 90.3 187.7 77.7 225.2 74C262.7 70.3 300.3 75.7 337.8 82.5C375.3 89.3 412.7 97.7 450.2 108C487.7 118.3 525.3 130.7 562.8 146.2C600.3 161.7 637.7 180.3 675.2 198.7C712.7 217 750.3 235 787.8 213.2C825.3 191.3 862.7 129.7 881.3 98.8L900 68L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z",
    "M0 245L18.8 246.2C37.7 247.3 75.3 249.7 112.8 257.3C150.3 265 187.7 278 225.2 271.5C262.7 265 300.3 239 337.8 243.7C375.3 248.3 412.7 283.7 450.2 310C487.7 336.3 525.3 353.7 562.8 359.5C600.3 365.3 637.7 359.7 675.2 353.5C712.7 347.3 750.3 340.7 787.8 337.7C825.3 334.7 862.7 335.3 881.3 335.7L900 336L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z",
    "M0 513L18.8 513.7C37.7 514.3 75.3 515.7 112.8 505C150.3 494.3 187.7 471.7 225.2 463.3C262.7 455 300.3 461 337.8 451.7C375.3 442.3 412.7 417.7 450.2 399.2C487.7 380.7 525.3 368.3 562.8 385.8C600.3 403.3 637.7 450.7 675.2 469.2C712.7 487.7 750.3 477.3 787.8 478.2C825.3 479 862.7 491 881.3 497L900 503L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z",
  ],
];

const generateRestaurants = async () => {
  const data = restaurantNames.slice(0, 5).map(name => ({
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
    d: [...paths[Math.floor(Math.random() * paths.length)]],
    fill: [...colors[Math.floor(Math.random() * colors.length)]],
  }));

  return await Restaurant.insertMany(data);
};

const generateMenu = async (restaurant: any) => {
  const shuffled = menus.sort(() => 0.5 - Math.random());

  const data = shuffled.slice(0, menus.length).map(x => ({
    restaurant: restaurant._id,
    name: `${restaurant.name
      .split(" ")
      .map((y: string) => y.charAt(0))
      .join("")} ${x.name}`,
    description: x.description,
    price: prices[Math.floor(Math.random() * prices.length)],
  }));

  await Menu.insertMany(data);
};

export const seedDatabase = async () => {
  try {
    // await mongoose.connection.db.dropCollection("restaurants");
    // await mongoose.connection.db.dropCollection("menus");

    if (process.env.NODE_ENV === "production") return;

    const count = await Restaurant.countDocuments({});

    if (count !== 0) return;

    const restaurantIds = await generateRestaurants();

    console.log(restaurantIds);

    await Promise.all(restaurantIds.map(x => generateMenu(x)));
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
};
