import styles from "./page.module.css";
import { NextPage } from "next";
import Image from "next/image";
import { EB_Garamond } from "next/font/google";
import { Workplace } from "@/app/ksesha-cuts/Workplace";
import { LinkOut } from "@/app/ksesha-cuts/LinkOut";

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
							<LinkOut href="mailto:bramblemoon96+cv@gmail.com">
								bramblemoon96+cv@gmail.com
							</LinkOut>
						</div>
						<div className={styles.secondary}>
							<LinkOut href="https://www.linkedin.com/in/ksenia-smetanina-589b21280">
								https://linkedin.com/in/ksenia-smetanina-589b21280
							</LinkOut>
						</div>
						<div className={styles.secondary}>
							<LinkOut href="tel:+4741228003">+47 41 22 80 03</LinkOut>
						</div>
						<div className={styles.secondary}>
							<LinkOut
								href="https://www.instagram.com/ksesha_cuts"
								className={styles.flexRow}
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
							</LinkOut>
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
			<Workplace
				workplace={<LinkOut href="https://www.urbandogekb.ru">Urbandog</LinkOut>}
				position="Pet groomer"
				period="Sep 2021 - Jul 2023"
				description="Worked as a pet groomer, with 157 out of 162 five-star reviews. Specialized in hand stripping and cats. Started giving grooming lessons on behalf of the company. I've taught stripping to 20+ students. Supervised short-term internship of 50+ students."
			/>
			<Workplace
				workplace={
					<LinkOut href="https://www.instagram.com/zoogrumerka">Zoogrumerka</LinkOut>
				}
				position="Pet groomer"
				period="Aug 2019 - Aug 2021"
			/>
		</section>
		<section className={styles.section}>
			<h2 className={styles.sectionHeader}>Education</h2>
			<Workplace
				workplace={
					<LinkOut href="https://urgau.ru/">Ural State Agricultural Academy</LinkOut>
				}
				position="Bachelors in Veterinary Sanitary Expertise"
				period="Sep 2017 - Jul 2021"
				description={
					<>
						Bachelor&apos;s diploma available{" "}
						<LinkOut href="https://drive.google.com/drive/folders/1sGF_raOxheqsAPIAuuyM23mCLxoBX_6j">
							here
						</LinkOut>
					</>
				}
			/>

			<Workplace
				workplace="Advanced training"
				position="Pet grooming"
				period="Aug 2019 - Jul 2023"
				description={
					<>
						Certificates and diplomas available{" "}
						<LinkOut href="https://drive.google.com/drive/folders/1FcHR5Ix4sc2b1J8-l8j5q8x4pEEj03OF">
							here
						</LinkOut>{" "}
						(in Russian)
					</>
				}
			/>
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
			<Workplace
				workplace="Volunteering"
				position="Dog groomer"
				period="May 2022 - Dec 2022"
				description="Bi-monthly free-of-charge grooming jobs for a local animal shelter, to promote the dogs for adoption"
			/>
		</section>
	</div>
);

export default MyCvPage;
