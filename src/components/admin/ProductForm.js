import { useState, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '../../context/LanguageContext';
import { CATEGORIES } from '../../lib/products';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ProductForm({ initialData = {}, onSubmit, submitting }) {
  const { t } = useLang();

  const [name, setName] = useState(initialData.name || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [status, setStatus] = useState(initialData.status || 'available');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData.imageUrl || null);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = t.admin.required;
    if (!price || isNaN(price) || Number(price) < 0) e.price = 'Enter a valid price';
    if (!category) e.category = t.admin.required;
    return e;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert('Image must be smaller than 5MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > MAX_FILE_SIZE) {
        alert('Image must be smaller than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    onSubmit(
      {
        name: name.trim(),
        price: Number(price),
        category,
        description: description.trim(),
        status,
        imageUrl: initialData.imageUrl || '',
        imagePath: initialData.imagePath || '',
      },
      imageFile
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div>
        <label htmlFor="name" className="label">{t.admin.productName} *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Mahindra Tractor Air Filter"
          className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-300' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Price and Category — side by side on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="label">{t.admin.productPrice} *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
            <input
              id="price"
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className={`input-field pl-7 ${errors.price ? 'border-red-400 focus:ring-red-300' : ''}`}
            />
          </div>
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="category" className="label">{t.admin.productCategory} *</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`input-field ${errors.category ? 'border-red-400 focus:ring-red-300' : ''}`}
          >
            <option value="">Select category...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {t.categories[cat.labelKey]}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="label">{t.admin.productDescription}</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Describe the product, its condition, specifications..."
          className="input-field resize-none"
        />
      </div>

      {/* Status */}
      <div>
        <label className="label">{t.admin.productStatus}</label>
        <div className="flex gap-3">
          {['available', 'sold'].map((s) => (
            <label
              key={s}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                status === s
                  ? s === 'available'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-400 bg-red-50 text-red-600'
                  : 'border-gray-200 hover:border-gray-300 text-gray-500'
              }`}
            >
              <input
                type="radio"
                name="status"
                value={s}
                checked={status === s}
                onChange={() => setStatus(s)}
                className="sr-only"
              />
              <span>{s === 'available' ? '✅' : '❌'}</span>
              <span className="font-semibold text-sm capitalize">
                {s === 'available' ? t.admin.available : t.admin.sold}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="label">{t.admin.productImage}</label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 hover:border-primary-400 rounded-2xl p-6 text-center cursor-pointer transition-colors group"
        >
          {imagePreview ? (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-xl object-contain"
              />
              <div className="mt-3 text-xs text-gray-400 group-hover:text-primary-600 transition-colors">
                Click to change image
              </div>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-3">🖼️</div>
              <div className="text-sm font-semibold text-gray-600 group-hover:text-primary-600 transition-colors">
                {t.admin.imageUpload}
              </div>
              <div className="text-xs text-gray-400 mt-1">{t.admin.imageUploadHint}</div>
              <div className="text-xs text-gray-400 mt-1">or drag and drop</div>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-sm sm:text-base"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t.admin.saving}
            </>
          ) : (
            `💾 ${t.admin.save}`
          )}
        </button>
      </div>
    </form>
  );
}
