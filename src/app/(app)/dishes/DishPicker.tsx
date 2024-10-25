"use client";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { type Dispatch, type FC, type SetStateAction, useState } from "react";
import Card from "@mui/joy/Card";
import { useHasRendered } from "@/components/useHasRendered";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import Divider from "@mui/joy/Divider";

function shuffleArray<T>(array: T[]) {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

const minSubstringLength = 4;

export interface Dish {
	name: string;
	lowercase: string;
	/**
	 * We pre-construct and reuse Dish objects, to reduce memory churn
	 * so similarity field is baked in
	 */
	similarity: number;
}

function substringSimilarity(a: Dish, b: Dish) {
	if (a.lowercase === b.lowercase) {
		// exactly the same should be ranked at the bottom to not show up again
		return Number.MIN_SAFE_INTEGER;
	}

	// Check if selected dish is a substring of the dish or vice versa
	if (b.lowercase.includes(a.lowercase) || a.lowercase.includes(b.lowercase)) {
		return Math.min(a.lowercase.length, b.lowercase.length); // Full match score by length
	}

	// Calculate partial matches based on common substrings
	let maxMatchLength = 0;
	for (let i = 0; i <= a.lowercase.length - minSubstringLength; i++) {
		for (let j = i + minSubstringLength; j <= a.lowercase.length; j++) {
			const substring = a.lowercase.slice(i, j);
			if (b.lowercase.includes(substring)) {
				maxMatchLength = Math.max(maxMatchLength, substring.length);
			}
		}
	}
	return maxMatchLength;
}

function getSimilarDishes(selectedDish: Dish, dishes: Dish[]) {
	for (const dish of dishes) {
		dish.similarity = substringSimilarity(selectedDish, dish);
	}

	shuffleArray(dishes);

	return dishes.sort((a, b) => b.similarity - a.similarity);
}

function getRandomDish<T>(dishes: T[]): T {
	return dishes[Math.floor(Math.random() * dishes.length)];
}

interface Props {
	dishes: Dish[];
}

export const DishPicker: FC<Props> = ({ dishes }) => {
	const [dish, setDish] = useState<Dish>(getRandomDish(dishes));
	const rendered = useHasRendered();
	if (!rendered) {
		return (
			<Typography level="h2" textAlign="center">
				Choosing...
			</Typography>
		);
	}

	const similarDishes = getSimilarDishes(dish, dishes);

	return (
		<>
			<Typography level="h2" textAlign="center">
				{dish.name}
			</Typography>

			<Button
				onClick={() => {
					setDish(getRandomDish(dishes));
				}}
			>
				Another one
			</Button>

			<DishesList
				title="Similar dishes"
				setDish={setDish}
				dishes={similarDishes.slice(0, 10)}
			/>

			<DishesList
				title="Not so similar dishes"
				setDish={setDish}
				dishes={similarDishes.slice(-10)}
			/>
		</>
	);
};

interface DishesListProps {
	dishes: Dish[];
	title: string;
	setDish: Dispatch<SetStateAction<Dish>>;
}

const DishesList: FC<DishesListProps> = ({ dishes, title, setDish }) => (
	<Card variant="outlined" sx={{ width: 400 }}>
		<Typography level="h4">{title}</Typography>
		<Divider />
		<List>
			{dishes.map((dish) => (
				<ListItemButton
					key={dish.name}
					onClick={() => {
						setDish(dish);
					}}
				>
					{dish.name}
				</ListItemButton>
			))}
		</List>
	</Card>
);
