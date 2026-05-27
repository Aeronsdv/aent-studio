"use client";

import {
	FacebookIcon,
	GithubIcon,
	InstagramIcon,
	LinkedinIcon,
	TwitterIcon,
	YoutubeIcon,
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function MinimalFooter() {
	const { t, language } = useLanguage();
	const year = new Date().getFullYear();

	const company = [
		{
			title: t('footer.aboutUs'),
			href: '#',
		},
		{
			title: t('footer.ourMission'),
			href: '#',
		},
		{
			title: t('footer.ourVision'),
			href: '#',
		},
		{
			title: t('footer.roadmap'),
			href: '#',
		},
		{
			title: t('footer.terms'),
			href: '#',
		},
	];

	const resources = [
		{
			title: t('footer.blog'),
			href: '#',
		},
		{
			title: t('footer.product'),
			href: '#',
		},
		{
			title: t('footer.blog'),
			href: '#',
		},
		{
			title: t('footer.community'),
			href: '#',
		},
		{
			title: t('footer.contactUs'),
			href: '#',
		},
	];

	const socialLinks = [
		{
			icon: <InstagramIcon className="size-4" />,
			link: 'https://www.instagram.com/aentstudio/',
		},
	];
	return (
		<footer className="relative">
			<div className="dark:bg-[radial-gradient(35%_80%_at_30%_0%,#92370b33,transparent)] bg-[radial-gradient(35%_80%_at_30%_0%,#dc885f33,transparent)] mx-auto max-w-4xl md:border-x">
				<div className="bg-border absolute inset-x-0 h-px w-full" />
				<div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
					<div className="col-span-6 flex flex-col gap-5 md:col-span-4">
						<a href="#" className="flex items-center gap-2 w-max">
							<img src="/aent.png" alt="Aent Studio" className="size-8 rounded-md" />
							<span className="text-sm font-semibold tracking-tight">Aent Studio</span>
						</a>
						<p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
							{t('footer.tagline')}
						</p>
						<div className="flex gap-2">
							{socialLinks.map((item, i) => (
								<a
									key={i}
									className="hover:bg-accent rounded-md border p-1.5"
									target="_blank"
									href={item.link}
								>
									{item.icon}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground mb-1 text-xs">
							{t('footer.resources')}
						</span>
						<div className="flex flex-col gap-1">
							{resources.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm duration-200 hover:underline`}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
					<div className="col-span-3 w-full md:col-span-1">
						<span className="text-muted-foreground mb-1 text-xs">{t('footer.company')}</span>
						<div className="flex flex-col gap-1">
							{company.map(({ href, title }, i) => (
								<a
									key={i}
									className={`w-max py-1 text-sm duration-200 hover:underline`}
									href={href}
								>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>
				<div className="bg-border absolute inset-x-0 h-px w-full" />
				<div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
					<p className="text-muted-foreground text-center font-thin">
						{language === 'tr' ? (
							<>
								© <a href="https://www.instagram.com/aentstudio/" className="hover:underline">Aent Studio</a> tarafından <span className="text-red-500">❤</span> ile yapılmıştır. {t('footer.allRightsReserved')} {year}
							</>
						) : (
							<>
								Made with <span className="text-red-500">❤</span> by © <a href="https://www.instagram.com/aentstudio/" className="hover:underline">Aent Studio</a>. {t('footer.allRightsReserved')} {year}
							</>
						)}
					</p>
				</div>
			</div>
		</footer>
	);
}
