export const defaults={q:'',purpose:'',propertyType:'',location:'',developer:'',minPrice:'',maxPrice:'',budget:'',bedrooms:'',status:''};

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
  if (filters.budget) {
    if (filters.budget === '<1M' || filters.budget.toLowerCase().includes('less')) {
      filters.maxPrice = '1000000';
    } else if (filters.budget === '1-2M' || filters.budget.includes('1–2') || filters.budget.includes('1-2')) {
      filters.minPrice = '1000000';
      filters.maxPrice = '2000000';
    } else if (filters.budget === '2-4M' || filters.budget.includes('2–4') || filters.budget.includes('2-4')) {
      filters.minPrice = '2000000';
      filters.maxPrice = '4000000';
    } else if (filters.budget === '4-8M' || filters.budget.includes('4–8') || filters.budget.includes('4-8')) {
      filters.minPrice = '4000000';
      filters.maxPrice = '8000000';
    } else if (filters.budget === '8M+' || filters.budget.includes('8+')) {
      filters.minPrice = '8000000';
    }
  } else {
    if (filters.maxPrice === '1000000' && !filters.minPrice) filters.budget = 'Less than 1M';
    else if (filters.minPrice === '1000000' && filters.maxPrice === '2000000') filters.budget = '1–2M';
    else if (filters.minPrice === '2000000' && filters.maxPrice === '4000000') filters.budget = '2–4M';
    else if (filters.minPrice === '4000000' && filters.maxPrice === '8000000') filters.budget = '4–8M';
    else if (filters.minPrice === '8000000' && !filters.maxPrice) filters.budget = '8+M';
  }
  if (filters.type) {
    const t = filters.type.toLowerCase();
    if (t.includes('apart')) filters.propertyType = 'Apartment';
    else if (t.includes('town')) filters.propertyType = 'Townhouse';
    else if (t.includes('villa')) filters.propertyType = 'Villa';
    else if (t.includes('mans')) filters.propertyType = 'Mansion';
    else if (t.includes('comm')) filters.propertyType = 'Commercial';
  }
  return filters;
}

export function filterListings(items, filters = {}, sort = 'featured', tab = 'All') {
  const norm = normalizeFilters(filters);
  return items.filter(p => {
    if (tab !== 'All') {
      const tabLower = tab.toLowerCase();
      const matchesTag = p.tags?.some(t => t.toLowerCase() === tabLower);
      const matchesStatus = (tabLower === 'ready' && (p.status === 'Ready' || p.ready)) ||
                            ((tabLower === 'off plan' || tabLower === 'off-plan') && (p.status === 'Off-Plan' || p.offPlan));
      const matchesCommercial = tabLower === 'commercial' && (
        p.propertyType?.toLowerCase() === 'commercial' ||
        p.tags?.some(t => t.toLowerCase() === 'commercial') ||
        p.status?.toLowerCase() === 'commercial'
      );
      const matchesLifestyle = p.lifestyle && p.lifestyle.toLowerCase() === tabLower;
      const matchesBranded = tabLower.includes('brand') && (p.tags?.some(t => t.toLowerCase().includes('brand')) || p.propertyType === 'Branded Residence');
      if (!matchesTag && !matchesStatus && !matchesCommercial && !matchesLifestyle && !matchesBranded) return false;
    }
    if (norm.q && !`${p.title} ${p.location} ${p.developer}`.toLowerCase().includes(norm.q.toLowerCase())) return false;
    if (norm.developer && !p.developer?.toLowerCase().includes(norm.developer.toLowerCase())) return false;
    for (const key of ['purpose', 'propertyType']) {
      if (norm[key] && p[key]?.toLowerCase() !== norm[key]?.toLowerCase()) return false;
    }
    if (tab === 'All' && norm.status && p.status?.toLowerCase() !== norm.status.toLowerCase()) return false;
    if (norm.location) {
      const nLoc = norm.location.toLowerCase().trim();
      const pLoc = (p.location || '').toLowerCase().trim();
      if (!pLoc.includes(nLoc) && !nLoc.includes(pLoc)) return false;
    }
    if (norm.bedrooms !== undefined && norm.bedrooms !== '') {
      const b = String(norm.bedrooms).trim().toLowerCase();
      if (b === 'studio' || b === '0') {
        if (p.bedrooms !== 0) return false;
      } else if (b === '5+') {
        if (p.bedrooms < 5) return false;
      } else {
        if (p.bedrooms !== Number(norm.bedrooms)) return false;
      }
    }
    if (norm.minPrice && p.price < Number(norm.minPrice)) return false;
    if (norm.maxPrice && p.price > Number(norm.maxPrice)) return false;
    return true;
  }).sort((a, b) => 
    sort === 'price-asc' ? a.price - b.price : 
    sort === 'price-desc' ? b.price - a.price : 
    sort === 'area-desc' ? b.area - a.area : 
    sort === 'latest' ? (b.id || '').localeCompare(a.id || '', undefined, { numeric: true }) :
    Number(b.featured) - Number(a.featured)
  );
}
