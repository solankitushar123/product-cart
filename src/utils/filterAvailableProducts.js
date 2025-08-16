// src/utils/filterAvailableProducts.js
export function filterAvailableProducts(data) {
  const { brands, categories, subCategories, segments, products } = data;

  const brandMap = new Map(brands.map((b) => [b._id, b]));
  const categoryMap = new Map(categories.map((c) => [c._id, c]));
  const subCategoryMap = new Map(subCategories.map((sc) => [sc._id, sc]));
  const segmentMap = new Map(segments.map((s) => [s._id, s]));

  return products.filter((prod) => {
    if (!prod.isAvailable) return false;

    const seg = segmentMap.get(prod.segment?._id);
    if (!seg || !seg.isAvailable) return false;

    const subC = subCategoryMap.get(prod.subCategory?._id);
    if (!subC || !subC.isAvailable) return false;

    const cat = categoryMap.get(prod.category?._id);
    if (!cat || !cat.isAvailable) return false;

    const brand = [...brandMap.values()].find((b) => b.isAvailable);
    if (!brand) return false;

    return true;
  });
}
