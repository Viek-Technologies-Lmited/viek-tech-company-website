"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Cookie, Settings } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show cookie consent after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true }
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted))
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = { necessary: true, analytics: false, marketing: false }
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary))
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-background rounded-2xl shadow-2xl border border-border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">We use cookies</h3>
                      <p className="text-sm text-muted-foreground">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                        Read our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
                        <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link> for more information.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm text-foreground">Necessary Cookies</p>
                              <p className="text-xs text-muted-foreground">Required for basic site functionality</p>
                            </div>
                            <div className="w-12 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                              <div className="w-4 h-4 bg-white rounded-full" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm text-foreground">Analytics Cookies</p>
                              <p className="text-xs text-muted-foreground">Help us improve our website</p>
                            </div>
                            <button
                              onClick={() => setPreferences((p) => ({ ...p, analytics: !p.analytics }))}
                              className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                                preferences.analytics ? "bg-primary justify-end" : "bg-muted justify-start"
                              }`}
                            >
                              <div className="w-4 h-4 bg-white rounded-full" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm text-foreground">Marketing Cookies</p>
                              <p className="text-xs text-muted-foreground">For personalized advertising</p>
                            </div>
                            <button
                              onClick={() => setPreferences((p) => ({ ...p, marketing: !p.marketing }))}
                              className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                                preferences.marketing ? "bg-primary justify-end" : "bg-muted justify-start"
                              }`}
                            >
                              <div className="w-4 h-4 bg-white rounded-full" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {showSettings ? (
                      <>
                        <Button onClick={handleSavePreferences} size="sm">
                          Save Preferences
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
                          Back
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={handleAcceptAll} size="sm">
                          Accept All
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleRejectAll}>
                          Reject All
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSettings(true)}
                          className="gap-1"
                        >
                          <Settings className="w-4 h-4" />
                          Manage
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
