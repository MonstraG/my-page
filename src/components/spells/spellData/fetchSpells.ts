import { promises as fsPromises } from "fs";
import { type HTMLElement, parse } from "node-html-parser";

async function getSpell(url: string) {
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0",
			Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "en-US,en;q=0.5",
			"Accept-Encoding": "gzip, deflate, br, zstd",
			DNT: "1",
		},
	});
	if (!response.ok) {
		throw response;
	}

	const page = await response.text();

	const document = parse(page);

	const id = parseInt(url.split("/").at(-1)?.split("-").at(0) ?? "0");

	const titleElement = document.querySelector("h1.page-title");
	const title = titleElement?.innerText ?? "";

	function getStatElement(classname: string) {
		const selector = `.ddb-statblock-item.${classname} > .ddb-statblock-item-value`;
		return getElement(selector);
	}

	function getElement(selector: string) {
		return document.querySelector(selector);
	}

	function getStatText(className: string) {
		const element = getStatElement(className);
		if (element == null) {
			return "";
		}
		return getElementText(element);
	}

	function getElementText(element: HTMLElement) {
		const text = element?.innerText ?? "";
		return text.replaceAll("\n", "").replaceAll("    ", "").replaceAll("&#x27;", "'").trim();
	}

	const level = getStatText("ddb-statblock-item-level");
	const castingTime = getStatText("ddb-statblock-item-casting-time");
	const aoeRange = getStatText("ddb-statblock-item-range-area");
	const components = getStatText("ddb-statblock-item-components");
	const duration = getStatText("ddb-statblock-item-duration");
	const school = getStatText("ddb-statblock-item-school");
	const attackSave = getStatText("ddb-statblock-item-attack-save");
	const damageEffect = getStatText("ddb-statblock-item-damage-effect");

	const description = getElement("div.more-info-content")?.innerHTML.replaceAll("\n", "")
		.replaceAll("    ", "").replaceAll("&#x27;", "'").trim();

	const tags = [...document.querySelectorAll("span.tag.spell-tag")].map(el => el.innerHTML);
	const classes = [...document.querySelectorAll("span.tag.class-tag")].map(el => el.innerHTML)
		.filter(text => !text.toLowerCase().includes("legacy"));

	const sourceElement = getElement("p.source.spell-source");
	const source = sourceElement ? getElementText(sourceElement) : "";

	return {
		id,
		title,
		level,
		castingTime,
		aoeRange,
		components,
		duration,
		school,
		attackSave,
		damageEffect,
		description,
		tags,
		classes,
		source,
	};
}

function delay(time: number) {
	return new Promise(resolve => setTimeout(resolve, time));
}

