import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Post } from "../types";
import { getFaviconSrcFromOrigin, getGithubProfileURL, getMemberId, getMemberPath } from "../utils/helper";

dayjs.extend(relativeTime);

const PostLink: React.FC<{ post: Post }> = (props) => {
    const { authorId, title, isoDate, link, dateMilliSeconds } = props.post;
    const member = getMemberId(authorId);
    if (!member) return null;

    const { hostname, origin } = new URL(link);

    return (
        <article className="card glass w-72 bg-primary text-primary-content">
            <div className="card-body flex flex-col justify-evenly">
                <Link href={getGithubProfileURL(member.id)} passHref>
                    <a target='_blank' className="flex items-end justify-between">
                        <Image src={member.avatarSrc} alt={member.name} width={35} height={35} layout='fixed' className='inline-block rounded-full' />
                        {dateMilliSeconds && dateMilliSeconds > Date.now() - 86400000 * 3 && (
                            <div className='badge badge-primary'>NEW</div>
                        )}   
                        <time dateTime={isoDate} className='text-xs'>
                            {dayjs(isoDate).fromNow()}
                        </time>
                    </a>
                </Link>
                <Link href={link} className=''>
                    <a target='_blank' className="space-y-2">
                        <h2 className="card-title">{title}</h2>
                        {hostname && (
                            <div className="flex space-x-2">
                                <Image
                                    src={getFaviconSrcFromOrigin(origin)}
                                    alt={hostname}
                                    width={16}
                                    height={16}
                                />
                                <div className="text-sm">{hostname}</div>
                            </div>
                        )}
                    </a>
                </Link>
            </div>
        </article>
    );
}

export const PostList: React.FC<{ items: Post[] }> = (props) => {
    const [displayItemsCount, setDisplayItemsCount] = useState(32);
    const totalItemsCount = props.items?.length || 0;
    const canLoadMore = totalItemsCount - displayItemsCount > 0;

    if (!totalItemsCount) return <div>No posts yet</div>;

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center'>
                {props.items.slice(0, displayItemsCount).map((item, i) => (
                    <PostLink key={`post-${i}`} post={item} />
                ))}
            </div>
            {canLoadMore && (
                <div className="">
                    <button
                        onClick={() => setDisplayItemsCount(displayItemsCount + 32)}
                        className=""
                    >
                        LOAD MORE
                    </button>
                </div>
            )}
        </>
    );
}