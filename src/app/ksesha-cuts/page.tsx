import styles from "./page.module.css";
import { NextPage } from "next";
import Image from "next/image";
import { EB_Garamond } from "next/font/google";

export const metadata = {
	title: "Ksenia Smetanina | Pet groomer",
	description: "CV page for Ksenia Smetanina, a professional pet groomer."
};

const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-ebGaramond" });

const MyCvPage: NextPage = () => (
	<div className={`${styles.paper} ${ebGaramond.variable}`}>
		<header className={styles.header}>
			<div className={styles.nameAndContacts}>
				<Image
					className={styles.avatar}
					src="/ksesha-cuts-avatar.webp"
					height={80}
					width={80}
					alt="Ksenia Smetanina"
				/>
				<div>
					<h1 className={styles.myName}>
						Ksenia Smetanina
						<span className={`${styles.secondary} ${styles.location}`}>
							Bergen, Norway
						</span>
					</h1>
					<div className={styles.contactBlock}>
						<div className={styles.secondary}>
							<a
								href="mailto:bramblemoon96+cv@gmail.com"
								target="_blank"
								rel="noopener noreferrer nofollow ugc"
								className={styles.contactMeLink}
							>
								bramblemoon96+cv@gmail.com
							</a>
						</div>
						<div className={styles.secondary}>
							<a
								href="https://www.linkedin.com/in/ksenia-smetanina-589b21280/"
								target="_blank"
								rel="noopener noreferrer nofollow ugc"
								className={styles.contactMeLink}
							>
								https://linkedin.com/in/ksenia-smetanina-589b21280
							</a>
						</div>
						<div className={styles.secondary}>
							<a
								href="tel:+4741228003"
								target="_blank"
								rel="noopener noreferrer nofollow ugc"
								className={styles.contactMeLink}
							>
								+47 41 22 80 03
							</a>
						</div>
						<div className={styles.secondary}>
							<a
								href="https://www.instagram.com/ksesha_cuts"
								target="_blank"
								rel="noopener noreferrer nofollow ugc"
								className={`${styles.contactMeLink} ${styles.flexRow}`}
							>
								<svg
									focusable="false"
									aria-hidden="true"
									viewBox="0 0 24 24"
									className={styles.instagramIcon}
								>
									<path
										fill="currentColor"
										d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
									/>
								</svg>
								@ksesha_cuts
							</a>
						</div>
					</div>
				</div>
			</div>
			<h2 className={`${styles.myDescription} ${styles.primary}`}>
				<span className={`${styles.myTitle}`}>Professional pet groomer</span> — ✨ Star girl
				✨ Love working with animals and trying to promote healthy culture of pet care.
			</h2>
			<div className={styles.gradientContainer}>
				<div className={` ${styles.gradientCircle} ${styles.gradientCircleOne}`} />
				<div className={` ${styles.gradientCircle} ${styles.gradientCircleTwo}`} />
			</div>
		</header>
		<section className={styles.sectionWithInlineContent}>
			<h2 className={styles.sectionHeader}>Skills</h2>
			<ul className={styles.skillList}>
				<li className={styles.skill}>Wire coat stripping</li>
				<li className={styles.skill}>Cat grooming</li>
				<li className={styles.skill}>Asian-style grooming</li>
				<li className={styles.skill}>Internship supervision</li>
			</ul>
		</section>
		<section className={styles.section}>
			<h2 className={styles.sectionHeader}>Work Experience</h2>
			<div className={styles.workplaceContainer}>
				<h3 className={`${styles.workplaceTitle} ${styles.primary}`}>
					<a
						href="https://www.urbandogekb.ru/"
						target="_blank"
						rel="noopener noreferrer nofollow ugc"
						className={styles.workplaceLink}
					>
						Urbandog
					</a>
				</h3>
				<div>
					<div className={styles.workplacePositionSection}>
						<div className={styles.positionNameTwo}>Pet groomer</div>
						<div className={styles.secondary}>Sep 2021 - Jul 2023</div>
					</div>
					<p className={styles.secondary}>
						Worked as a pet groomer, with 157 out of 162 five-star reviews. Specialized
						in hand stripping and cats. Started giving grooming lessons on behalf of the
						company. I&apos;ve taught stripping to 20+ students. Supervised short-term
						internship of 50+ students.
					</p>
				</div>
			</div>
			<div className={styles.workplaceContainer}>
				<h3 className={`${styles.workplaceTitle} ${styles.primary}`}>
					<a
						href="https://www.instagram.com/zoogrumerka"
						target="_blank"
						rel="noopener noreferrer nofollow ugc"
						className={styles.workplaceLink}
					>
						Zoogrumerka
					</a>
				</h3>
				<div className={styles.workplacePositionSection}>
					<div className={styles.positionNameTwo}>Pet groomer</div>
					<div className={styles.secondary}>Aug 2019 - Aug 2021</div>
				</div>
			</div>
		</section>
		<section className={styles.section}>
			<h2 className={styles.sectionHeader}>Education</h2>
			<div className={styles.workplaceContainer}>
				<h3 className={`${styles.workplaceTitle} ${styles.primary}`}>
					<a
						href="https://urgau.ru/"
						target="_blank"
						rel="noopener noreferrer nofollow ugc"
						className={styles.workplaceLink}
					>
						Ural State Agricultural Academy
					</a>
				</h3>
				<div>
					<div className={styles.workplacePositionSection}>
						<div className={styles.positionNameTwo}>
							Bachelors in Veterinary Sanitary Expertise
						</div>
						<div className={styles.secondary}>Sep 2017 - Jul 2021</div>
					</div>
					<p className={styles.secondary}>
						Bachelor&apos;s diploma available{" "}
						<a
							href="https://drive.google.com/drive/folders/1sGF_raOxheqsAPIAuuyM23mCLxoBX_6j?usp=drive_link"
							target="_blank"
							rel="noopener noreferrer nofollow ugc"
							className={styles.workplaceLink}
						>
							here
						</a>
					</p>
				</div>
			</div>
			<div className={styles.workplaceContainer}>
				<h3 className={`${styles.workplaceTitle} ${styles.primary}`}>Advanced training</h3>
				<div>
					<div className={styles.workplacePositionSection}>
						<div className={styles.positionNameTwo}>Pet grooming</div>
						<div className={styles.secondary}>Aug 2019 - Jul 2023</div>
					</div>
					<p className={styles.secondary}>
						Certificates and diplomas available{" "}
						<a
							href="https://drive.google.com/drive/folders/1FcHR5Ix4sc2b1J8-l8j5q8x4pEEj03OF"
							target="_blank"
							rel="noopener noreferrer nofollow ugc"
							className={styles.workplaceLink}
						>
							here
						</a>{" "}
						(in Russian)
					</p>
				</div>
			</div>
		</section>
		<section className={styles.sectionWithInlineContent}>
			<h2 className={styles.sectionHeader}>Languages</h2>
			<div className={styles.languagesContent}>
				<div className={styles.language}>
					<div className={styles.languageName}>Russian</div>
					<div className={`${styles.secondary} ${styles.languageProficiency}`}>
						Native
					</div>
				</div>
				<div className={styles.language}>
					<div className={styles.languageName}>English</div>
					<div className={`${styles.secondary} ${styles.languageProficiency}`}>B2</div>
				</div>
			</div>
		</section>
		<section className={styles.section}>
			<h2 className={styles.sectionHeader}>Volunteering</h2>
			<div className={styles.workplaceContainer}>
				<h3 className={`${styles.workplaceTitle} ${styles.primary}`}>Dog groomer</h3>
				<div>
					<div className={styles.workplacePositionSection}>
						<div className={styles.secondary}>May 2022 - Dec 2022</div>
					</div>
					<p className={styles.secondary}>
						Bi-monthly free-of-charge grooming jobs for a local animal shelter, to
						promote the dogs for adoption
					</p>
				</div>
			</div>
		</section>
	</div>
);

export default MyCvPage;
