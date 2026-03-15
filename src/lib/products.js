import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ── Categories ────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: 'tractor-parts',     labelKey: 'tractorParts',     icon: '🚜' },
  { id: 'agri-tools',        labelKey: 'agriTools',        icon: '🌾' },
  { id: 'welding-materials', labelKey: 'weldingMaterials', icon: '⚡' },
  { id: 'engine-oils',       labelKey: 'engineOils',       icon: '🛢️' },
  { id: 'belts',             labelKey: 'belts',            icon: '⚙️' },
  { id: 'welding-services',  labelKey: 'welding',          icon: '🔥' },
];

const PRODUCTS_COLLECTION = 'products';

// ── Cloudinary upload (via secure API route) ──────────────────────────────────
async function uploadImageToCloudinary(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const base64 = e.target.result;
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Upload failed');
        resolve({ url: data.url, publicId: data.publicId });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(imageFile);
  });
}

// ── READ ─────────────────────────────────────────────────────────────────────

export async function getAllProducts() {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getFeaturedProducts(count = 6) {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where('status', '==', 'available'),
    orderBy('createdAt', 'desc'),
    limit(count)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductsByCategory(categoryId) {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where('category', '==', categoryId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  return null;
}

// ── CREATE ───────────────────────────────────────────────────────────────────

export async function addProduct(productData, imageFile) {
  let imageUrl = '';
  let imagePublicId = '';

  if (imageFile) {
    const result = await uploadImageToCloudinary(imageFile);
    imageUrl = result.url;
    imagePublicId = result.publicId;
  }

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...productData,
    imageUrl,
    imagePublicId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

// ── UPDATE ───────────────────────────────────────────────────────────────────

export async function updateProduct(id, productData, imageFile) {
  let imageUrl = productData.imageUrl || '';
  let imagePublicId = productData.imagePublicId || '';

  if (imageFile) {
    const result = await uploadImageToCloudinary(imageFile);
    imageUrl = result.url;
    imagePublicId = result.publicId;
  }

  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...productData,
    imageUrl,
    imagePublicId,
    updatedAt: serverTimestamp(),
  });
}

// ── DELETE ───────────────────────────────────────────────────────────────────

export async function deleteProduct(id) {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}
