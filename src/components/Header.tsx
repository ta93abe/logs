import { config } from '@/site.config';
import Link from 'next/link';

export const Header: React.FC = () => (
	<header className="flex justify-between items-center px-4 py-6 sm:px-6 md:space-x-20">
        <div className=''>logs</div>
        <div>
            {config.headers.map((header, i) => {
                const key = `header-${i}`;
                if (header.href.startsWith('/')) {
                    return (
                        <Link key={key} href={header.href} passHref>
                            <a>{header.title}</a>
                        </Link>
                    );
                }
                return (
                    <Link key={key} href={header.href}>
                        <a>{header.title}</a>
                    </Link>
                );
            })}
        </div>
    </header>
);
