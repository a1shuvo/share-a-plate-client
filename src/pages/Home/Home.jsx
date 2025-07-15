import FeaturedDonations from "../../components/Home/FeaturedDonations";
import HomeBanner from "../../components/Home/HomeBanner";
import ImpactStats from "../../components/Home/ImpactStats";
import LatestDonationRequests from "../../components/Home/LatestDonationRequests";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <FeaturedDonations></FeaturedDonations>
      <LatestDonationRequests></LatestDonationRequests>
      <ImpactStats></ImpactStats>
    </div>
  );
};

export default Home;
