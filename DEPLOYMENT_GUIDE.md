# 🚜 KRT Workshop & Traders — Deployment Guide

## Step-by-Step Setup (No coding experience needed for most steps!)

---

## PART 1: Firebase Setup (Database + Image Storage + Login)

### Step 1.1 — Create a Firebase Project
1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Project name: `krt-workshop`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 1.2 — Enable Authentication
1. In Firebase Console, click **"Authentication"** in the left menu
2. Click **"Get started"**
3. Click **"Email/Password"** provider
4. Toggle **Enable** → Save
5. Click **"Users"** tab → **"Add user"**
   - Email: `admin@krtworkshop.com` (or any email you like)
   - Password: Create a strong password (write it down!)
6. Click **"Add user"**

### Step 1.3 — Create Firestore Database
1. Click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select region: **asia-south1 (Mumbai)** — closest to India
5. Click **"Enable"**

### Step 1.4 — Set Firestore Security Rules
1. In Firestore, click **"Rules"** tab
2. Replace the existing rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products: anyone can read, only authenticated admin can write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 1.5 — Enable Firebase Storage
1. Click **"Storage"** in left menu
2. Click **"Get started"**
3. Start in **production mode**
4. Select **asia-south1** region
5. Click **"Done"**

### Step 1.6 — Set Storage Security Rules
1. In Storage, click **"Rules"** tab
2. Replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 1.7 — Get Firebase Config Keys
1. In Firebase Console, click the **⚙️ gear icon** → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click **"Add app"** → Web icon (`</>`)
4. App nickname: `krt-website`
5. Click **"Register app"**
6. You will see a `firebaseConfig` object — **copy these values!**

---

## PART 2: Project Configuration

### Step 2.1 — Configure Environment Variables
1. In the project folder, find the file `.env.local.example`
2. Create a **copy** of it named `.env.local`
3. Open `.env.local` and fill in your Firebase values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=krt-workshop.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=krt-workshop
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=krt-workshop.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

NEXT_PUBLIC_ADMIN_EMAIL=admin@krtworkshop.com
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

## PART 3: Install and Run Locally (for testing)

### Prerequisites
- Install **Node.js** from https://nodejs.org (LTS version)
- Install **Git** from https://git-scm.com (optional)

### Step 3.1 — Install Dependencies
Open a terminal/command prompt in the project folder and run:
```bash
npm install
```

### Step 3.2 — Run Development Server
```bash
npm run dev
```
Open your browser at **http://localhost:3000** to see the website!

Admin panel: **http://localhost:3000/admin**

---

## PART 4: Deploy to Vercel (Free Hosting)

### Step 4.1 — Create a Vercel Account
1. Go to **https://vercel.com**
2. Sign up with GitHub (recommended) or email

### Step 4.2 — Upload to GitHub (Required for Vercel)
1. Go to **https://github.com** and create a free account
2. Create a new repository named `krt-workshop`
3. Upload the project folder to GitHub

OR use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Step 4.3 — Deploy on Vercel
1. Go to **https://vercel.com/new**
2. Import your GitHub repository
3. In **"Environment Variables"**, add all variables from your `.env.local` file
4. Click **"Deploy"**

Your website will be live at: `https://krt-workshop.vercel.app` (or similar)

### Step 4.4 — Add Environment Variables in Vercel
1. Go to your project on Vercel dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable from `.env.local`
4. Click **"Save"** and **"Redeploy"**

---

## PART 5: Connect a Custom Domain (Optional)

### Step 5.1 — Purchase a Domain
Buy a `.in` or `.com` domain from:
- GoDaddy India: https://in.godaddy.com
- BigRock: https://www.bigrock.in
- Namecheap: https://www.namecheap.com

Suggested names:
- `krtworkshop.in`
- `krtworkshop.com`
- `krtariyalur.in`

### Step 5.2 — Connect to Vercel
1. In Vercel dashboard → **"Settings"** → **"Domains"**
2. Add your custom domain
3. Follow the DNS instructions Vercel provides
4. Update `.env.local` → `NEXT_PUBLIC_SITE_URL=https://krtworkshop.in`

---

## PART 6: Add Google Maps Location

### Step 6.1 — Get Your Embed URL
1. Go to **https://maps.google.com**
2. Search for "KRT Workshop Vilangudi Ariyalur" or pin your exact location
3. Click **Share** → **Embed a map** → Copy the iframe code

