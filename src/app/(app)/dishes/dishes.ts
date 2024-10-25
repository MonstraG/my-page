import { promises as fsPromises } from "fs";

const dishesFile = "public/dishes.txt";

export async function getAllDishes(): Promise<string[]> {
	const content = await fsPromises.readFile(dishesFile, "utf8");
	return content.split("\n");
}
