import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "./hooks/useAccessibilitySettings";
import Landing from "./pages/Landing";
import Community from "./pages/Community";
import AccessibleMap from "./pages/AccessibleMap";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/map" element={<AccessibleMap />} />
          <Route path="/community" element={<Community />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
