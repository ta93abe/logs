export const config = {
    siteMeta: {
        title: 'logs',
        description: 'curated logs',
    },
    siteRoot: process.env.NODE_ENV === 'production' ? 'https://ta93abe.com' : 'http://localhost:3000',
    headers: [
        {
            title: 'GitHub',
            href: 'https://github.com/ta93abe/logs',
        },
    ],
};
