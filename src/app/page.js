import Image from "next/image";
import HeroBanner from "./components/Banner";
import PricingPage from "./pricing/page";

export default function Home() {
  return (
    <div>
      <HeroBanner/>

      <PricingPage/>
    </div>
  );
}
