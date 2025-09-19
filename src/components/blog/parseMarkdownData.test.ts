import { parseMarkdownData, serializeMarkdownData } from "@/components/blog/parseMarkdownData";
import { expect, test } from "vitest";

const minimumValidInput = serializeMarkdownData({ a: 1 }, "b");

test("returns data on minimal valid input", () => {
	const { metadata, content } = parseMarkdownData(minimumValidInput);
	expect(metadata).toEqual({ a: 1 });
	expect(content).toEqual("b");
});

test("returns no data on whitespace", () => {
	const markdown = "\r\n \r\n \n";
	const { metadata, content } = parseMarkdownData(markdown);
	expect(metadata).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns no data if doesn't start with ---", () => {
	const markdown = `.${minimumValidInput}`;
	const { metadata, content } = parseMarkdownData(markdown);
	expect(metadata).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns no data if data block doesn't have end", () => {
	const markdown = minimumValidInput.replace("---", "___");
	const { metadata, content } = parseMarkdownData(markdown);
	expect(metadata).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns no data if data block is empty", () => {
	const markdown = "---\n---\ncontent";
	const { metadata, content } = parseMarkdownData(markdown);
	expect(metadata).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns no data if data block is malformed", () => {
	const invalidJson = "{a:1}"; // should have quotes around key
	const markdown = `---\n${invalidJson}---\ncontent`;
	const { metadata, content } = parseMarkdownData(markdown);
	expect(metadata).toEqual(undefined);
	expect(content).toEqual(markdown);
});

test("returns data even with CRLF", () => {
	const markdown = minimumValidInput.replaceAll("\n", "\r\n");
	const { metadata, content } = parseMarkdownData(markdown);
	expect(metadata).toEqual({ a: 1 });
	expect(content).toEqual("b");
});
