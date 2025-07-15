import FeaturedDonations from "../../components/Home/FeaturedDonations";
import HomeBanner from "../../components/Home/HomeBanner";
import LatestDonationRequests from "../../components/Home/LatestDonationRequests";

const Home = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <FeaturedDonations></FeaturedDonations>
      <LatestDonationRequests></LatestDonationRequests>
    </div>
  );
};

export default Home;
