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
	LinkedinIcon,
	TwitterIcon,
	WhatsappIcon,
	YoutubeIcon,
} from "@/components/icons/social-icons";
import { NavbarWithMenu } from "@/registry/new-york/ui/navbar-menu";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

export default function NavbarMenuFull() {
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
					href: "/docs",
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
					href: "/help",
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
					href: "https://discord.gg/gaia",
					description: t("nav.joinDiscord"),
					external: true,
					icon: <DiscordIcon className="h-5 w-5" color="#5865F2" />,
				},
				{
					label: t("nav.twitter"),
					href: "https://twitter.com/trygaia",
					description: t("nav.followUs"),
					external: true,
					icon: <TwitterIcon className="h-5 w-5" color="#1DA1F2" />,
				},
				{
					label: t("nav.github"),
					href: "https://github.com/heygaia",
					description: t("nav.checkRepos"),
					external: true,
					icon: <Github className="h-5 w-5" />,
				},
				{
					label: t("nav.whatsapp"),
					href: "https://whatsapp.com/channel/gaia",
					description: t("nav.joinWhatsapp"),
					external: true,
					icon: <WhatsappIcon className="h-5 w-5" color="#25D366" />,
				},
				{
					label: t("nav.youtube"),
					href: "https://youtube.com/@heygaia_io",
					description: t("nav.subscribeChannel"),
					external: true,
					icon: <YoutubeIcon className="h-5 w-5" color="#FF0000" />,
				},
				{
					label: t("nav.linkedin"),
					href: "https://linkedin.com/company/heygaia",
					description: t("nav.followCompany"),
					external: true,
					icon: <LinkedinIcon className="h-5 w-5" color="#0077B5" />,
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
				<Button variant="default" className="cursor-pointer">
					{t("footer.contactUs")}
				</Button>
			}
		/>
	);
}


