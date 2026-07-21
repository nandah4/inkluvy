import { AccessibilityProvider } from './hooks/useAccessibilitySettings'
import Landing from './pages/Landing'

function App() {
  return (
    <AccessibilityProvider>
      <Landing />
    </AccessibilityProvider>
  )
}

export default App
