"use client";

import Link from "next/link";
import PrimaryButton from "./ui/PrimaryButton";

export default function AboutPreview() {
  return (
    <section className="py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-12 justify-between items-start">
          {/* Mobile Buttons */}
          <div className="w-full flex lg:hidden flex-col md:flex-row gap-2">
            <PrimaryButton url="#" lable="Our Story" />

            <Link
              href="#"
              className="group inline-flex items-center justify-center gap-x-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 bg-transparent text-grey-900 hover:rounded-lg hover:bg-grey-50"
            >
              <span className="relative overflow-hidden">
                <span className="transition inline-block group-hover:-translate-y-6">
                  Our Services <i className="fa-sharp fa-regular fa-arrow-up-right text-xs" />
                </span>
                <span className="absolute top-0 left-0 translate-y-6 group-hover:translate-y-0 transition">
                  Our Services <i className="fa-sharp fa-regular fa-arrow-up-right text-xs" />
                </span>
              </span>

            </Link>
          </div>
          {/* Left Column - Paragraph */}
          <div className="w-full lg:w-1/2">
            <p className="text-lg md:text-[24px] leading-none text-grey-800 font-medium max-w-[500px]">
              A global team of search-first content marketers engineering semantic relevancy & category signals for both the internet and people
            </p>
          </div>
          {/* Right Column - Title with Image + Buttons */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Title Text */}
              <h2 className="text-[50px] lg:text-[75px] font-medium tracking-tight leading-none lg:mb-8">
                Driving Demand &{" "}
                <span className="inline-flex items-center gap-3">
                  Discovery
                  {/* Small Square Image in Title */}
                  <div className="inline-block w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('/hero-images/hero-2.webp')",
                      }}
                    />
                  </div>
                </span>
              </h2>

              {/* Buttons */}
              <div className="hidden lg:flex flex-col md:flex-row gap-4">
                <PrimaryButton url="#" lable="Our Story" />

                <Link
                  href="#"
                  className="group inline-flex items-center justify-center gap-x-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 bg-transparent text-grey-900 hover:rounded-lg hover:bg-grey-50"
                >
                  <span className="relative overflow-hidden">
                    <span className="transition inline-block group-hover:-translate-y-6">
                      Our Services <i className="fa-sharp fa-regular fa-arrow-up-right text-xs" />
                    </span>
                    <span className="absolute top-0 left-0 translate-y-6 group-hover:translate-y-0 transition">
                      Our Services <i className="fa-sharp fa-regular fa-arrow-up-right text-xs" />
                    </span>
                  </span>

                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
