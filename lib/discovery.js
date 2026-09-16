export const defaults={q:'',purpose:'',propertyType:'',location:'',developer:'',minPrice:'',maxPrice:'',bedrooms:'',status:''};

export function normalizeFilters(raw = {}) {
  const filters = { ...raw };
  if (filters.status) {
    const s = filters.status.toLowerCase();
    if (s.includes('off')) filters.status = 'Off-Plan';
    else if (s.includes('ready')) filters.status = 'Ready';
  }
  if (filters.filter === 'new') {
    filters.status = 'Off-Plan';
  }
  if (filters.type) {
    const t = filters.type.toLowerCase();
    if (t.includes('apart')) filters.propertyType = 'Apartment';
    else if (t.includes('villa')) filters.propertyType = 'Villa';
    else if (t.includes('town')) filters.propertyType = 'Townhouse';
    else if (t.includes('pent')) filters.propertyType = 'Penthouse';
    else if (t.includes('brand')) filters.propertyType = 'Branded Residence';
    else if (t.includes('comm')) filters.propertyType = 'Commercial';
  }
  return filters;
}

export function filterListings(items, filters = {}, sort = 'featured', tab = 'All') {
  const norm = normalizeFilters(filters);
  return items.filter(p => {
    if (tab !== 'All' && !p.tags?.some(t => t.toLowerCase() === tab.toLowerCase())) return false;
    if (norm.q && !`${p.title} ${p.location} ${p.developer}`.toLowerCase().includes(norm.q.toLowerCase())) return false;
    for (const key of ['purpose', 'propertyType', 'location', 'developer', 'status']) {
      if (norm[key] && p[key]?.toLowerCase() !== norm[key]?.toLowerCase()) return false;
    }
    if (norm.bedrooms !== undefined && norm.bedrooms !== '' && p.bedrooms !== Number(norm.bedrooms)) return false;
    if (norm.minPrice && p.price < Number(norm.minPrice)) return false;
    if (norm.maxPrice && p.price > Number(norm.maxPrice)) return false;
    return true;
  }).sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'area-desc' ? b.area - a.area : Number(b.featured) - Number(a.featured));
}
