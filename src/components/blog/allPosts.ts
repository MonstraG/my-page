import { covarianceContravariance } from "@/posts/2023-11-30/covariance-contravariance";
import { installingLinuxChecklist } from "@/posts/2025-06-18/installing-linux-checklist";
import { grugbrainDev } from "@/posts/2025-06-19/grugbrainDev";
import { wireguardConfigManager } from "@/posts/2024-04-26/wireguard-config-manager";
import { xkcdThingsYouShouldNotDo } from "@/posts/2024-04-26/xkcd-things-you-should-not-do";
import { linuxWifiPowerSaving } from "@/posts/2025-04-14/linux-wifi-power-saving";
import { bookmarksGenAi } from "@/posts/2025-06-09/BookmarksGenAi";
import { recoveringFromFreezeWithReisub } from "@/posts/2025-06-10/recovering-from-freeze-with-reisub";
import { mathRandom } from "@/posts/2025-06-17/math-random";
import { nistGuidelines } from "@/posts/2025-10-02/nist-guidelines";
import type { Post } from "@/components/blog/post.types";

export const allPosts: readonly Post[] = [
	covarianceContravariance,
	wireguardConfigManager,
	xkcdThingsYouShouldNotDo,
	linuxWifiPowerSaving,
	bookmarksGenAi,
	recoveringFromFreezeWithReisub,
	mathRandom,
	installingLinuxChecklist,
	grugbrainDev,
	nistGuidelines,
].toSorted((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
