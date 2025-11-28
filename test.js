// const cart = [
//   { item: "Apple", category: "Fruit", price: 10 },
//   { item: "Carrot", category: "Vegetable", price: 5 },
//   { item: "Banana", category: "Fruit", price: 20 },
//   { item: "Chicken", category: "Meat", price: 50 },
//   { item: "Broccoli", category: "Vegetable", price: 15 },
// ];

// const groupedData = cart.reduce((acc, element) => {
//   const category = element.category;
//   // Fruit

//   // acc.Fruit
//  if (!acc[category]) { 
//   acc[category] = {
//     items: [],
//     totaCost: 0,
//   }
// }
//   // acc.Fruit
//   acc[category].items.push(element.item)
//   acc[category].totaCost = acc[category].totaCost +  element.price
 
//   return acc

// },{});

// console.log("This is data",groupedData)