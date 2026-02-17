import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Document } from "@contentful/rich-text-types";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold text-foreground">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.CODE]: (text) => (
      <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-primary">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="font-display text-[28px] font-semibold text-foreground mt-12 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <h3 className="font-display text-[22px] font-semibold text-foreground mt-8 mb-3">{children}</h3>
    ),
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="text-secondary-foreground text-lg leading-[1.8] mb-6">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_node, children) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    [BLOCKS.OL_LIST]: (_node, children) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_node, children) => (
      <li className="text-secondary-foreground text-lg leading-[1.8]">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node, children) => (
      <blockquote className="border-l-[3px] border-primary bg-muted/50 pl-5 py-3 my-6 italic text-secondary-foreground">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const file = node.data.target?.fields?.file;
      const title = node.data.target?.fields?.title || "Image";
      if (!file) return null;
      return (
        <img
          src={`https:${file.url}`}
          alt={title}
          loading="lazy"
          className="w-full rounded-lg my-6"
        />
      );
    },
    [BLOCKS.HR]: () => <hr className="border-border my-8" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

export default function RichTextRenderer({ document }: { document: Document }) {
  return <div className="rich-text-content">{documentToReactComponents(document, options)}</div>;
}
