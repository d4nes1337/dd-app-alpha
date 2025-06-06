
import React, { ReactNode } from 'react';
import BottomNavigation from './BottomNavigation';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  fullHeight = false,
}) => {
  return (
    <div
      className={cn(
        'w-full pb-36 max-w-md mx-auto bg-background', // Increased bottom padding from pb-28 to pb-36 for more space
        fullHeight ? 'min-h-screen' : '',
        className
      )}
    >
      <div className="animate-fade-in">
        {children}
      </div>
      <BottomNavigation />
    </div>
  );
};

export default PageLayout;
