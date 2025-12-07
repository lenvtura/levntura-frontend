import { BlogHero } from "./blog-hero";
import { ReadingProgressBar } from "./reading-progress-bar";
import { BlogSidebar } from "./blog-sidebar";
import { PastStudentsSection } from "./past-students-section";
import { MoreToReadSection } from "./more-to-read-section";
import { BLOG_DETAIL_DATA } from "./blog-detail-data";
import { notFound } from "next/navigation";
import { Title } from "./title-social-icons-";
import { IntroductionSection } from "./introduction-section";
import { CulturalExchangeProgramSection } from "./cultural-exchange-program-section";
import { WhatToExpectSection } from "./what-to-expect-section";
import { SocialMedia, SocialMediaLinks } from "@/atoms/social-media";
import { SocialMediaIcons } from "./social-media-icons";
import { BlogBreadcrumb } from "./blog-breadcrumb";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
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
      <BlogHero title={blog.title} />

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
              <BlogBreadcrumb breadcrumbs={blog.breadcrumbs} />
              <SocialMediaIcons />
            </div>
            <Title title={blog.title} />

            {blog.sections.map((section) => {
              // Map section IDs to their corresponding components
              const sectionComponents: Record<string, React.ReactNode> = {
                introduction: <IntroductionSection key="introduction" />,
                "cultural-exchange-program": (
                  <CulturalExchangeProgramSection key="cultural-exchange-program" />
                ),
                "what-to-expect": <WhatToExpectSection key="what-to-expect" />,
              };

              return sectionComponents[section.id] || null;
            })}

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
