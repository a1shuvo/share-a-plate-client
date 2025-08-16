import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success message
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting ShareAPlate. We'll get back to you soon.",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6 sm:px-12 md:px-24">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4">
          Contact <span className="text-secondary">Us</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          We're here to help! Reach out to ShareAPlate for any questions,
          feedback, or collaboration opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-base-200 shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-secondary text-white font-semibold px-6 py-3 rounded-lg hover:bg-secondary/90 transition w-full"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-8">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-secondary text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-primary">
                Our Address
              </h3>
              <p className="text-gray-500">
                Chonkanda Bazar, Phulpur, Mymensingh-2250, Bangladesh
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-secondary text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-primary">Call Us</h3>
              <p className="text-gray-500">+880 1725 062049</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-secondary text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-primary">Email</h3>
              <p className="text-gray-500">support@shareaplate.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Map */}
      <div className="mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.123456789!2d90.401234!3d24.750123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c123456789ab%3A0xabcdef1234567890!2sChonkanda%20Bazar%2C%20Phulpur%2C%20Mymensingh!5e0!3m2!1sen!2sbd!4v1692190000000!5m2!1sen!2sbd"
          className="w-full h-64 md:h-96 rounded-xl shadow-lg border-0"
          allowFullScreen=""
          loading="lazy"
          title="ShareAPlate Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
