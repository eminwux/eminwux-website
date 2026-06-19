import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'eminwux.com — blog',
    description:
      'Writings on Linux, Unix, containers, terminals and the history of the systems we use every day, by Emiliano Spinella.',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
      customData: `<language>${post.data.lang}</language>`,
    })),
    customData: `<language>en</language>`,
  });
}
