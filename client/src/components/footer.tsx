import { SiYoutube, SiSpotify, SiInstagram } from "react-icons/si";
import { Mail } from "lucide-react";
import content from "virtual:content";
import { asset } from "@/lib/assets";

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group hover:text-white transition-colors"
      aria-label={label}
    >
      {children}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] text-white bg-white/20 backdrop-blur whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
        {label}
      </span>
    </a>
  );
}

export function Footer() {
  const site = content.pages.site;
  const podcasts = content.podcasts;
  const firstSpotify = podcasts.find((p: any) => p.spotify_url)?.spotify_url;

  return (
    <footer
      className="py-16 px-6 text-white/50"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #3d1a54 0%, #1e0e2a 70%)",
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <img
          src={asset("/images/branding/logo-white.png")}
          alt="The Sales Algorithm"
          className="h-24 sm:h-28 mx-auto mb-8"
        />
        <div className="flex justify-center gap-5 mb-10">
          {site.youtube_channel && (
            <SocialLink href={site.youtube_channel} label="YouTube">
              <SiYoutube className="w-5 h-5" />
            </SocialLink>
          )}
          {firstSpotify && (
            <SocialLink href={firstSpotify} label="Spotify">
              <SiSpotify className="w-5 h-5" />
            </SocialLink>
          )}
          {site.linkedin && (
            <SocialLink href={site.linkedin} label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </SocialLink>
          )}
          {site.instagram && (
            <SocialLink href={`https://instagram.com/${site.instagram}`} label="Instagram">
              <SiInstagram className="w-5 h-5" />
            </SocialLink>
          )}
          <SocialLink href="https://topmate.io/rengan_jayakrishnan" label="Topmate">
            <svg className="w-5 h-5" viewBox="0 0 47 46" fill="none">
              <circle r="22.5" transform="matrix(1 0 0 -1 23.6152 23)" fill="currentColor" />
              <path d="M33.0038 29.6411C31.5707 31.6672 29.5206 33.1752 27.1598 33.9401C24.7989 34.705 22.254 34.6857 19.905 33.8851C17.5561 33.0844 15.5291 31.5454 14.1269 29.4978C12.7247 27.4503 12.0225 25.0041 12.1251 22.5246C12.2277 20.045 13.1296 17.6652 14.6962 15.7405C16.2627 13.8158 18.4099 12.4495 20.817 11.8456C23.224 11.2418 25.7619 11.4328 28.0515 12.3901C30.341 13.3474 32.2595 15.0197 33.5204 17.1572L23.6152 23L33.0038 29.6411Z" fill="#1e0e2a" />
            </svg>
          </SocialLink>
          {site.email && (
            <SocialLink href={`mailto:${site.email}`} label="Email">
              <Mail className="w-5 h-5" />
            </SocialLink>
          )}
        </div>
        <p className="text-xs text-white/20">
          &copy; {new Date().getFullYear()} The Sales Algorithm. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
