import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({
  children,
  title = 'KRT Workshop & Traders — Tractor Parts, Agri Tools, Ariyalur',
  description = 'KRT Workshop & Traders in Ariyalur, Tamil Nadu offers tractor spare parts, agriculture tools, engine oils, welding materials and welding services. Contact: 8825515488.',
  canonical,
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krtworkshop.vercel.app';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical || siteUrl} />
        <meta property="og:image" content={`${siteUrl}/images/og-image.jpg`} />
        <meta property="og:site_name" content="KRT Workshop & Traders" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* Canonical */}
        {canonical && <link rel="canonical" href={canonical} />}

        {/* Keywords for SEO */}
        <meta
          name="keywords"
          content="tractor spare parts Ariyalur, agriculture tools Ariyalur, tractor workshop near me, KRT Workshop, welding services Ariyalur, engine oil Ariyalur, tractor parts Tamil Nadu, விவசாய கருவிகள் அரியலூர்"
        />

        {/* Geo tags */}
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Ariyalur, Tamil Nadu, India" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Tamil:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
