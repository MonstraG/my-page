import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContributionsTable } from "@/components/ContributionsTable";

let languageGetter: jest.SpyInstance;
beforeEach(() => {
	languageGetter = jest.spyOn(navigator, "language", "get");
});

describe("ContributionsTable", () => {
	const emptyContribution = {
		totalContributions: 0,
		maxContributions: 0,
		days: [{ date: new Date(), contributionCount: 0 }]
	};

	it("renders Monday first for browser locale en-GB", () => {
		languageGetter.mockReturnValue("en-GB");
		render(<ContributionsTable contributions={emptyContribution} />);
		const day = screen.getByTitle("Monday");
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		expect(day.parentElement!.children[0]).toBe(day);
	});

	it("renders Sunday first for browser locale en-US", () => {
		languageGetter.mockReturnValue("en-US");
		render(<ContributionsTable contributions={emptyContribution} />);
		const day = screen.getByTitle("Sunday");
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		expect(day.parentElement!.children[0]).toBe(day);
	});
});
