
import HeroBanner from "./components/Banner";
import FeaturedRecipesPage from "./featuredPage/page";
import PricingPage from "./pricing/page";

export default function Home() {
  return (
    <div>
      <HeroBanner/>
<FeaturedRecipesPage/>
      <PricingPage/>
    </div>
  );
}
