export type Member = {
	id: string;
	name: string;
	avatarSrc: string;
	sources?: string[];
	includeUrlRegex?: string;
	excludeUrlRegex?: string;
	githubId?: string;
};

export type Post = {
	authorId: string;
	authorName: string;
	title: string;
	link: string;
	contentSnippet?: string;
	isoDate?: string;
	dateMilliSeconds: number;
};
