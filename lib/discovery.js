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
    const b = filters.budget.toLowerCase().trim();
    if (filters.budget === '<1M' || b.includes('under') || b.includes('less')) {
      filters.maxPrice = '1000000';
      filters.budget = 'Under AED 1M';
    } else if (filters.budget === '1M-3M' || b.includes('1m to 3m') || b.includes('1-3') || b.includes('1–3')) {
      filters.minPrice = '1000000';
      filters.maxPrice = '3000000';
      filters.budget = 'AED 1M to 3M';
    } else if (filters.budget === '3M-5M' || b.includes('3m to 5m') || b.includes('3-5') || b.includes('3–5')) {
      filters.minPrice = '3000000';
      filters.maxPrice = '5000000';
      filters.budget = 'AED 3M to 5M';
    } else if (filters.budget === '5M+' || b.includes('above') || b.includes('5m+') || b.includes('5+')) {
      filters.minPrice = '5000000';
      filters.budget = 'Above AED 5M';
    } else if (filters.budget === '1-2M' || b.includes('1–2') || b.includes('1-2') || filters.budget === '2-4M' || b.includes('2–4') || b.includes('2-4')) {
      filters.minPrice = '1000000';
      filters.maxPrice = '3000000';
      filters.budget = 'AED 1M to 3M';
    } else if (filters.budget === '4-8M' || b.includes('4–8') || b.includes('4-8')) {
      filters.minPrice = '3000000';
      filters.maxPrice = '5000000';
      filters.budget = 'AED 3M to 5M';
    } else if (filters.budget === '8M+' || b.includes('8+')) {
      filters.minPrice = '5000000';
      filters.budget = 'Above AED 5M';
    }
  } else {
    if (filters.maxPrice === '1000000' && !filters.minPrice) filters.budget = 'Under AED 1M';
    else if (filters.minPrice === '1000000' && filters.maxPrice === '3000000') filters.budget = 'AED 1M to 3M';
    else if (filters.minPrice === '3000000' && filters.maxPrice === '5000000') filters.budget = 'AED 3M to 5M';
    else if (filters.minPrice === '5000000' && !filters.maxPrice) filters.budget = 'Above AED 5M';
    else if (filters.minPrice === '1000000' && filters.maxPrice === '2000000') filters.budget = 'AED 1M to 3M';
    else if (filters.minPrice === '2000000' && filters.maxPrice === '4000000') filters.budget = 'AED 1M to 3M';
    else if (filters.minPrice === '4000000' && filters.maxPrice === '8000000') filters.budget = 'AED 3M to 5M';
    else if (filters.minPrice === '8000000' && !filters.maxPrice) filters.budget = 'Above AED 5M';
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
