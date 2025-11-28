import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: number;
  showText?: boolean;
  href?: string;
}

export default function Logo({ size = 40, showText = true, href = '/' }: LogoProps) {
  const content = (
    <div className="flex items-center gap-3">
      <Image 
        src="/logo.svg" 
        alt="IT Interview Test System Logo" 
        width={size} 
        height={size}
        className="transition-transform hover:scale-105"
      />
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight text-gray-900 dark:text-white">
            IT Interview
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Test System
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
