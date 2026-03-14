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
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from './firebase';

export const CATEGORIES = [
  { id: 'tractor-parts', labelKey: 'tractorParts', icon: '🚜' },
  { id: 'agri-tools',    labelKey: 'agriTools',    icon: '🌾' },
  { id: 'welding',       labelKey: 'weldingMaterials', icon: '🔥' },
  { id: 'engine-oils',   labelKey: 'engineOils',   icon: '🛢️' },
  { id: 'belts',         labelKey: 'belts',         icon: '⚙️' },
  { id: 'welding-svc',   labelKey: 'welding',       icon: '🔧' },
];

const PRODUCTS_COLLECTION = 'products';

// ─── READ ──────────────────────────────────────────────────────────────────────

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
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

// ─── CREATE ────────────────────────────────────────────────────────────────────

export async function addProduct(productData, imageFile) {
  let imageUrl = '';
  let imagePath = '';

  if (imageFile) {
    const result = await uploadProductImage(imageFile);
    imageUrl = result.url;
    imagePath = result.path;
  }

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...productData,
    imageUrl,
    imagePath,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

// ─── UPDATE ────────────────────────────────────────────────────────────────────

export async function updateProduct(id, productData, imageFile, oldImagePath) {
  let imageUrl = productData.imageUrl || '';
  let imagePath = productData.imagePath || '';

  if (imageFile) {
    // Delete old image if present
    if (oldImagePath) {
      try {
        await deleteObject(ref(storage, oldImagePath));
      } catch (_) { /* file may not exist */ }
    }
    const result = await uploadProductImage(imageFile);
    imageUrl = result.url;
    imagePath = result.path;
  }

  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...productData,
    imageUrl,
    imagePath,
    updatedAt: serverTimestamp(),
  });
}

// ─── DELETE ────────────────────────────────────────────────────────────────────

export async function deleteProduct(id, imagePath) {
  if (imagePath) {
    try {
      await deleteObject(ref(storage, imagePath));
    } catch (_) { /* ignore */ }
  }
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

async function uploadProductImage(file) {
  const ext = file.name.split('.').pop();
  const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(storage, path);

  await new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file);
    task.on('state_changed', null, reject, resolve);
  });

  const url = await getDownloadURL(storageRef);
  return { url, path };
}
