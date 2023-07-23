import styles from "./page.module.css";
import { NextPage } from "next";
import Image from "next/image";

export const metadata = {
	title: "Ksenia Smetanina | Pet groomer",
	description: "CV page for Ksenia Smetanina, a professional pet groomer."
};

const MyCvPage: NextPage = () => (
	<>
		{/* we only want this font here, it's not used anywhere else */}
		{/* todo: change to next/fonts */}
		{/* eslint-disable-next-line @next/next/no-page-custom-font */}
		<link
			href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&amp;display=swap"
			rel="stylesheet"
		/>
		<div>
			<div className={styles.pageBg}>
				<div className={styles.page}>
					<main className={styles.pageContent}>
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
												linkedin.com/in/ksenia-smetanina-589b21280
											</a>
										</div>
										<div className={styles.secondary}>
											<a
												href="tel:+47 41 22 80 03"
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
												className={`${styles.contactMeLink} ${styles.flexRowTwo}`}
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
							<h2 className={styles.myDescription}>
								<span className={styles.myTitle}>Professional pet groomer</span> —
								Love working with animals and trying to promote healthy culture of
								pet care. ✨ Star girl ✨
							</h2>
							<div className={styles.coolGradientContainer}>
								<div className={styles.coolGradientCircleOne}></div>
								<div className={styles.coolGradientCircleTwo}></div>
							</div>
						</header>
						<div className={styles.box}>
							<div className={styles.box}>
								<section className={styles.languagesSection}>
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
										<h2 className={styles.workplaceTitle}>
											<a
												href="https://www.urbandogekb.ru/"
												target="_blank"
												rel="noopener noreferrer nofollow ugc"
												className={styles.workplaceLink}
											>
												Urbandog
											</a>
										</h2>
										<div className={styles.box}>
											<div className={styles.workplacePositionSection}>
												<div className={styles.positionNameTwo}>
													Pet groomer
												</div>
												<div className={styles.secondary}>
													<span>Sep 2021 - Jul 2023</span>
												</div>
											</div>
											<p className={styles.secondary}>
												Worked as a pet groomer, with 157 out of 162
												five-star reviews. Specialized in hand stripping and
												cats. Started giving grooming lessons on behalf of
												the company. I&apos;ve taught stripping to 20+
												students. Supervised short-term internship of 50+
												students.
											</p>
										</div>
									</div>
									<div className={styles.workplaceContainer}>
										<h2 className={styles.workplaceTitle}>
											<a
												href="https://www.instagram.com/zoogrumerka"
												target="_blank"
												rel="noopener noreferrer nofollow ugc"
												className={styles.workplaceLink}
											>
												Zoogrumerka
											</a>
										</h2>
										<div className={styles.box}>
											<div className={styles.workplacePositionSection}>
												<div className={styles.positionNameTwo}>
													Pet groomer
												</div>
												<div className={styles.secondary}>
													<span>Aug 2019 - Aug 2021</span>
												</div>
											</div>
										</div>
									</div>
								</section>
								<section className={styles.section}>
									<h2 className={styles.sectionHeader}>Education</h2>
									<div className={styles.workplaceContainer}>
										<h2 className={styles.workplaceTitle}>
											<a
												href="https://urgau.ru/"
												target="_blank"
												rel="noopener noreferrer nofollow ugc"
												className={styles.workplaceLink}
											>
												Ural State Agricultural Academy
											</a>
										</h2>
										<div className={styles.box}>
											<div className={styles.workplacePositionSection}>
												<div className={styles.positionNameTwo}>
													Bachelors in Veterinary Sanitary Expertise
												</div>
												<div className={styles.secondary}>
													<span>Sep 2017 - Jul 2021</span>
												</div>
											</div>
										</div>
									</div>
								</section>
								<section className={styles.languagesSection}>
									<h2 className={styles.sectionHeader}>Languages</h2>
									<div className={styles.languagesContent}>
										<div className={styles.language}>
											<div className={styles.languageName}>Russian</div>
											<div
												className={`${styles.secondary} ${styles.languageProficiency}`}
											>
												Native
											</div>
										</div>
										<div className={styles.language}>
											<div className={styles.languageName}>English</div>
											<div
												className={`${styles.secondary} ${styles.languageProficiency}`}
											>
												B2
											</div>
										</div>
									</div>
								</section>
								<section className={styles.section}>
									<h2 className={styles.sectionHeader}>Volunteering</h2>
									<div className={styles.workplaceContainer}>
										<h2 className={styles.workplaceTitle}>Dog groomer</h2>
										<div className={styles.box}>
											<div className={styles.workplacePositionSection}>
												<div className={styles.secondary}>
													May 2022 - Dec 2022
												</div>
											</div>
											<div className={styles.box}>
												<div className={styles.box}>
													<p className={styles.secondary}>
														Bi-monthly free-of-charge grooming jobs for
														a local animal shelter, to promote the dogs
														for adoption
													</p>
												</div>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	</>
);

export default MyCvPage;
