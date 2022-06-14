import { members } from '@/member';
import { Member } from '../types';

export function getMemberId(id: string) {
    return members.find((member) => member.id === id);
}

export function getMemberPath(id: string) {
    return `/members/${encodeURIComponent(id)}`;
}

export function getFaviconSrcFromOrigin(hostname: string) {
    return `https://www.google.com/s2/favicons?sz=32&domain_url=${hostname}`;
}

export function getGithubProfileURL(id: string) {
    return `https://github.com/${id}`;
}
