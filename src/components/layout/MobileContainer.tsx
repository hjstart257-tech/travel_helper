import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function MobileContainer({ children, className, noPadding }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div 
        className={cn(
          "w-full h-screen sm:h-[844px] sm:w-[390px] sm:rounded-[40px] sm:shadow-2xl overflow-hidden bg-white relative flex flex-col",
          className
        )}
      >
        <div className={cn("flex-1 overflow-y-auto", !noPadding && "pb-20")}>
          {children}
        </div>
      </div>
    </div>
  );
}
