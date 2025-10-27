import { parseDiceNotation } from "./parseDiceNotation.ts";
import { test } from "node:test";
import assert from "node:assert/strict";

test("accepts empty input as valid", () => {
	assert.deepStrictEqual(parseDiceNotation(""), []);
});

test("accepts one dice set as valid", () => {
	assert.deepStrictEqual(parseDiceNotation("2d6"), [6, 6]);
});

test("accepts several dice sets", () => {
	assert.deepStrictEqual(parseDiceNotation("1d4 + 2d6 + 1d20"), [4, 6, 6, 20]);
});

test("gracefully handles repeated dice types, summing the counts", () => {
	assert.deepStrictEqual(parseDiceNotation("2d6 + 2d6"), [6, 6, 6, 6]);
});

test("doesn't accept dice notations without `d`", () => {
	assert.deepStrictEqual(parseDiceNotation("2m6"), null);
});

test("doesn't accept hanging +", () => {
	assert.deepStrictEqual(parseDiceNotation("2d6 + "), null);
});

test("doesn't accept to many d's", () => {
	assert.deepStrictEqual(parseDiceNotation("2d6d7"), null);
});

// it would be nice in future to implement those modificators actually, but not right now
test("doesn't accept hanging numbers", () => {
	assert.deepStrictEqual(parseDiceNotation("2d6 + 2"), null);
});

test("doesn't accept zero dice value", () => {
	assert.deepStrictEqual(parseDiceNotation("2d0"), null);
});

test("doesn't accept zero dice count", () => {
	assert.deepStrictEqual(parseDiceNotation("0d6"), null);
});

test("doesn't accept negative dice value", () => {
	assert.deepStrictEqual(parseDiceNotation("-1d6"), null);
});

test("doesn't accept negative dice count", () => {
	assert.deepStrictEqual(parseDiceNotation("2d-1"), null);
});
