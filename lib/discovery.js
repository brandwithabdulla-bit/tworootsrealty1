export const defaults={q:'',purpose:'',propertyType:'',location:'',developer:'',minPrice:'',maxPrice:'',bedrooms:'',status:''};
export function filterListings(items,filters={},sort='featured',tab='All') { return items.filter(p=>{
if(tab!=='All'&&!p.tags?.includes(tab))return false;
if(filters.q&&!`${p.title} ${p.location} ${p.developer}`.toLowerCase().includes(filters.q.toLowerCase()))return false;
for(const key of ['purpose','propertyType','location','developer','status'])if(filters[key]&&p[key]!==filters[key])return false;
if(filters.bedrooms!==undefined&&filters.bedrooms!==''&&p.bedrooms!==Number(filters.bedrooms))return false;
if(filters.minPrice&&p.price<Number(filters.minPrice))return false;
if(filters.maxPrice&&p.price>Number(filters.maxPrice))return false;
return true;}).sort((a,b)=>sort==='price-asc'?a.price-b.price:sort==='price-desc'?b.price-a.price:sort==='area-desc'?b.area-a.area:Number(b.featured)-Number(a.featured)); }
