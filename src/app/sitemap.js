export default function sitemap() {
  const baseUrl = 'https://dorodihealthcare.com';

  const staticPages = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/fqa',
    '/products',
    '/repertory',
    '/services/acupressure',
    '/services/acupuncture',
    '/services/hijama',
    '/services/pain-relief',
    '/support',
  ];

  const urls = staticPages.map((page) => {
    let priority;
    if (page === '/') {
      priority = 1.0;
    } else if (page.startsWith('/services')) {
      priority = 0.9;
    } else {
      priority = 0.8;
    }

    return {
      url: `${baseUrl}${page}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: priority,
    };
  });

  return urls;
}
