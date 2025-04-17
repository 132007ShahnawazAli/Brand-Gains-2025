/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#bafc50",
          foreground: "#021814",
          dark: "#a5e639",
          light: "#c5ff6b",
        },
        secondary: {
          DEFAULT: "#171919",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ff4747",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#8a8a8a",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#255e45",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#171919",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#171919",
          foreground: "#ffffff",
        },
        dark: {
          DEFAULT: "#021814",
          2: "#171919",
          3: "#1a1a1a",
        },
        light: "#ffffff",
        gray: {
          DEFAULT: "#8a8a8a",
          light: "#e0e0e0",
        },
      },
      borderRadius: {
        none: "0",
        sm: "0.375rem", // 6px
        DEFAULT: "0.5rem", // 8px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
        "3xl": "2rem", // 32px
        full: "9999px",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in-up": "fadeInUp 0.8s ease forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 3s infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        primary: "0 4px 20px rgba(186, 252, 80, 0.3)",
        "primary-hover": "0 6px 25px rgba(186, 252, 80, 0.5)",
        card: "0 10px 30px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 15px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(186, 252, 80, 0.2)",
        button: "0 4px 10px rgba(0, 0, 0, 0.1)",
        "button-hover": "0 6px 15px rgba(0, 0, 0, 0.15), 0 0 10px rgba(186, 252, 80, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
