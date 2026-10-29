import { getFoodName } from "./API.ts";

console.log("dsla");
const productName = await getFoodName("5000128104517");
console.log(productName);