import { FadeUpAnimator } from "@/atoms/fade-up-animator";

export function Title({ title }: { title: string }) {
  return (
    <div className="flex mb-18 flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
      <FadeUpAnimator transition={{ delay: 0.2 }} className="flex-1">
        <h1 className="typography-EB34 lg:typography-EB48 uppercase text-lev-red-dark leading-tight max-w-4xl">
          {title}
        </h1>
      </FadeUpAnimator>
    </div>
  );
}
