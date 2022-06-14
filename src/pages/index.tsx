import type { NextPage } from 'next';
import { PostList } from '../components/PostList';
import { Post } from '../types';
import posts from "@/.contents/posts.json";

const Home: NextPage = () => {
	return (
		<div className='font-mono'>
			<PostList items={posts as Post[]} />
		</div>
	);
};

export default Home;
