import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SiYoutube, SiSpotify } from "react-icons/si";
import content from "virtual:content";

export default function PodcastsPage() {
  const podcasts = content.podcasts;
  const site = content.pages.site;
  const spotifyEpisodes = podcasts.filter((p: any) => p.spotify_url);

  return (
    <motion.div
      className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen"
      style={{ background: "#fefcf9" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
        Podcast
      </p>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
        The Sales Algorithm Podcast
      </h1>
      <p className="text-muted-foreground mb-8 max-w-xl">
        Deep conversations with founders, investors, and leaders about the
        realities of building sales engines.
      </p>

      <div className="flex flex-wrap gap-3 mb-16">
        <a
          href={site.youtube_channel}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/10 text-sm text-foreground/60 hover:border-foreground/20 transition-colors"
        >
          <SiYoutube className="w-4 h-4 text-[#FF0000]" />
          YouTube
        </a>
        {spotifyEpisodes[0]?.spotify_url && (
          <a
            href={spotifyEpisodes[0].spotify_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/10 text-sm text-foreground/60 hover:border-foreground/20 transition-colors"
          >
            <SiSpotify className="w-4 h-4 text-[#1DB954]" />
            Spotify
          </a>
        )}
      </div>

      {/* Episode grid */}
      <div className="grid sm:grid-cols-2 gap-8 mb-16">
        {podcasts
          .filter((p: any) => p.youtube_id)
          .map((podcast: any, i: number) => (
            <div key={i} className="group">
              <a
                href={podcast.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-foreground/5">
                  <img
                    src={`https://img.youtube.com/vi/${podcast.youtube_id}/mqdefault.jpg`}
                    alt={podcast.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Play
                        className="w-5 h-5 text-foreground ml-0.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              </a>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium group-hover:text-foreground/60 transition-colors">
                    Episode {podcast.episode}: {podcast.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {podcast.body}
                  </p>
                </div>
                {podcast.spotify_url && (
                  <a
                    href={podcast.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 mt-0.5 p-1.5 rounded-full hover:bg-[#1DB954]/10 transition-colors"
                    title="Listen on Spotify"
                  >
                    <SiSpotify className="w-4 h-4 text-[#1DB954]" />
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>

    </motion.div>
  );
}