async function doShit() {
	const xantharSpells = [
		"https://www.dndbeyond.com/spells/2367-abi-dalzims-horrid-wilting",
		"https://www.dndbeyond.com/spells/2368-absorb-elements",
		"https://www.dndbeyond.com/spells/2369-aganazzars-scorcher",
		"https://www.dndbeyond.com/spells/2370-beast-bond",
		"https://www.dndbeyond.com/spells/2371-bones-of-the-earth",
		"https://www.dndbeyond.com/spells/2372-catapult",
		"https://www.dndbeyond.com/spells/14754-catnap",
		"https://www.dndbeyond.com/spells/14758-cause-fear",
		"https://www.dndbeyond.com/spells/14760-ceremony",
		"https://www.dndbeyond.com/spells/14761-chaos-bolt",
		"https://www.dndbeyond.com/spells/2374-control-flames",
		"https://www.dndbeyond.com/spells/2375-control-winds",
		"https://www.dndbeyond.com/spells/2373-create-bonfire",
		"https://www.dndbeyond.com/spells/14765-create-homunculus",
		"https://www.dndbeyond.com/spells/14827-crown-of-stars",
		"https://www.dndbeyond.com/spells/14830-danse-macabre",
		"https://www.dndbeyond.com/spells/14831-dawn",
		"https://www.dndbeyond.com/spells/14834-druid-grove",

		"https://www.dndbeyond.com/spells/2376-dust-devil",
		"https://www.dndbeyond.com/spells/2378-earth-tremor",
		"https://www.dndbeyond.com/spells/2377-earthbind",
		"https://www.dndbeyond.com/spells/2379-elemental-bane",
		"https://www.dndbeyond.com/spells/14836-enemies-abound",
		"https://www.dndbeyond.com/spells/14869-enervation",
		"https://www.dndbeyond.com/spells/2380-erupting-earth",
		"https://www.dndbeyond.com/spells/14870-far-step",
		"https://www.dndbeyond.com/spells/14871-find-greater-steed",
		"https://www.dndbeyond.com/spells/2381-flame-arrows",
		"https://www.dndbeyond.com/spells/2382-frostbite",
		"https://www.dndbeyond.com/spells/14872-guardian-of-nature",
		"https://www.dndbeyond.com/spells/2383-gust",
		"https://www.dndbeyond.com/spells/14873-healing-spirit",
		"https://www.dndbeyond.com/spells/14874-holy-weapon",
		"https://www.dndbeyond.com/spells/14876-illusory-dragon",
		"https://www.dndbeyond.com/spells/2385-immolation",
		"https://www.dndbeyond.com/spells/14877-infernal-calling",
		"https://www.dndbeyond.com/spells/14878-infestation",

		"https://www.dndbeyond.com/spells/2386-investiture-of-flame",
		"https://www.dndbeyond.com/spells/2387-investiture-of-ice",
		"https://www.dndbeyond.com/spells/2388-investiture-of-stone",
		"https://www.dndbeyond.com/spells/2389-investiture-of-wind",
		"https://www.dndbeyond.com/spells/14879-invulnerability",
		"https://www.dndbeyond.com/spells/14880-life-transference",
		"https://www.dndbeyond.com/spells/14881-maddening-darkness",
		"https://www.dndbeyond.com/spells/2390-maelstrom",
		"https://www.dndbeyond.com/spells/2391-magic-stone",
		"https://www.dndbeyond.com/spells/14882-mass-polymorph",
		"https://www.dndbeyond.com/spells/2392-maximilians-earthen-grasp",
		"https://www.dndbeyond.com/spells/2393-melfs-minute-meteors",
		"https://www.dndbeyond.com/spells/14883-mental-prison",
		"https://www.dndbeyond.com/spells/14474-mighty-fortress",
		"https://www.dndbeyond.com/spells/2394-mold-earth",
		"https://www.dndbeyond.com/spells/14519-negative-energy-flood",
		"https://www.dndbeyond.com/spells/14520-power-word-pain",
		"https://www.dndbeyond.com/spells/14558-primal-savagery",
		"https://www.dndbeyond.com/spells/2395-primordial-ward",

		"https://www.dndbeyond.com/spells/14592-psychic-scream",
		"https://www.dndbeyond.com/spells/2396-pyrotechnics",
		"https://www.dndbeyond.com/spells/14593-scatter",
		"https://www.dndbeyond.com/spells/14595-shadow-blade",
		"https://www.dndbeyond.com/spells/14596-shadow-of-moil",
		"https://www.dndbeyond.com/spells/2397-shape-water",
		"https://www.dndbeyond.com/spells/14597-sickening-radiance",
		"https://www.dndbeyond.com/spells/14599-skill-empowerment",
		"https://www.dndbeyond.com/spells/2398-skywrite",
		"https://www.dndbeyond.com/spells/14600-snare",
		"https://www.dndbeyond.com/spells/2399-snillocs-snowball-swarm",
		"https://www.dndbeyond.com/spells/14601-soul-cage",
		"https://www.dndbeyond.com/spells/2400-storm-sphere",
		"https://www.dndbeyond.com/spells/14603-summon-greater-demon",
		"https://www.dndbeyond.com/spells/14604-summon-lesser-demons",
		"https://www.dndbeyond.com/spells/14606-temple-of-the-gods",
		"https://www.dndbeyond.com/spells/14612-tensers-transformation",
		"https://www.dndbeyond.com/spells/14613-thunder-step",

		"https://www.dndbeyond.com/spells/2402-tidal-wave",
		"https://www.dndbeyond.com/spells/14614-tiny-servant",
		"https://www.dndbeyond.com/spells/2403-transmute-rock",
		"https://www.dndbeyond.com/spells/14616-wall-of-light",
		"https://www.dndbeyond.com/spells/2405-wall-of-sand",
		"https://www.dndbeyond.com/spells/2406-wall-of-water",
		"https://www.dndbeyond.com/spells/2407-warding-wind",
		"https://www.dndbeyond.com/spells/2408-watery-sphere",
		"https://www.dndbeyond.com/spells/2409-whirlwind",
		"https://www.dndbeyond.com/spells/14619-wrath-of-nature",
		"https://www.dndbeyond.com/spells/14622-zephyr-strike",
	];

	for (const url of xantharSpells) {
		const spell = await getSpell(url);
		const file = await fsPromises.open(`${spell.id}.json`, "w");
		await file.writeFile(JSON.stringify(spell, null, 4));
		await file.close();
		await delay(3000);
	}
}

await doShit();
