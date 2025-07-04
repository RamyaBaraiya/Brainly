// import  Button  from "../components/ui/Button";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-6 py-12">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center max-w-2xl"
//       >
//         <h1 className="text-5xl font-bold text-gray-800 mb-4">
//           Your Central Hub for Web Content
//         </h1>
//         <p className="text-lg text-gray-600 mb-6">
//           Collect, organize, and revisit content from <span className="font-semibold">Twitter</span> and <span className="font-semibold">YouTube</span> — all in one place. Share your curated lists effortlessly with others.
//         </p>
//         <Button
//             variant="primary"
//             text="Get Started"
//             onClick={() => navigate("/signup")}
//            // className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-2xl shadow-lg transition-all"
//         />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.3, duration: 0.6 }}
//         className="mt-16 shadow-xl bg-white rounded-2xl p-6 max-w-4xl w-full"
//       >
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">What You Can Do</h2>
//         <ul className="grid gap-4 md:grid-cols-2">
//           <li className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//             • Add content directly from Twitter and YouTube
//           </li>
//           <li className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//             • Store and revisit at your convenience
//           </li>
//           <li className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//             • Share with friends via custom links
//           </li>
//           <li className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//             • Clean, simple and intuitive interface
//           </li>
//         </ul>
//       </motion.div>
//     </div>
//   );
// }


import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
//import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
