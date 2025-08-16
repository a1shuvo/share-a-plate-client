import { useEffect } from "react";
import {
  FaChartLine,
  FaGlobeAsia,
  FaHandsHelping,
  FaQuestionCircle,
  FaRecycle,
  FaShieldAlt,
  FaStore,
  FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router";
import hero from "../assets/hero.jpg";

const About = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const faqs = [
    {
      q: "What is ShareAPlate?",
      a: "ShareAPlate is a MERN-powered food donation and sharing platform that connects restaurants, charities, and individuals to reduce food waste and support communities in need.",
    },
    {
      q: "Who can use the platform?",
      a: "Restaurants and home cooks can donate surplus food. Charities can request and coordinate pickups. Individuals can discover community fridges, request help, and volunteer.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. We use secure authentication, role-based access, and encrypted communication to protect user data and donation records.",
    },
    {
      q: "Is there any cost to join?",
      a: "No. ShareAPlate is free to use for restaurants, charities, and individuals.",
    },
  ];

  return (
    <main className="min-h-screen bg-base-100">
      {/* SEO */}
      <title>About • ShareAPlate - Food Waste Reduction Platform</title>
      <meta
        name="description"
        content="ShareAPlate is a MERN Stack-powered food donation and sharing platform that connects restaurants, charities, and individuals to reduce food waste and support communities in need."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ShareAPlate",
            url: "https://your-domain.example", // <- update
            logo: "https://your-domain.example/logo.png", // <- update
            sameAs: [
              "https://github.com/a1shuvo", // optional
              "https://linkedin.com/in/a1shuvo", // optional
            ],
            description:
              "MERN Stack-powered food donation and sharing platform connecting restaurants, charities, and individuals.",
          }),
        }}
      />

      {/* Hero */}
      <section className="hero py-8">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <img
            src={hero}
            alt="Volunteers organizing donated meals"
            className="rounded-xl shadow-2xl w-full max-w-xl object-cover"
            loading="lazy"
          />
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              ShareAPlate - Food Waste Reduction Platform
            </h1>
            <p className="py-6 text-base md:text-lg opacity-90">
              ShareAPlate is a MERN Stack-powered food donation and sharing
              platform that connects restaurants, charities, and individuals to
              reduce food waste and support communities in need.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/register"
                className="btn btn-primary px-10 py-4 shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
              >
                <FaUserPlus className="text-lg" />
                Register
              </Link>
              <Link
                to="/dashboard/upgrade-role"
                className="btn btn-secondary px-10 py-4 shadow-xl transform hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
              >
                <FaHandsHelping className="text-lg" />
                Become a Charity
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 opacity-90">
              Every day, good food goes to waste while people go hungry. We’re
              here to change that by making it easy for food providers to donate
              safely and for charities to receive efficiently. Together, we
              build a greener, kinder food ecosystem.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <FaRecycle aria-hidden className="mt-1" />
                <span>
                  <strong>Reduce Waste:</strong> Divert edible surplus from
                  landfills into meals.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaHandsHelping aria-hidden className="mt-1" />
                <span>
                  <strong>Support Communities:</strong> Simplify donations and
                  requests with transparency.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaShieldAlt aria-hidden className="mt-1" />
                <span>
                  <strong>Safety First:</strong> Verified partners, clear status
                  tracking, and role-based access.
                </span>
              </li>
            </ul>
          </div>
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title">How ShareAPlate Works</h3>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    icon: <FaStore />,
                    title: "Add Donation",
                    text: "Restaurants (or individuals) create a donation with quantity, type, and pickup time.",
                  },
                  {
                    icon: <FaHandsHelping />,
                    title: "Request & Match",
                    text: "Charities request items; the system matches by location and availability.",
                  },
                  {
                    icon: <FaShieldAlt />,
                    title: "Verify & Assign",
                    text: "Admins verify; pickup is coordinated with riders or charity volunteers.",
                  },
                  {
                    icon: <FaChartLine />,
                    title: "Track Impact",
                    text: "Everyone can see statuses and impact stats across donations.",
                  },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-xl bg-base-100 border">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{s.icon}</span>
                      <h4 className="font-semibold">{s.title}</h4>
                    </div>
                    <p className="mt-2 text-sm opacity-80">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            Why Choose ShareAPlate?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Verified & Secure",
                text: "Role-based access, auth guards, and audit-friendly records.",
              },
              {
                icon: <FaGlobeAsia />,
                title: "Local-first",
                text: "Optimized for local pickup routing and area-based searches.",
              },
              {
                icon: <FaRecycle />,
                title: "Waste-to-Meal",
                text: "Turn surplus into meals with minimal friction and maximum dignity.",
              },
            ].map((f, i) => (
              <div key={i} className="card bg-base-100 border">
                <div className="card-body">
                  <div className="text-2xl">{f.icon}</div>
                  <h3 className="card-title mt-2">{f.title}</h3>
                  <p className="opacity-80">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            Who is ShareAPlate for?
          </h2>
          <div className="grid md:grid-cols-3 gap-5 mt-6">
            {[
              {
                title: "Restaurants & Cafés",
                text: "List surplus safely, set pickup windows, and track your social impact.",
                cta: { to: "/register", label: "Start Donating" },
              },
              {
                title: "Charities",
                text: "Request donations, coordinate pickups, and manage received items seamlessly.",
                cta: { to: "/all-donations", label: "Find Donations" },
              },
              {
                title: "Communities",
                text: "Discover community fridges, volunteer, and spread the word to reduce waste.",
                cta: { to: "/register", label: "Join as Volunteer" },
              },
            ].map((card, i) => (
              <div key={i} className="card bg-base-100 border">
                <div className="card-body">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="opacity-80">{card.text}</p>
                  <div className="card-actions">
                    <Link to={card.cta.to} className="btn btn-primary btn-sm">
                      {card.cta.label}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 md:px-8 lg:px-12 py-12 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <FaQuestionCircle /> Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="collapse collapse-arrow bg-base-100 border"
              >
                <input type="checkbox" aria-label={`Toggle ${f.q}`} />
                <div className="collapse-title text-lg font-medium">{f.q}</div>
                <div className="collapse-content">
                  <p className="opacity-90">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto rounded-2xl bg-base-100 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Ready to turn surplus into smiles?
          </h2>
          <p className="mt-2 opacity-90">
            Join our mission to reduce food waste and nourish communities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
