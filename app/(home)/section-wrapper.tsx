import { cn } from '@/design-system/helpers';

import type { ComponentProps } from 'react';

export function SectionWrapper({
  children,
  className,
  sectionColor,
  ...props
}: ComponentProps<'div'> & { sectionColor?: string }) {
  return (
    <section className={cn('py-12 lg:py-24', sectionColor)} {...props}>
      <div className={cn('container overflow-hidden', className)}>
        {children}
      </div>
    </section>
  );
}
