import CommunityStories from "../../components/Home/CommunityStories";
import FeaturedDonations from "../../components/Home/FeaturedDonations";
import HomeBanner from "../../components/Home/HomeBanner";
import HowItWorks from "../../components/Home/HowItWorks";
import ImpactStats from "../../components/Home/ImpactStats";
import LatestDonationRequests from "../../components/Home/LatestDonationRequests";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <FeaturedDonations></FeaturedDonations>
      <LatestDonationRequests></LatestDonationRequests>
      <ImpactStats></ImpactStats>
      <HowItWorks></HowItWorks>
      <CommunityStories></CommunityStories>
    </div>
  );
};

export default Home;
