import { CAREER_DETAIL_DATA } from "../career-detail-data";
import { notFound } from "next/navigation";

interface CareerDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return CAREER_DETAIL_DATA.map((career) => ({ slug: career.slug }));
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { slug } = params;
  const career = CAREER_DETAIL_DATA.find((c) => c.slug === slug);

  if (!career) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute inset-x-0 h-[300px] lg:h-[400px] bg-lev-green-dark w-full" />
      <div className="container-md px-4 mx-auto pt-[200px] lg:pt-[300px] pb-12">
        <div className="bg-white p-8">
          <h1 className="text-3xl font-bold mb-4">{career.title}</h1>
          <p className="text-gray-600 mb-4">{career.description}</p>
          <p className="text-sm text-gray-500">Type: {career.type}</p>
          <p className="text-sm text-gray-500">Country: {career.country}</p>
        </div>
      </div>
    </div>
  );
}
