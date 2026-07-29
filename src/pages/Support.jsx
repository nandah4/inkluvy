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
  LuLifeBuoy,
  LuAccessibility,
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
      "Tap the 'Report Route Condition' button on the navigation screen or in the Community section. Fill out the obstacle location, route status, description, and optionally upload a photo evidence. Your report earns you +50 Contributor Points once published.",
  },
  {
    question: "Is Inkluvy free to use for persons with disabilities?",
    answer:
      "Yes! Inkluvy is 100% free for all citizens, wheelchair users, low-vision individuals, and senior citizens. Our mission is to make urban mobility inclusive and open for everyone.",
  },
  {
    question: "What should I do if I need emergency route assistance?",
    answer:
      "Call our 24/7 Emergency Dispatch Helpline directly at 0800-1-INKLUVY (465588) or click 'Request Volunteer Escort' in the Support section. Nearby verified community mappers will be notified.",
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
            <span className="inline-flex items-center justify-center bg-gradient-to-tr from-rose-500 to-red-300 p-1.5 sm:p-2.5 lg:p-3 rounded-xl text-white shadow-xs mx-1 sm:mx-1.5 align-middle -rotate-6 shrink-0">
              <LuLifeBuoy className="size-4 sm:size-6 lg:size-8 text-white" />
            </span>{" "}
            <span>Every Step</span>{" "}
            <span className="inline-flex items-center justify-center bg-gradient-to-tr from-amber-400 to-yellow-200 p-1.5 sm:p-2.5 lg:p-3 rounded-xl text-white shadow-xs mx-1 sm:mx-1.5 align-middle rotate-6 shrink-0">
              <LuAccessibility className="size-4 sm:size-6 lg:size-8 text-white" />
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
                        <option value="reports">
                          Total Reports & Contributions
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
                      className="w-full py-4 rounded-xl bg-gradient-to-b from-black to-black/50 text-white text-xs font-bold shadow-md hover:from-black hover:to-black/70 transition-colors"
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
