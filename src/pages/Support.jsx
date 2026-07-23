import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuPhone,
  LuGlobe,
  LuMail,
  LuFileText,
  LuChevronDown,
  LuChevronUp,
  LuShieldAlert,
  LuCheck,
  LuGift,
  LuNavigation,
  LuClock,
  LuPhoneCall,
} from "react-icons/lu";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SectionIcon from "../components/ui/SectionIcon";

// FAQ Data
const faqData = [
  {
    question: "How does Inkluvy determine if a route is accessible?",
    answer:
      "Inkluvy uses crowd-sourced verified reports combined with public infrastructure data. Paths categorized as 'Accessible & Safe 🟢' feature slopes below 5 degrees, wide paved pathways (min 1.2m), and active elevator access. Paths labeled as 'Caution / Vulnerable 🟡' have warning signs like ongoing construction, damaged paving, or temporary blockages.",
  },
  {
    question: "How do I report an accessibility obstacle on the map?",
    answer:
      "Go to the 'Map' page, tap on any location point, and click the 'Report Obstacle' button. Fill in the route status, description, and upload a photo if possible to update the community map.",
  },
  {
    question: "How long does it take for a report to be verified?",
    answer:
      "After a report is submitted, nearby volunteers and local operations team members are notified. Typically, reports are verified within 15 to 30 minutes through community cross-validation.",
  },
  {
    question: "Can I request live volunteer assistance through the app?",
    answer:
      "Yes! By triggering the 'Emergency SOS' button on the Map page, Inkluvy alerts nearby active volunteers in the community. You can also call our Malang Hub dispatch line directly for immediate assistance.",
  },
  {
    question: "Does the voice guidance feature work offline?",
    answer:
      "Voice and haptic guidance works offline if you have pre-loaded the local area map. For real-time updates and emergency SOS assistance, an active internet connection is recommended.",
  },
];

export default function Support() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "general",
    details: "",
  });

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setFormData({ name: "", email: "", issueType: "general", details: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-gray-900 flex flex-col justify-between">
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="flex-1 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-16 sm:pb-24 w-full"
      >
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gray-800 mb-6 shadow-2xs mx-auto">
            {/* icon */}
            <LuPhoneCall className="size-3.5 sm:size-4 text-red-500" />
            <span>Support Hub</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.35] sm:leading-[1.25] lg:leading-[1.2] tracking-tight text-gray-900 max-w-3xl mx-auto">
            <span>We're Here to Help,</span>{" "}
            <span className="inline-flex align-middle w-10 h-7 sm:w-14 sm:h-10 lg:w-16 lg:h-11 rounded-full overflow-hidden border border-gray-200 shadow-sm mx-1 sm:mx-2 -translate-y-0.5 shrink-0">
              <img
                src="/images/support_hero_illustration.png"
                className="size-full object-cover"
                alt="support help desk"
              />
            </span>{" "}
            <span> Every Step</span>{" "}
            <span className="inline-flex align-middle w-10 h-7 sm:w-14 sm:h-10 lg:w-16 lg:h-11 rounded-full overflow-hidden border border-gray-200 shadow-sm mx-1 sm:mx-2 -translate-y-0.5 shrink-0">
              <img
                src="/images/every_step_illustration.png"
                className="size-full object-cover"
                alt="stepping on tactile path"
              />
            </span>{" "}
            <span>of the Way</span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
            Need help navigating accessible pathways, reporting city obstacles,
            or requesting emergency volunteer dispatch? Our team and community
            rescue lines are here to guide you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: FAQ (7 Cols) */}
          <div className="lg:col-span-7">
            {/* FAQ Accordions */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs">
              <div className="flex items-center gap-3 mb-3">
                <SectionIcon
                  icon={LuGlobe}
                  colorClass="from-blue-50 text-blue-600"
                />
                <h2 className="font-medium text-lg text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Find quick answers to routing mechanisms, community ranks, and
                app setups.
              </p>

              <div className="space-y-3">
                {faqData.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        className={`w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 transition-colors ${
                          isOpen
                            ? "bg-[#F5F5F3]/50 font-bold"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <LuChevronUp className="size-4 text-gray-500 shrink-0" />
                        ) : (
                          <LuChevronDown className="size-4 text-gray-500 shrink-0" />
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="p-4 bg-white border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Support Form & Resources (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Support Ticket Form */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/90 shadow-2xs">
              <div className="flex items-center gap-3 mb-3">
                <SectionIcon
                  icon={LuMail}
                  colorClass="from-emerald-50 text-emerald-600"
                />
                <h2 className="font-medium text-lg text-gray-900">
                  Submit a Request
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Can't find what you need? Drop our city operations team a line
                and we'll reply shortly.
              </p>

              <AnimatePresence mode="wait">
                {feedbackSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-xl text-center space-y-2"
                  >
                    <div className="size-9 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-3xs">
                      <LuCheck className="size-5 stroke-[3]" />
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 mt-2">
                      Request Submitted!
                    </h3>
                    <p className="text-xs text-emerald-700 font-medium">
                      Thank you. Our volunteer operations team has received your
                      ticket and will follow up via email soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full rounded-xl bg-[#F5F5F3] border border-gray-200/80 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full rounded-xl bg-[#F5F5F3] border border-gray-200/80 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Issue Category
                      </label>
                      <select
                        name="issueType"
                        value={formData.issueType}
                        onChange={handleInputChange}
                        className="w-full rounded-xl bg-[#F5F5F3] border border-gray-200/80 px-3.5 py-2.5 text-xs text-gray-900 focus:border-gray-400 focus:bg-white focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="general">General App Help</option>
                        <option value="map-issue">Map Route Correction</option>
                        <option value="sos-volunteer">
                          SOS Volunteer Inquiry
                        </option>
                        <option value="points-rank">
                          Mapper Points & Rewards
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Message Details
                      </label>
                      <textarea
                        name="details"
                        rows={4}
                        value={formData.details}
                        onChange={handleInputChange}
                        placeholder="Describe your issue or feedback in detail..."
                        className="w-full rounded-xl bg-[#F5F5F3] border border-gray-200/80 px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white focus:outline-none resize-none transition-all"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-black text-white text-xs font-bold shadow-md hover:bg-gray-800 transition-colors"
                    >
                      Submit Ticket
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
