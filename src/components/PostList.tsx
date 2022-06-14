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
        <article className="border-1">
            <Link href={getGithubProfileURL(member.id)} passHref>
                <a>
                    <Image src={member.avatarSrc} alt={member.name} width={35} height={35} className='' />
                    <div>
                        <div>{member.name}</div>
                        <time dateTime={isoDate}>
                            {dayjs(isoDate).fromNow()}
                        </time>
                    </div>
                </a>
            </Link>
            <Link href={link} className='justify-between'>
                <a>
                    <h2>{title}</h2>
                    {hostname && (
                        <div>
                            <Image
                            src={getFaviconSrcFromOrigin(origin)}
                            alt={hostname}
                            width={14}
                            height={14}
                            />
                            <span>{hostname}</span>
                        </div>
                    )}
                </a>
            </Link>
            {dateMilliSeconds && dateMilliSeconds > Date.now() - 86400000 * 3 && (
                <div>NEW</div>
            )}
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
        <div>
            {props.items.slice(0, displayItemsCount).map((item, i) => (
                <PostLink key={`post-${i}`} post={item} />
            ))}
        </div>
        {canLoadMore && (
        <div className="post-list-load">
          <button
            onClick={() => setDisplayItemsCount(displayItemsCount + 32)}
            className="post-list-load__button"
          >
            LOAD MORE
          </button>
        </div>
      )}
        </>
    );
}