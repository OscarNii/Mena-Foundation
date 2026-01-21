# Mena Foundation Website

A modern, responsive React TypeScript website for the Mena Foundation charity organization.

## 🌟 Overview

Mena Foundation is a non-profit organization dedicated to making a positive impact in the community. This website serves as the digital presence for the foundation, providing information about our mission, programs, and ways to contribute.

## ✨ Features

- **Responsive Design** - Mobile-first approach ensuring optimal viewing across all devices
- **Modern UI** - Built with Tailwind CSS for a clean, professional appearance
- **Interactive Components** - Engaging elements including:
  - Hero section with impactful messaging
  - Image carousel for showcasing events and activities
  - Gallery for photos from foundation events
  - Video section for multimedia content
  - Donation form for secure contributions
  - Contact form for inquiries
  - WhatsApp integration for easy communication

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Routing**: React Router
- **Language**: TypeScript

## 📁 Project Structure

```
mena_foundation/
├── src/
│   ├── components/
│   │   ├── About.tsx           # About section component
│   │   ├── Carousel.tsx        # Image carousel component
│   │   ├── Contact.tsx         # Contact form component
│   │   ├── DonationForm.tsx    # Donation submission form
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Gallery.tsx         # Photo gallery component
│   │   ├── Hero.tsx            # Hero/landing section
│   │   ├── Navbar.tsx          # Navigation menu
│   │   ├── Splash.tsx          # Splash/intro screen
│   │   ├── VideoSection.tsx    # Video content section
│   │   └── WhatsAppButton.tsx  # WhatsApp contact button
│   ├── imgs/                   # Static images and assets
│   ├── lib/
│   │   └── supabase.ts         # Supabase client configuration
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global styles
│   └── vite-env.d.ts          # Vite type definitions
├── supabase/
│   ├── migrations/             # Database migrations
│   └── imgs/                   # Supabase storage assets
├── index.html                  # HTML entry point
├── package.json               # Project dependencies
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mena_foundation
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Theming

Modify `tailwind.config.js` to customize colors, fonts, and other design tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
      },
    },
  },
}
```

### Adding Content

- **Images**: Add images to `src/imgs/` directory
- **Components**: Create new components in `src/components/`
- **Database**: Run migrations in `supabase/migrations/`

## 📱 Components

### Navbar
Responsive navigation bar with links to all major sections.

### Hero
Eye-catching landing section with call-to-action buttons.

### About
Information about the foundation's mission, vision, and values.

### Gallery
Grid-based photo gallery showcasing foundation activities.

### Carousel
Interactive image carousel for featured content.

### DonationForm
Secure form for accepting donations (integrates with Supabase).

### Contact
Contact form for inquiries and messages.

### WhatsAppButton
Floating button for quick WhatsApp communication.

### Footer
Site-wide footer with links and contact information.

## 🗃 Database Schema

The project includes a Supabase migration file that sets up:
- Tables for managing foundation data
- Storage configurations for images
- Authentication settings

Run the migrations in your Supabase dashboard or using the Supabase CLI.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions or support, please contact:
- **Email**: info@menafoundation.org
- **Website**: www.menafoundation.org

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

Built with ❤️ for the Mena Foundation

