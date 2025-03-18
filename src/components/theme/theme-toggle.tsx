"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) {
    return <div className="w-10 h-10" />
  }
  
  const isDark = theme === "dark"
  
  return (
    <motion.button
      className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors relative overflow-hidden"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          y: isDark ? -30 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <SunIcon className="h-5 w-5 text-yellow-500" />
      </motion.div>
      
      <motion.div
        className="absolute"
        initial={false}
        animate={{
          y: isDark ? 0 : 30,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <MoonIcon className="h-5 w-5 text-blue-400" />
      </motion.div>
      
      {/* Background effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          backgroundColor: isDark 
            ? "rgba(59, 130, 246, 0.1)" 
            : "rgba(250, 204, 21, 0.1)",
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  )
}