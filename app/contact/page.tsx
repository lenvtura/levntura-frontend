import { Metadata } from "next";
import { Suspense } from "react";
import { Address } from "./address";
// import { JoinOurComunity } from './join-our-comunity';
import { SocialAndForm } from "./social-and-form";

export const metadata: Metadata = {
  title: "Contact us | Levntura",
};

export default function ContactPage() {
  return (
    <>
      <SocialAndForm />
      <Suspense
        fallback={
          <div className="animate-pulse bg-white py-16">
            <div className="container-md">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Address />
      </Suspense>
      {/* <JoinOurComunity /> */}
    </>
  );
}
