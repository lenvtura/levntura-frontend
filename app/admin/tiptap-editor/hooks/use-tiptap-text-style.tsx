import type { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';

const FontSizeList = ['12', '14', '16', '18', '20', '24', '28'];

export function useTiptapTextStyle({ editor }: { editor: Editor }) {
  const [color, setColor] = useState('#000');
  const [fontSize, setFontSize] = useState('16');
  const [linkUrl, setLinkUrl] = useState('');
  const [alignment, setAlignment] = useState<
    'left' | 'center' | 'right' | 'justify'
  >('left');

  // Sync editor with color & fontSize
  useEffect(() => {
    if (!editor) return;

    const updateTextStyles = () => {
      const attrs = editor.getAttributes('textStyle');
      const currentSize = attrs.fontSize;
      const currentColor = attrs.color;

      if (currentSize) {
        setFontSize(currentSize.replace('px', ''));
      } else {
        setFontSize('16');
      }

      if (currentColor) {
        setColor(currentColor);
      } else {
        setColor('#000');
      }
      const linkAttrs = editor.getAttributes('link');
      if (linkAttrs?.href) {
        setLinkUrl(linkAttrs.href);
      } else {
        setLinkUrl('');
      }
      if (editor.isActive({ textAlign: 'center' })) {
        setAlignment('center');
      } else if (editor.isActive({ textAlign: 'right' })) {
        setAlignment('right');
      } else if (editor.isActive({ textAlign: 'justify' })) {
        setAlignment('justify');
      } else {
        setAlignment('left');
      }
    };

    editor.on('selectionUpdate', updateTextStyles);
    editor.on('transaction', updateTextStyles);

    updateTextStyles();

    return () => {
      editor.off('selectionUpdate', updateTextStyles);
      editor.off('transaction', updateTextStyles);
    };
  }, [editor]);

  const handleFontSizeChange = (value: string) => {
    if (!value) {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(`${value}px`).run();
    }
    setFontSize(value);
  };
  const handleAlignmentChange = (
    value: 'left' | 'center' | 'right' | 'justify'
  ) => {
    if (!value || value === 'left') {
      // Reset to default alignment
      editor.chain().focus().setTextAlign('left').run();
    } else {
      editor.chain().focus().setTextAlign(value).run();
    }

    setAlignment(value);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };
  const handleSetLink = () => {
    if (!linkUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    }
  };

  const activeHeading = [1, 2, 3, 4, 5, 6].find((level) =>
    editor.isActive('heading', { level })
  );
  const handleLinkUrl = (link: string) => {
    setLinkUrl(link);
  };
  const handleColorChangeInEditor = () => {
    editor.chain().focus().setColor(color).run();
  };
  const handleHeaders = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };
  return {
    color,
    FontSizeList,
    fontSize,
    linkUrl,
    alignment,
    activeHeading,
    handleFontSizeChange,
    handleColorChange,
    handleColorChangeInEditor,
    handleHeaders,
    handleLinkUrl,
    handleAlignmentChange,
    handleSetLink,
  };
}
