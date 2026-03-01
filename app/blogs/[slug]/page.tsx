import type { Metadata } from "next";
import { BlogHero } from "./blog-hero";
import { ReadingProgressBar } from "./reading-progress-bar";
import { BlogSidebar } from "./blog-sidebar";
import { PastStudentsSection } from "./past-students-section";
import { MoreToReadSection } from "./more-to-read-section";
import { BLOG_DETAIL_DATA } from "./blog-detail-data";
import { notFound } from "next/navigation";
import { Title } from "./title-social-icons-";
import { BlogContentSection } from "./blog-content-section";
import { BlogBreadcrumb } from "./blog-breadcrumb";
import { SocialShareIcons } from "@/atoms/social-share-icons";

const SITE_URL = "https://www.levntura.com";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = BLOG_DETAIL_DATA[slug];
  if (!blog) return {};

  const canonicalUrl = `${SITE_URL}/blogs/${slug}`;
  const title = blog.seo?.metaTitle ?? blog.title;
  const description = blog.seo?.metaDescription ?? "";

  return {
    title,
    description,
    keywords: blog.seo?.metaKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      siteName: "Levntura",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = BLOG_DETAIL_DATA[slug];

  if (!blog) {
    notFound();
  }

  const sidebarSections = blog.sections.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  if (blog.pastStudent) {
    sidebarSections.push({ id: "past-students", title: "Past Students" });
  }

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgressBar />
      <BlogHero
        title={blog.title}
        image={blog.heroImage}
        imageAlt={blog.heroImageAlt ?? blog.title}
      />

      <div className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
          {/* Left Sidebar */}
          <aside className="hidden h-full lg:block">
            <div className="sticky top-24 h-fit">
              <BlogSidebar sections={sidebarSections} />
            </div>
          </aside>

          {/* Main Content */}
          <main>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 flex-wrap gap-4">
              <BlogBreadcrumb title={blog.title} />
              <SocialShareIcons size="sm" />
            </div>
            <Title title={blog.title} />

            {blog.sections.map((section) => (
              <BlogContentSection
                key={section.id}
                id={section.id}
                title={section.title}
                content={section.content}
                image={section.image}
                imagePosition={section.imagePosition}
              />
            ))}

            {blog.pastStudent && (
              <PastStudentsSection
                id="past-students"
                image={blog.pastStudent.image}
                name={blog.pastStudent.name}
                bio={blog.pastStudent.bio}
              />
            )}
          </main>
        </div>
        {blog.moreToRead && (
          <MoreToReadSection
            title={blog.moreToRead.title}
            subtitle={blog.moreToRead.subtitle}
            description={blog.moreToRead.description}
            images={blog.moreToRead.images}
          />
        )}
      </div>
    </div>
  );
}
