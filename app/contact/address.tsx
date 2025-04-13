import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import { SectionWrapper } from "../(home)/section-wrapper";

export function Address() {
  return (
    <SectionWrapper sectionColor="bg-[#f5f6f7]">
      <div className="flex flex-col gap-y-20">
        <div className="md:max-w-1/3 pt-[30vh]">
          <p className="typography-R16 leading-5 text-lev-black opacity-50">
            At Levntura, we’re here to guide you every step of the way on your
            journey of discovery. Whether you have questions about our programs,
            want to share feedback, or simply want to say hello, we’d love to
            hear from you. Get in touch with us using any of the following
            methods:
          </p>
        </div>

        <div className="lg:flex items-center space-y-8  gap-[15%]">
          <div className="">
            <h1 className="typography-EB74 uppercase leading-16">amm</h1>

            <address className="typography-R14 opacity-50 mt-3.5 mb-2.5 w-3/4 leading-4">
              Address: Mecca st, Buld 145, office 408, Amman Jordan, 11185
            </address>

            <p className="typography-R14 leading-5 text-lev-black opacity-50">
              +962 79 082 2202
            </p>
            <p className="typography-R14 leading-5 text-lev-black opacity-50">
              +962 79 092 2202
            </p>

            <h6 className="typography-B14 mt-4">DIRECTIONS</h6>

            <div className="flex gap-x-8 mt-5">
              <a href="">
                <InstagramIcon size={16} />
              </a>
              <a href="">
                <TwitterIcon size={16} />
              </a>
              <a href="">
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          <div className="">
            <h1 className="typography-EB74 uppercase leading-16">cai</h1>

            <address className="typography-R14 opacity-50 mt-3.5 mb-2.5 w-3/4 leading-4">
              Address: 3 Skies Plaza, S 90th st, New Cairo, Egypt, 11835
            </address>

            <p className="typography-R14 leading-5 text-lev-black opacity-50">
              +20 150 0050391
            </p>
            <p className="typography-R14 leading-5 text-lev-black opacity-50">
              +20 150 0050392
            </p>

            <h6 className="typography-B14 mt-4">DIRECTIONS</h6>

            <div className="flex gap-x-8 mt-5">
              <a href="">
                <InstagramIcon size={16} />
              </a>
              <a href="">
                <TwitterIcon size={16} />
              </a>
              <a href="">
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
