import { members } from '../../member';
import fs from 'fs-extra';
import Parser from 'rss-parser';
import { Post, Member } from '../types';

type FeedItem = {
    title: string;
    link: string;
    contentSnippet?: string;
    isoDate?: string;
    dateMilliSeconds: number;
};

function isValidUrl(str: string): boolean {
    try {
        const { protocol } = new URL(str);
        return protocol === 'http:' || protocol === 'https:';
    } catch {
        return false;
    }
}

const parser = new Parser();
let allPostItems: Post[] = [];

async function fetchFeedItems(url: string) {
    const feed = await parser.parseURL(url);
    if (!feed?.items?.length) {
        return [];
    }

    return feed.items.map((item) => {
        return {
            title: item.title,
            contentSnippet: item.contentSnippet?.replace(/\n/g, ''),
            link: item.link,
            isoDate: item.isoDate,
            dateMilliSeconds: item.isoDate ? new Date(item.isoDate).getTime() : 0,
        };
    },).filter((item) => item.title && item.link && isValidUrl(item.link)) as FeedItem[];
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
    if (!sources?.length) {
        return [];
    }
    let feedItems: FeedItem[] = [];
    for (const url of sources) {
        const items = await fetchFeedItems(url);
        if (items) {
            feedItems = [...feedItems, ...items];
        }
    }
    return feedItems;
}

async function getMemberFeedItems(member: Member): Promise<Post[]> {
    const { id, sources, name, includeUrlRegex, excludeUrlRegex } = member;
    const feedItems = await getFeedItemsFromSources(sources);
    if (!feedItems) {
        return [];
    }

    let postItems = feedItems.map((item) => {
        return {
            ...item,
            authorName: name,
            authorId: id,
        };
    },);
    if (includeUrlRegex) {
        postItems =
            postItems.filter((item) => {
                return item.link.match(new RegExp(includeUrlRegex));
            },);
    }
    if (excludeUrlRegex) {
        postItems =
            postItems.filter((item) => {
                return !item.link.match(new RegExp(excludeUrlRegex));
            },);
    }

    return postItems;
}

(async function () {
    for (const member of members) {
        const items = await getMemberFeedItems(member);
        if (items) {
            allPostItems = [...allPostItems, ...items];
        }
    }
    allPostItems.sort((a, b) => b.dateMilliSeconds - a.dateMilliSeconds);
    fs.ensureDirSync('.contents');
    fs.writeJsonSync('.contents/posts.json', allPostItems);
})();
