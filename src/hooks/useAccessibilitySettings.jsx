import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AccessibilityContext = createContext(null)
const STORAGE_KEY = 'akseskota-accessibility-settings'

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY)
    return savedSettings ? JSON.parse(savedSettings) : { highContrast: false, textScale: 'normal' }
  })

  useEffect(() => {
    document.documentElement.dataset.contrast = settings.highContrast ? 'high' : 'default'
    document.documentElement.dataset.textScale = settings.textScale
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const value = useMemo(
    () => ({
      settings,
      toggleHighContrast: () => setSettings((current) => ({ ...current, highContrast: !current.highContrast })),
      setTextScale: (textScale) => setSettings((current) => ({ ...current, textScale })),
    }),
    [settings],
  )

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>
}

export function useAccessibilitySettings() {
  const context = useContext(AccessibilityContext)
  if (!context) throw new Error('useAccessibilitySettings must be used inside AccessibilityProvider')
  return context
}
