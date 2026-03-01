import { Tiptap } from "./components/editor";

import type { ComponentProps } from "react";

type TiptapEditorProps = {
  name?: string;
  className?: string;
  isPending?: boolean;
  value: string;
} & Omit<ComponentProps<typeof Tiptap>, "content">;

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  className,
  value,
  ...props
}) => {
  return (
    <div className={className}>
      <Tiptap content={value} {...props} />
    </div>
  );
};
