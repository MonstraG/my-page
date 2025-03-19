import { parseMarkdownData, serializeMarkdownData } from "@/components/blog/parseMarkdownData";
import { expect, test } from "vitest";

const minimumValidInput = serializeMarkdownData({ a: 1 }, "b");

test("parseMarkdownData returns data on minimal valid input", () => {
	const { data, content } = parseMarkdownData(minimumValidInput);
	expect(data).toEqual({ a: 1 });
	expect(content).toEqual("b");
});

test("parseMarkdownData returns no data on whitespace", () => {
	const markdown = "\r\n \r\n \n";
	const { data, content } = parseMarkdownData(markdown);
	expect(data).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns no data if doesn't start with ---", () => {
	const markdown = "." + minimumValidInput;
	const { data, content } = parseMarkdownData(markdown);
	expect(data).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns no data if data block doesn't have end", () => {
	const markdown = minimumValidInput.replace("---", "___");
	const { data, content } = parseMarkdownData(markdown);
	expect(data).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns no data if data block is empty", () => {
	const markdown = `---\n---\ncontent`;
	const { data, content } = parseMarkdownData(markdown);
	expect(data).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns no data if data block is malformed", () => {
	const invalidJson = `{a:1}`; // should have quotes around key
	const markdown = `---\n${invalidJson}---\ncontent`;
	const { data, content } = parseMarkdownData(markdown);
	expect(data).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns data even with CRLF", () => {
	const markdown = minimumValidInput.replaceAll("\n", "\r\n");
	const { data, content } = parseMarkdownData(markdown);
	expect(data).toEqual({ a: 1 });
	expect(content).toEqual("b");
});
