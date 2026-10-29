import { CallToAction } from "@/components/home/call-to-action"
import { Hero } from "@/components/home/hero"
import { Testimonials } from "@/components/home/testimonials"
import { WhyChooseUs } from "@/components/home/why-choose-us"

export default function Home() {
  return (
    <>
      
      <main className="flex flex-1 flex-col">
        <Hero />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      
    </>
  );
}
