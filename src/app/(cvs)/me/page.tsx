import Image from "next/image";
import styles from "@/app/(cvs)/me/page.module.css";
import type { Metadata, NextPage } from "next";
import { LinkOut } from "@/components/LinkOut";
import "@/app/(cvs)/globals.css";
import { Inter } from "next/font/google";

const email = process.env.ME_MAIL;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Arseny Garelyshev | Full-stack Developer",
	description: "CV page for Arseny Garelyshev, a full-stack developer.",
	robots: { index: false, follow: false }
};

const MyCvPage: NextPage = () => (
	<div className={`${styles.paper} ${inter.className}`}>
		<header className={styles.header}>
			<div className={styles.contactWrapper}>
				<Image
					src="/me-avatar.webp"
					className={styles.avatar}
					width={80}
					height={80}
					quality={100}
					alt="My photo"
				/>
				<div className={styles.contactDetails}>
					<span>Bergen, Norway</span>
					<LinkOut href={`mailto:${email}`} target="_blank" className={styles.subtleLink}>
						{email}
					</LinkOut>
					<LinkOut
						href="https://linkedin.com/in/arseny-garelyshev-086275199"
						className={styles.subtleLink}
					>
						https://linkedin.com/in/arseny-garelyshev-086275199
					</LinkOut>
					<LinkOut href="https://arsga.eu/me" className={styles.subtleLink}>
						https://arsga.eu/me
					</LinkOut>
				</div>
			</div>
			<h1 className={styles.name}>Arseny Garelyshev, Fullstack Software Developer</h1>
			<h2 className={styles.subtitle}>
				I&#x27;m a fullstack software developer, looking to shake-up my tech stack a bit.
			</h2>
		</header>

		<main>
			<section className={`${styles.occupationSection} ${styles.section}`}>
				<h3 className={styles.sectionTitle}>Work Experience</h3>
				<div className={styles.sectionGrid}>
					<div className={styles.dateSpan}>Oct 2020 - Now</div>
					<div>
						<h4 className={styles.columnTitle}>
							<LinkOut href="https://lifekeys.no" className={styles.subtleLink}>
								Lifekeys AS, Developer
							</LinkOut>
						</h4>
						<p className={styles.occupationDescription}>
							4 years building online mental health services
						</p>
						<p className={styles.occupationDescription}>Languages used:</p>
						<p className={styles.occupationDescription}>
							TypeScript (+React\Next.Js) &mdash; 4 years
						</p>
						<p className={styles.occupationDescription}>C# &mdash; 4 years</p>
					</div>
				</div>
				<div className={styles.sectionGrid}>
					<div className={styles.dateSpan}>Apr 2019 - Oct 2020</div>
					<div>
						<h4 className={styles.columnTitle}>
							<LinkOut href="https://vedisoft.info/" className={styles.subtleLink}>
								Vedisoft, Software Engineer
							</LinkOut>
						</h4>

						<p className={styles.occupationDescription}>
							1.5 years building softphone CRM integration system
						</p>
						<p className={styles.occupationDescription}>Languages used:</p>
						<p className={styles.occupationDescription}>
							TypeScript (+Angular) &mdash; 1 year
						</p>
						<p className={styles.occupationDescription}>Golang &mdash; 1 year</p>
					</div>
				</div>
			</section>

			<section className={`${styles.occupationSection} ${styles.section}`}>
				<h3 className={styles.sectionTitle}>Education</h3>
				<div className={styles.sectionGrid}>
					<div className={styles.dateSpan}>Sep 2016 - Jul 2020</div>
					<div>
						<h4 className={styles.columnTitle}>
							<LinkOut href="https://urfu.ru/en" className={styles.subtleLink}>
								Ural Federal University, Bachelor in Applied Informatics
							</LinkOut>
						</h4>

						<p className={styles.occupationDescription}>
							4-year Bachelor&apos;s in Applied Informatics
						</p>
						<p className={styles.occupationDescription}>Languages used:</p>
						<p className={styles.occupationDescription}>Javascript &mdash; 1 year</p>
						<p className={styles.occupationDescription}>Java &mdash; 1 year</p>
						<p className={styles.occupationDescription}>
							Python &mdash; 2 years self-taught
						</p>
					</div>
				</div>
			</section>

			<section className={`${styles.miscSection} ${styles.section}`}>
				<h3 className={styles.sectionTitle}>Spoken Languages</h3>
				<div className={styles.miscSectionGrid}>
					<div>
						<h4 className={styles.columnTitle}>English</h4>
						<div
							className={styles.proficiencyStars}
							title="Approx. C1"
							aria-label="Approx. C1"
						>
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStarEmpty} />
						</div>
					</div>
					<div>
						<h4 className={styles.columnTitle}>Norwegian</h4>
						<div
							className={styles.proficiencyStars}
							title="Approx. B1"
							aria-label="Approx. B1"
						>
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStarEmpty} />
							<div className={styles.proficiencyStarEmpty} />
							<div className={styles.proficiencyStarEmpty} />
						</div>
					</div>
					<div>
						<h4 className={styles.columnTitle}>Russian</h4>
						<div className={styles.proficiencyStars} title="Native" aria-label="Native">
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
							<div className={styles.proficiencyStar} />
						</div>
					</div>
				</div>
			</section>

			<section className={`${styles.miscSection} ${styles.section}`}>
				<h3 className={styles.sectionTitle}>Languages &amp; Frameworks Used Recently</h3>
				<ul className={styles.colorBoxList}>
					<li>TypeScript</li>
					<li>C#</li>
					<li>React</li>
					<li>PostgreSQL</li>
					<li>Golang</li>
					<li>Git</li>
				</ul>
			</section>

			<section className={`${styles.miscSection} ${styles.section}`}>
				<h3 className={styles.sectionTitle}>Have experience in</h3>
				<div className={styles.miscSectionGrid}>
					<div>
						<h4 className={styles.columnTitle}>Technologies</h4>
						<div className={styles.miscSectionColumnText}>
							<div>WSL/Linux</div>
							<div>Jest</div>
							<div>OpenID</div>
						</div>
					</div>
					<div>
						<h4 className={styles.columnTitle}>Solutions</h4>
						<div className={styles.miscSectionColumnText}>
							<div>Payment systems</div>
							<div>Video conferencing</div>
							<div>Authentication</div>
						</div>
					</div>
					<div>
						<h4 className={styles.columnTitle}>Other</h4>
						<div className={styles.miscSectionColumnText}>
							<div>UX</div>
							<div>i18n</div>
							<div>
								<code>...rest</code>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
);

export default MyCvPage;
