import { Inter, Poppins, Montserrat } from 'next/font/google'

// Define fonts to use in the application
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

// Combined font variables string for use in layout
export const fontVariables = `${inter.variable} ${poppins.variable} ${montserrat.variable}`