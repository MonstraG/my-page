import { parseDiceNotation } from "@/components/DiceRoll/DiceSeletion/parseDiceNotation";
import { expect, test } from "vitest";

test("parseDiceNotation accepts empty input as valid", () => {
	expect(parseDiceNotation("")).toStrictEqual([]);
});

test("parseDiceNotation accepts one dice set as valid", () => {
	expect(parseDiceNotation("2d6")).toStrictEqual([6, 6]);
});

test("parseDiceNotation accepts several dice sets", () => {
	expect(parseDiceNotation("1d4 + 2d6 + 1d20")).toStrictEqual([4, 6, 6, 20]);
});

test("parseDiceNotation gracefully handles repeated dice types, summing the counts", () => {
	expect(parseDiceNotation("2d6 + 2d6")).toStrictEqual([6, 6, 6, 6]);
});

test("parseDiceNotation doesn't accept dice notations without `d`", () => {
	expect(parseDiceNotation("2m6")).toBe(null);
});

test("parseDiceNotation doesn't accept hanging +", () => {
	expect(parseDiceNotation("2d6 + ")).toBe(null);
});

test("parseDiceNotation doesn't accept to many d's", () => {
	expect(parseDiceNotation("2d6d7")).toBe(null);
});

// it would be nice in future to implement those modificators actually, but not right now
test("parseDiceNotation doesn't accept hanging numbers", () => {
	expect(parseDiceNotation("2d6 + 2")).toBe(null);
});

test("parseDiceNotation doesn't accept zero dice value", () => {
	expect(parseDiceNotation("2d0")).toBe(null);
});

test("parseDiceNotation doesn't accept zero dice count", () => {
	expect(parseDiceNotation("0d6")).toBe(null);
});

test("parseDiceNotation doesn't accept negative dice value", () => {
	expect(parseDiceNotation("-1d6")).toBe(null);
});

test("parseDiceNotation doesn't accept negative dice count", () => {
	expect(parseDiceNotation("2d-1")).toBe(null);
});
