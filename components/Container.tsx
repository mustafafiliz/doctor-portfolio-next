import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`container max-w-[1280px!important] mx-auto px-4 sm:px-6 overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
}