### Step 6.2 — Add to Website
Open `src/components/home/Contact.js` and find the comment:
```
{/* TO ADD GOOGLE MAPS EMBED: Replace the content above with: */}
```
Replace the placeholder content with your Google Maps iframe.

---

## PART 7: Using the Admin Panel

### Access
- URL: `https://your-site.vercel.app/admin`
- Email: the admin email you created in Firebase
- Password: the password you set

### Adding a Product
1. Login to admin panel
2. Click **"Add New Product"** or the `➕` button
3. Fill in:
   - **Product Name** (e.g., "Mahindra 575 Air Filter")
   - **Price** (in ₹)
   - **Category** (select from dropdown)
   - **Description** (optional but recommended)
   - **Status** (Available or Sold Out)
   - **Image** (click to upload, max 5MB)
4. Click **"Save Product"**

### Editing/Deleting
- Click **Edit** next to any product to update it
- Click **Del** to remove it (asks for confirmation)
- Change status to **Sold Out** when item is sold

---

## PART 8: SEO — Getting Found on Google

### What's Already Done
- All pages have proper meta titles and descriptions
- Structured data (Schema.org) for local business
- Mobile-friendly design (Google ranks mobile sites higher)
- Fast loading with Next.js

### What You Should Do
1. **Google Search Console**: Submit your site at https://search.google.com/search-console
2. **Google Business Profile**: Create a free listing at https://business.google.com
   - Add your exact address, phone numbers, photos
   - Ask customers to leave Google reviews
3. **Add photos**: Add real product photos — sites with images rank better

---

## Project File Structure

```
krt-workshop/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.js         ← Top navigation bar
│   │   │   ├── Footer.js         ← Bottom footer
│   │   │   └── Layout.js         ← Page wrapper (SEO meta)
│   │   ├── home/
│   │   │   ├── Hero.js           ← Homepage banner
│   │   │   ├── Categories.js     ← Product categories section
│   │   │   ├── FeaturedProducts.js ← Featured products section
│   │   │   ├── About.js          ← About section
│   │   │   └── Contact.js        ← Contact section
│   │   ├── products/
│   │   │   └── ProductCard.js    ← Single product card
│   │   ├── admin/
│   │   │   ├── AdminLayout.js    ← Admin panel wrapper
│   │   │   └── ProductForm.js    ← Add/edit product form
│   │   └── ui/
│   │       ├── LanguageSwitcher.js ← EN/TA/HI switcher
│   │       └── WhatsAppButton.js   ← WhatsApp contact button
│   ├── context/
│   │   ├── LanguageContext.js    ← Multi-language state
│   │   └── AuthContext.js        ← Admin login state
│   ├── lib/
│   │   ├── firebase.js           ← Firebase initialization
│   │   └── products.js           ← Database CRUD operations
│   ├── pages/
│   │   ├── index.js              ← Homepage (/)
│   │   ├── _app.js               ← App wrapper
│   │   ├── _document.js          ← HTML document
│   │   ├── products/
│   │   │   ├── index.js          ← All products (/products)
│   │   │   └── [id].js           ← Product detail (/products/ID)
│   │   └── admin/
│   │       ├── login.js          ← Admin login (/admin/login)
│   │       ├── index.js          ← Admin dashboard (/admin)
│   │       └── products/
│   │           ├── index.js      ← Manage products
│   │           ├── add.js        ← Add product
│   │           └── edit/[id].js  ← Edit product
│   └── styles/
│       └── globals.css           ← Global styles + Tailwind
├── locales/
│   ├── en.js                     ← English translations
│   ├── ta.js                     ← Tamil translations
│   └── hi.js                     ← Hindi translations
├── public/
│   ├── manifest.json             ← PWA manifest
│   └── images/                   ← Static images
├── .env.local.example            ← Template for environment variables
├── next.config.js                ← Next.js configuration
├── tailwind.config.js            ← Tailwind CSS configuration
└── package.json                  ← Project dependencies
```

---

## Support

For technical help, share this documentation with a developer. All code is in the `krt-workshop` folder on your Desktop.

**Website**: KRT Workshop & Traders, Ariyalur
**Contact**: 8825515488 / 9965634061
