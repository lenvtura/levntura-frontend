import { cn } from '@/design-system/helpers';

import type { ComponentProps } from 'react';

export function SectionWrapper({
  children,
  className,
  sectionColor,
  ...props
}: ComponentProps<'div'> & { sectionColor?: string }) {
  return (
    <section
      className={cn(
        'py-12 lg:py-24',
        // Coloured banners are the first section on a page — the fixed header
        // sits over their top edge, so on mobile give the content extra top
        // room to clear it.
        sectionColor && 'max-md:pt-24',
        sectionColor,
      )}
      {...props}
    >
      <div className={cn('container overflow-hidden', className)}>
        {children}
      </div>
    </section>
  );
}
