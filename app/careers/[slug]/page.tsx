import { JobListingCard } from "../job-listing-card";
import { JobDetailContent } from "../job-detail-content";
import { CAREER_DETAIL_DATA } from "../career-detail-data";
import { notFound } from "next/navigation";
import { ShareCard } from "../share-card";

interface CareerDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { slug } = await params;
  const career = CAREER_DETAIL_DATA.find((c) => c.slug === slug);

  if (!career) {
    notFound();
  }

  const otherJobs = CAREER_DETAIL_DATA;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute inset-x-0 h-[300px] lg:h-[400px] bg-lev-green-dark w-full" />
      <div className="container-md px-4 mx-auto flex flex-col-reverse lg:flex-row items-start pt-[200px] lg:pt-[300px] pb-12 gap-6 lg:gap-8">
        {/* Left Column - Job Listings */}
        <div className="space-y-6 basis-1/3">
          {otherJobs.map((job) => (
            <JobListingCard
              key={job.slug}
              image={job.image}
              title={job.title}
              dates={job.dates}
              type={job.type}
              typeColor={job.typeColor}
              country={job.country}
              countryCode={job.countryCode}
              description={job.description}
              salary={job.salary}
              moreHref={`/careers/${job.slug}`}
            />
          ))}
        </div>

        {/* Right Column - Job Detail */}
        <div className="space-y-8 flex-1">
          <JobDetailContent
            type={career.type}
            title={career.title}
            category={career.category}
            dates={career.dates}
            country={career.country}
            countryCode={career.countryCode}
            description={career.description}
            requirements={career.requirements}
            benefits={career.benefits}
            applyHref={career.applyHref}
          />

          <ShareCard />
        </div>
      </div>
    </div>
  );
}
