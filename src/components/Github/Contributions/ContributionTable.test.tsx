import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ContributionTable } from "@/components/Github/Contributions/ContributionTable";

let languageGetter: jest.SpyInstance;
beforeEach(() => {
	languageGetter = jest.spyOn(navigator, "language", "get");
});

describe("ContributionTable", () => {
	const noContributions = {
		totalContributions: 0,
		maxContributions: 0,
		days: [{ date: new Date(), contributionCount: 0 }]
	};

	it("renders Monday first for browser locale en-GB", () => {
		languageGetter.mockReturnValue("en-GB");
		render(<ContributionTable contributions={noContributions} />);
		const day = screen.getByTitle("Monday");
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion,testing-library/no-node-access
		expect(day.parentElement!.children[0]).toBe(day);
	});

	it("renders Sunday first for browser locale en-US", () => {
		languageGetter.mockReturnValue("en-US");
		render(<ContributionTable contributions={noContributions} />);
		const day = screen.getByTitle("Sunday");
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion,testing-library/no-node-access
		expect(day.parentElement!.children[0]).toBe(day);
	});
});
