import type { Metadata, NextPage } from "next";
import Container from "@mui/joy/Container";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { getAllDishes } from "@/app/(app)/dishes/dishes";
import { type Dish, DishPicker } from "@/app/(app)/dishes/DishPicker";

const dishes = await getAllDishes();

const dishObjects: Dish[] = dishes.map((dish) => ({
	name: dish,
	lowercase: dish.toLowerCase(),
	similarity: 0
}));

export const metadata: Metadata = {
	title: "Dishes"
};

const DishesPage: NextPage = () => (
	<Container sx={{ py: 10 }} maxWidth="md">
		<Stack gap={6} alignItems="center">
			<Typography level="h1" sx={{ alignSelf: "start" }}>
				Dishes
			</Typography>

			<DishPicker dishes={dishObjects} />
		</Stack>
	</Container>
);

export default DishesPage;
