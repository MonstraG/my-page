import styles from "@/app/(cvs)/ksesha-cuts/page.module.scss";
import type { Metadata, NextPage } from "next";
import Image from "next/image";
import { EB_Garamond } from "next/font/google";
import { Workplace } from "@/app/(cvs)/ksesha-cuts/Workplace";
import { LinkOut } from "@/components/LinkOut";
import { InstagramIcon } from "@/app/(cvs)/ksesha-cuts/InstagramIcon";
import { GradientCircles } from "@/app/(cvs)/ksesha-cuts/GradientCircles";
import workplaceStyles from "@/app/(cvs)/ksesha-cuts/Workplace.module.scss";
import "@/app/(cvs)/globals.scss";

const email = process.env.KSESHA_MAIL;

export const metadata: Metadata = {
	title: "Ksenia Smetanina | Pet groomer",
	description: "CV page for Ksenia Smetanina, a professional pet groomer.",
	robots: { index: false, follow: false }
};

const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-ebGaramond" });

const KseshaCvPage: NextPage = () => (
	<div className={`${styles.paper} ${ebGaramond.variable}`}>
		<header className={styles.header}>
			<div className={styles.nameAndContacts}>
				<Image
					className={styles.avatar}
					src="/ksesha-cuts-avatar.webp"
					height={80}
					width={80}
					quality={100}
					alt="Ksenia Smetanina"
				/>
				<div>
					<h1 className={styles.myName}>
						Ksenia Smetanina
						<span className={`${styles.secondary} ${styles.location}`}>
							Bergen, Norway
						</span>
					</h1>
					<div className={`${styles.contactBlock} ${styles.secondary}`}>
						<LinkOut href={`mailto:${email}`}>{email}</LinkOut>
						<LinkOut href="https://www.linkedin.com/in/ksenia-smetanina-589b21280">
							https://linkedin.com/in/ksenia-smetanina-589b21280
						</LinkOut>
						<LinkOut href={`tel:${process.env.KSESHA_TEL}`}>
							{process.env.KSESHA_TEL_NICE}
						</LinkOut>
						<LinkOut
							href="https://www.instagram.com/ksesha_cuts"
							className={styles.flexRow}
						>
							<InstagramIcon className={styles.instagramIcon} />
							@ksesha_cuts
						</LinkOut>
					</div>
				</div>
			</div>
			<h2 className={`${styles.myDescription} ${styles.primary}`}>
				<span className={styles.myTitle}>Professional pet groomer</span> — ✨ Star girl ✨
				Love working with animals and trying to promote healthy culture of pet care.
			</h2>
		</header>
		<main>
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
					workplace={<LinkOut href="https://www.urbandogekb.ru">UrbanDog</LinkOut>}
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
			<GradientCircles />

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
						<div className={`${styles.secondary} ${styles.languageProficiency}`}>
							B2
						</div>
					</div>
				</div>
			</section>
			<section className={styles.section}>
				<div className={workplaceStyles.container}>
					<h2 className={styles.sectionHeader}>Volunteering</h2>
					<div>
						<div className={workplaceStyles.positionSection}>
							<div className={workplaceStyles.positionName}>Dog groomer</div>
							<div className={styles.secondary}>May 2022 - Dec 2022</div>
						</div>
						<p className={styles.secondary}>
							Bi-monthly free-of-charge grooming jobs for a local animal shelter, to
							promote the dogs for adoption
						</p>
					</div>
				</div>
			</section>
		</main>
	</div>
);

export default KseshaCvPage;
