declare module "virtual:content" {
  interface PageContent {
    title: string;
    body: string;
    [key: string]: any;
  }

  interface PodcastEntry {
    title: string;
    episode: number;
    date: string;
    published: boolean;
    spotify_url?: string;
    youtube_url?: string;
    youtube_id?: string;
    body: string;
    slug: string;
  }

  interface ReelEntry {
    title: string;
    date: string;
    published: boolean;
    instagram_url?: string;
    video_url?: string;
    body: string;
    slug: string;
  }

  interface Content {
    pages: Record<string, PageContent>;
    podcasts: PodcastEntry[];
    reels: ReelEntry[];
  }

  const content: Content;
  export default content;
}
