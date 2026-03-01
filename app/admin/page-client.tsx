"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { TiptapEditor } from "./tiptap-editor";

interface BlogSection {
  id: string;
  title: string;
  content: string;
  image?: string;
  imagePosition?: "left" | "right" | "full";
}

interface BlogSEO {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

interface BlogDetail {
  slug: string;
  heroImage: string;
  heroImageAlt?: string;
  breadcrumbs: string[];
  title: string;
  sections: BlogSection[];
  seo?: BlogSEO;
}

interface SectionState {
  id: string;
  title: string;
  content: string;
}

function SectionEditorBlock({
  section,
  onChangeTitle,
  onChangeContent,
  onRemove,
  canRemove,
}: {
  section: SectionState;
  onChangeTitle: (id: string, title: string) => void;
  onChangeContent: (id: string, html: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-3 flex items-center gap-3">
        <input
          type="text"
          value={section.title}
          onChange={(e) => onChangeTitle(section.id, e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder='Section title (e.g. "introduction")'
        />
        <button
          type="button"
          onClick={() => onRemove(section.id)}
          disabled={!canRemove}
          className={`p-2 rounded ${
            canRemove
              ? "hover:bg-gray-100 text-gray-700"
              : "text-gray-300 cursor-not-allowed"
          }`}
          title="Remove section"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-2">
        <TiptapEditor
          value={section.content}
          onChange={(html) => onChangeContent(section.id, html)}
        />
      </div>
    </div>
  );
}

export default function AdminBlogPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [generatedJson, setGeneratedJson] = useState<string>("");
  const [showJson, setShowJson] = useState(false);
  const [sections, setSections] = useState<SectionState[]>([
    {
      id: "main-content",
      title: "main content",
      content: "",
    },
  ]);

  const addNewSection = () => {
    setSections([
      ...sections,
      {
        id: `section-${Date.now()}`,
        title: "",
        content: "",
      },
    ]);
  };

  const removeSection = (sectionId: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== sectionId));
    }
  };

  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    setSections(
      sections.map((s) => (s.id === sectionId ? { ...s, title: newTitle } : s)),
    );
  };

  const updateSectionContent = (sectionId: string, html: string) => {
    setSections(
      sections.map((s) => (s.id === sectionId ? { ...s, content: html } : s)),
    );
  };

  const handleGenerate = () => {
    if (!title.trim() || !slug.trim()) {
      alert("Please fill in title and slug");
      return;
    }

    const hasContent = sections.some((section) => section.content.trim());
    if (!hasContent) {
      alert("Please add content to at least one section");
      return;
    }

    const blogSections: BlogSection[] = sections.map((section) => ({
      id: section.id,
      title: section.title || section.id,
      content: section.content || "",
    }));

    const blogDetail: BlogDetail = {
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      heroImage: "/path/to/hero-image.jpg",
      heroImageAlt: title.trim(),
      breadcrumbs: ["Home", "Blogs", title.trim()],
      title: title.trim(),
      sections: blogSections,
      seo: {
        metaTitle: metaTitle.trim() || title.trim(),
        metaDescription: metaDescription.trim() || title.trim(),
        metaKeywords: metaKeywords.trim() || "blog, article",
      },
    };

    const jsonString = JSON.stringify(blogDetail, null, 2);
    setGeneratedJson(jsonString);
    setShowJson(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedJson);
    alert("JSON copied to clipboard!");
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setSections([
      {
        id: "main-content",
        title: "main content",
        content: "",
      },
    ]);
    setGeneratedJson("");
    setShowJson(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Create Blog Post
          </h1>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter blog title..."
              />
            </div>

            <div>
              <label
                htmlFor="meta-title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                SEO Meta Title
              </label>
              <input
                type="text"
                id="meta-title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter SEO meta title (optional)..."
              />
              <p className="text-xs text-gray-500 mt-1">
                If left empty, will use the blog title
              </p>
            </div>

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL Slug
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="enter-blog-slug"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be used in the URL: /blogs/{slug}
              </p>
            </div>

            <div>
              <label
                htmlFor="meta-description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Meta Description
              </label>
              <textarea
                id="meta-description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description for SEO..."
              />
            </div>

            <div>
              <label
                htmlFor="meta-keywords"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Meta Keywords
              </label>
              <input
                type="text"
                id="meta-keywords"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="blog, article, topic"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sections
                </label>
                <button
                  type="button"
                  onClick={addNewSection}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add section
                </button>
              </div>

              <div className="space-y-4">
                {sections.map((section) => (
                  <SectionEditorBlock
                    key={section.id}
                    section={section}
                    onChangeTitle={updateSectionTitle}
                    onChangeContent={updateSectionContent}
                    onRemove={removeSection}
                    canRemove={sections.length > 1}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate JSON
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>

            {showJson && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Generated JSON Data
                  </h2>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Copy to Clipboard
                  </button>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">{generatedJson}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
