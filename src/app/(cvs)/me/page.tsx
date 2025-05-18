import styles from "@/app/(cvs)/me/page.module.css";
import { LinkOut } from "@/components/LinkOut";
import type { Metadata, NextPage } from "next";
import Image from "next/image";
import "@/app/(cvs)/cv.css";
import { GithubIcon } from "@/icons/custom/GithubIcon";
import { LinkedInIcon } from "@/icons/custom/LinkedInIcon";
import { HomeFilledIcon } from "@/icons/material/HomeFilledIcon";
import { LanguageIcon } from "@/icons/material/LanguageIcon";
import { MailFilledIcon } from "@/icons/material/MailFilledIcon";
import type { FCC } from "@/types/react";
import { Inter } from "next/font/google";
import type { CSSProperties } from "react";

const email = process.env.ME_MAIL;

const inter = Inter({ subsets: ["latin"] });

const contactItemIconStyle: CSSProperties = { opacity: 0.7, width: "20px" };

export const metadata: Metadata = {
	title: "Arseny Garelyshev | Full-stack Developer",
	description: "CV page for Arseny Garelyshev, a full-stack developer.",
	robots: { index: false, follow: false },
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
					priority
				/>
				<div className={styles.contactDetails}>
					<ContactItem>
						<HomeFilledIcon style={contactItemIconStyle} />
						<span>Bergen, Norway</span>
					</ContactItem>
					<ContactItem>
						<MailFilledIcon style={contactItemIconStyle} />
						<LinkOut
							href={`mailto:${email}`}
							target="_blank"
							className={styles.subtleLink}
						>
							{email}
						</LinkOut>
					</ContactItem>
				</div>
				<div className={styles.contactDetails}>
					<ContactItem>
						<LinkedInIcon style={contactItemIconStyle} />
						<LinkOut
							href="https://linkedin.com/in/arseny-garelyshev-086275199"
							className={styles.subtleLink}
						>
							https://linkedin.com/in/arseny-garelyshev-086275199
						</LinkOut>
					</ContactItem>
					<ContactItem>
						<GithubIcon style={contactItemIconStyle} />
						<LinkOut href="https://github.com/MonstraG" className={styles.subtleLink}>
							https://github.com/MonstraG
						</LinkOut>
					</ContactItem>
					<ContactItem>
						<LanguageIcon style={contactItemIconStyle} />
						<LinkOut href="https://arsga.eu/me" className={styles.subtleLink}>
							https://arsga.eu/me
						</LinkOut>
					</ContactItem>
				</div>
			</div>
			<h1 className={styles.name}>Arseny Garelyshev, Full-stack Software Developer</h1>
			<h2 className={styles.subtitle}>
				I&#x27;m a full-stack software developer and one might even say a competent one.
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
								Lifekeys AS, Software Developer
							</LinkOut>
						</h4>
						<p className={styles.occupationDescription}>
							4.5 years building online mental health services. Long enough tenure in
							a small team allowed me to work on and interact with literally every
							part of every product company offers. Cron-run PostgreSQL jobs, EF Core,
							migrating from Razor pages to Next.Js, video peer-to-peer
							communications, dashboards and charts, PDF generation,
							internationalization to several languages under single domain,
							everything.
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
							1.5 years building softphone CRM integration system. Coming there, I
							never used Go in my life. This has been a great experience for learning
							new things on the fly, and being productive day one.
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
							4-year Bachelor&apos;s in Applied Informatics. This is a Computer
							Science degree, with particular incline into practical skills. I learned
							a lot, from the TCP/IP protocol to integration by parts.
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
						<h4 className={styles.columnTitle}>English - C2</h4>
						<div
							className={styles.proficiencyStars}
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
						<h4 className={styles.columnTitle}>Norwegian - B1</h4>
						<div
							className={styles.proficiencyStars}
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
						<h4 className={styles.columnTitle}>Russian - Native</h4>
						<div className={styles.proficiencyStars}>
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
					<li>.NET</li>
				</ul>
			</section>

			<section className={`${styles.miscSection} ${styles.section}`}>
				<h3 className={styles.sectionTitle}>Have varying levels of experience in</h3>
				<div className={styles.miscSectionGrid}>
					<div>
						<div className={styles.miscSectionColumnText}>
							<div>oauth</div>
							<div>Docker</div>
							<div>Linux</div>
						</div>
					</div>
					<div>
						<div className={styles.miscSectionColumnText}>
							<div>Payment systems</div>
							<div>Video conferencing</div>
							<div>Unit testing</div>
						</div>
					</div>
					<div>
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

const ContactItem: FCC = ({ children }) => <span className={styles.contactItem}>{children}</span>;

export default MyCvPage;
