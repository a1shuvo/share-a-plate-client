import CommunityStories from "../../components/Home/CommunityStories";
import FeaturedDonations from "../../components/Home/FeaturedDonations";
import HomeBanner from "../../components/Home/HomeBanner";
import HowItWorks from "../../components/Home/HowItWorks";
import ImpactStats from "../../components/Home/ImpactStats";
import JoinUsCTA from "../../components/Home/JoinUsCTA";
import LatestDonationRequests from "../../components/Home/LatestDonationRequests";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <FeaturedDonations></FeaturedDonations>
      <WhyChooseUs></WhyChooseUs>
      <LatestDonationRequests></LatestDonationRequests>
      <HowItWorks></HowItWorks>
      <ImpactStats></ImpactStats>
      <JoinUsCTA></JoinUsCTA>
      <CommunityStories></CommunityStories>
    </div>
  );
};

export default Home;
