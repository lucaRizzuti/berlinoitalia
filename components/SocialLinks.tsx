import { site } from "@/lib/site";

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 12a9 9 0 1 0-10.4 8.9v-6.3H8.3V12h2.3V9.9c0-2.3 1.4-3.5 3.4-3.5.7 0 1.4.1 1.7.1v2.5h-1.2c-1.1 0-1.4.7-1.4 1.4V12h2.5l-.4 2.6h-2.1v6.3A9 9 0 0 0 21 12z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.7 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MeetupIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="9" cy="9" r="4.5" />
      <circle cx="16" cy="9" r="4.5" />
      <circle cx="12.5" cy="16" r="4.5" />
    </svg>
  );
}

const links = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon, featured: true },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon, featured: false },
  { label: "YouTube", href: site.social.youtube, Icon: YoutubeIcon, featured: false },
  { label: "Meetup", href: site.social.meetup, Icon: MeetupIcon, featured: false },
];

/**
 * Icone dei canali social, in stile "chip" bordata coerente col design system.
 * Instagram è evidenziata (sfondo rosso) perché è il canale principale;
 * gli altri restano in outline. `variant="dark"` per sfondi scuri (footer).
 */
export function SocialLinks({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const border = variant === "dark" ? "border-paper/40" : "border-ink";
  const iconColor = variant === "dark" ? "text-paper" : "text-ink";
  const hover =
    variant === "dark" ? "hover:bg-paper hover:text-ink" : "hover:bg-ink hover:text-paper";

  return (
    <div className={`flex gap-2.5 ${className}`}>
      {links.map(({ label, href, Icon, featured }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={
            featured
              ? "flex h-11 w-11 items-center justify-center border-2 border-rosso bg-rosso text-paper transition-colors hover:bg-ink hover:border-ink"
              : `flex h-11 w-11 items-center justify-center border-2 ${border} ${iconColor} transition-colors ${hover}`
          }
        >
          <Icon className="h-[22px] w-[22px]" />
        </a>
      ))}
    </div>
  );
}
