"use client";

import {
	Book01Icon,
	CreditCardIcon,
	HelpCircleIcon,
	HugeiconsIcon,
	Idea01Icon,
	MapsIcon,
	Message01Icon,
	PencilIcon,
	UserGroupIcon,
} from "@/components/icons";
import {
	DiscordIcon,
	Github,
	InstagramIcon,
	LinkedinIcon,
	TwitterIcon,
	WhatsappIcon,
	YoutubeIcon,
} from "@/components/icons/social-icons";
import { NavbarWithMenu } from "@/registry/new-york/ui/navbar-menu";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

export default function NavbarMenuFull({ onContactClick }: { onContactClick?: () => void }) {
	const { t } = useLanguage();

	const sections = [
		{
			id: "product",
			gridLayout: "grid w-full grid-cols-2 grid-rows-1 gap-4",
			links: [
				{
					label: t("nav.getStarted"),
					href: "/products",
					description: t("nav.exploreProduct"),
					icon: (
						<HugeiconsIcon
							icon={Message01Icon}
							size={20}
							className="text-foreground"
						/>
					),
				},
				{
					label: t("nav.roadmap"),
					href: "/roadmap",
					description: t("nav.seeWhatsComing"),
					icon: (
						<HugeiconsIcon
							icon={MapsIcon}
							size={20}
							className="text-foreground"
						/>
					),
				},
			],
		},
		{
			id: "resources",
			gridLayout: "grid w-full grid-cols-2 grid-rows-2 gap-4",
			links: [
				{
					label: t("nav.blog"),
					href: "/blog",
					description: t("nav.latestUpdates"),
					icon: (
						<HugeiconsIcon
							icon={PencilIcon}
							size={20}
							className="text-foreground"
						/>
					),
				},
				{
					label: t("nav.aboutUs"),
					href: "/about-us",
					description: t("nav.aboutUsDescription"),
					icon: (
						<HugeiconsIcon
							icon={Book01Icon}
							size={20}
							className="text-foreground"
						/>
					),
				},
				{
					label: t("nav.helpCenter"),
					href: "/faq",
					description: t("nav.getSupport"),
					icon: (
						<HugeiconsIcon
							icon={HelpCircleIcon}
							size={20}
							className="text-foreground"
						/>
					),
				},
				{
					label: t("nav.community"),
					href: "/community",
					description: t("nav.joinOurCommunity"),
					icon: (
						<HugeiconsIcon
							icon={UserGroupIcon}
							size={20}
							className="text-foreground"
						/>
					),
				},
			],
		},
		{
			id: "socials",
			gridLayout: "grid w-full grid-cols-3 gap-4",
			links: [
				{
					label: t("nav.discord"),
					href: "https://discord.gg/UaJJSVFw2x",
					description: t("nav.joinDiscord"),
					external: true,
					icon: <DiscordIcon className="h-5 w-5" color="#5865F2" />,
				},
				{
					label: t("nav.twitter"),
					href: "https://x.com/Aentstudio",
					description: t("nav.followUs"),
					external: true,
					icon: <TwitterIcon className="h-5 w-5" color="#1DA1F2" />,
				},
				{
					label: t("nav.github"),
					href: "https://github.com/AentStudio",
					description: t("nav.checkRepos"),
					external: true,
					icon: <Github className="h-5 w-5" />,
				},
				{
					label: t("nav.youtube"),
					href: "https://www.youtube.com/@AentStudio",
					description: t("nav.subscribeChannel"),
					external: true,
					icon: <YoutubeIcon className="h-5 w-5" color="#FF0000" />,
				},
				{
					label: t("nav.instagram"),
					href: "https://instagram.com/aentstudio",
					description: t("nav.followInstagram"),
					external: true,
					icon: <InstagramIcon className="h-5 w-5" color="#E1306C" />,
				},
			],
		},
	];

	const navItems = [
		{ type: "dropdown" as const, label: t("nav.product"), menu: "product" },
		{ type: "dropdown" as const, label: t("nav.resources"), menu: "resources" },
		{ type: "dropdown" as const, label: t("nav.socials"), menu: "socials" },
	];

	return (
		<NavbarWithMenu 
			sections={sections} 
			navItems={navItems}
			cta={
				<Button onClick={onContactClick} variant="default" className="cursor-pointer">
					{t("footer.contactUs")}
				</Button>
			}
		/>
	);
}


