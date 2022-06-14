import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '@/src/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className='max-w-4xl mx-auto'>
			<Header />
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
