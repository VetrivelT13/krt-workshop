import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import About from '../components/home/About';
import Contact from '../components/home/Contact';

// Structured data for local business (SEO)
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoPartsStore',
  name: 'KRT Workshop & Traders',
  description:
    'Tractor spare parts, agriculture tools, engine oils, welding materials and welding services in Ariyalur, Tamil Nadu.',
  url: 'https://krtworkshop.vercel.app',
  telephone: ['+918825515488', '+919965634061'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vilangudi, Near Government Hospital',
    addressLocality: 'Ariyalur',
    addressRegion: 'Tamil Nadu',
    postalCode: '621704',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    // Update with exact coordinates after adding to Google Maps
    latitude: '11.1432',
    longitude: '79.0777',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  sameAs: [],
};

export default function Home() {
  return (
    <>
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Layout
        title="KRT Workshop & Traders — Tractor Spare Parts & Agriculture Tools, Ariyalur"
        description="KRT Workshop & Traders in Ariyalur, Tamil Nadu. Buy tractor spare parts, agriculture tools, engine oils, belts and welding materials. Call: 8825515488 / 9965634061."
        canonical="https://krtworkshop.vercel.app"
      >
        <Hero />
        <Categories />
        <FeaturedProducts />
        <About />
        <Contact />
      </Layout>
    </>
  );
}
