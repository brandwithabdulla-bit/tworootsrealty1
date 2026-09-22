'use client';
import {useState,useEffect,useRef,useId,useTransition} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {defaults,filterListings} from '@/lib/discovery';
import {developers} from '@/data/developers';
import {locations} from '@/data/locations';
import {PropertyGrid,LocationCard,BlogCard,DemoNote,ArrowUpRight} from './ui';
import {countryCodes} from '@/data/countries';
import {locationDatabase, budgetOptions, propertyTypeOrder} from '@/data/locations-database';
import {ProjectsFilterBox} from './ProjectsFilterBox';
export function Modal({open,onClose,title,children,className=''}){const ref=useRef(null);const id=useId();useEffect(()=>{if(open){ref.current?.showModal();document.body.style.overflow='hidden';}else{ref.current?.close();document.body.style.overflow='';}return()=>{document.body.style.overflow='';};},[open]);return <dialog ref={ref} className={className} aria-labelledby={id} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div className="modal-top"><h2 id={id}>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close dialog">×</button></div>{children}</dialog>}
const options={purpose:['Buy','Rent','Invest'],propertyType:propertyTypeOrder,location:locations.map(x=>x.name),developer:developers.map(x=>x.name),bedrooms:['Studio','1','2','3','4','5','5+'],status:['Ready','Off-Plan']};
const labels={purpose:'Purpose',propertyType:'Property type',location:'Location',budget:'Budget',developer:'Developer',bedrooms:'Bedrooms',status:'Status'};
function FilterFields({filters,setFilters,compact=false}){
  return (
    <div className={`filter-fields ${compact?'compact':''}`}>
      <label className="search-field">
        Search by name or area
        <input name="q" value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})} placeholder="A place to begin…"/>
      </label>
      {Object.keys(options).map(key=>(
        <label key={key}>
          {labels[key]}
          <select name={key} value={filters[key]} onChange={e=>setFilters({...filters,[key]:e.target.value})}>
            <option value="">Any {labels[key].toLowerCase()}</option>
            {options[key].map(value=><option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      ))}
      <label>
        Budget
        <select
          name="budget"
          value={filters.budget || ''}
          onChange={e => {
            const val = e.target.value;
            const matched = budgetOptions.find(b => b.label === val || b.value === val);
            setFilters({
              ...filters,
              budget: val,
              minPrice: matched ? matched.minPrice : '',
              maxPrice: matched ? matched.maxPrice : ''
            });
          }}
        >
          <option value="">Any budget</option>
          {budgetOptions.map(b => (
            <option key={b.value} value={b.label}>{b.label}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
export function SearchLoading(){return <div className="search-loading" role="status" aria-live="polite"><p>Looking for the best projects…</p><div className="search-loading-line" aria-hidden="true"><span/></div></div>}
export function LocationAutocomplete({value, onChange, placeholder = 'Where do you see yourself?'}){
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || '');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const hasQuery = query.trim().length > 0;
  const filtered = !hasQuery
    ? []
    : locationDatabase.filter(loc => {
        const q = query.toLowerCase().trim();
        return loc.name.toLowerCase().includes(q) ||
               loc.type.toLowerCase().includes(q) ||
               loc.city.toLowerCase().includes(q);
      }).sort((a, b) => {
        const q = query.toLowerCase().trim();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        const aExact = aName === q;
        const bExact = bName === q;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        const aStarts = aName.startsWith(q);
        const bStarts = bName.startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return 0;
      }).slice(0, 8);

  function handleSelect(loc) {
    const name = typeof loc === 'string' ? loc : loc.name;
    setQuery(name);
    onChange(name);
    setOpen(false);
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setOpen(val.trim().length > 0);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e) {
    if (!open) {
      if ((e.key === 'ArrowDown' || e.key === 'Enter') && hasQuery) {
        setOpen(true);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
        e.preventDefault();
        handleSelect(filtered[highlightedIndex]);
      } else if (filtered.length > 0 && query.trim() !== '') {
        e.preventDefault();
        handleSelect(filtered[0]);
      } else if (query.trim() !== '') {
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="location-autocomplete-wrap" ref={wrapRef}>
      <div className="location-input-row">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => { if (query.trim()) setOpen(true); }}
          onClick={() => { if (query.trim()) setOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-expanded={open && hasQuery}
          autoComplete="off"
          className="location-input"
        />
        {query && (
          <button
            type="button"
            className="location-clear-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuery('');
              onChange('');
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear location"
          >
            ×
          </button>
        )}
      </div>
      {open && hasQuery && (
        <div className="location-suggestions-dropdown" role="listbox">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div
                key={item.name}
                role="option"
                aria-selected={highlightedIndex === idx}
                className={`location-suggestion-item ${highlightedIndex === idx ? 'highlighted' : ''}`}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(item);
                }}
                onClick={() => handleSelect(item)}
              >
                <span className="location-name">{item.name}</span>
                <span className="location-area">{item.city || item.type}</span>
              </div>
            ))
          ) : (
            <div
              className="location-empty-notice"
              onMouseDown={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
              onClick={() => setOpen(false)}
            >
              <span>No matching locations for &ldquo;{query}&rdquo;</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function PropertySearch(){
  const [filters, setFilters] = useState({...defaults});
  const [advanced, setAdvanced] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleBudgetChange(val) {
    const matched = budgetOptions.find(b => b.label === val || b.value === val);
    setFilters({
      ...filters,
      budget: val,
      minPrice: matched ? matched.minPrice : '',
      maxPrice: matched ? matched.maxPrice : ''
    });
  }

  return (
    <section className="search-wrap container" id="property-search">
      {pending && <SearchLoading/>}
      <form
        className="search-box"
        aria-busy={pending}
        onSubmit={e => {
          e.preventDefault();
          const query = new URLSearchParams(
            Object.entries(filters).filter(([,v]) => v !== '')
          );
          startTransition(async () => {
            await new Promise(r => setTimeout(r, 800));
            router.push(`/projects?${query}`);
          });
        }}
      >
        <div className="search-heading">
          <div>
            <p className="eyebrow">A considered collection</p>
            <h2>Find your next project.</h2>
          </div>
          <div className="tabs" aria-label="Project status">
            {['All projects', 'Off-Plan', 'Ready'].map(p => (
              <button
                key={p}
                type="button"
                aria-pressed={filters.status === (p === 'All projects' ? '' : p)}
                onClick={() => setFilters({...filters, status: p === 'All projects' ? '' : p})}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="quick-search">
          <label className="search-col-location">
            Location
            <LocationAutocomplete
              value={filters.location}
              onChange={val => setFilters({...filters, location: val})}
              placeholder="Where do you see yourself?"
            />
          </label>

          <label className="search-col-type">
            Property type
            <select
              value={filters.propertyType}
              onChange={e => setFilters({...filters, propertyType: e.target.value})}
            >
              <option value="">Any property type</option>
              {propertyTypeOrder.map(x => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
          </label>

          <label className="search-col-budget">
            Budget
            <select
              value={filters.budget}
              onChange={e => handleBudgetChange(e.target.value)}
            >
              <option value="">Any budget</option>
              {budgetOptions.map(b => (
                <option key={b.value} value={b.label}>{b.label}</option>
              ))}
            </select>
          </label>

          <button className="button search-submit-btn" type="submit" disabled={pending}>
            <span>Explore Projects</span> <ArrowUpRight size={14}/>
          </button>
        </div>

        <div className="search-bottom">
          <span>Location. Lifestyle. Long-term perspective.</span>
          <button
            type="button"
            className="text-link filter-toggle"
            aria-expanded={advanced}
            onClick={() => setAdvanced(!advanced)}
          >
            {advanced ? '− Fewer filters' : '+ More filters'}
          </button>
        </div>

        {advanced && (
          <div className="advanced">
            <label>
              Developer
              <select
                value={filters.developer}
                onChange={e => setFilters({...filters, developer: e.target.value})}
              >
                <option value="">Any developer</option>
                {options.developer.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </label>
            <label>
              Bedrooms
              <select
                value={filters.bedrooms}
                onChange={e => setFilters({...filters, bedrooms: e.target.value})}
              >
                <option value="">Any bedrooms</option>
                {options.bedrooms.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </label>
            <label>
              Purpose
              <select
                value={filters.purpose}
                onChange={e => setFilters({...filters, purpose: e.target.value})}
              >
                <option value="">Any purpose</option>
                {options.purpose.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>
            <label>
              Keywords
              <input
                value={filters.q}
                onChange={e => setFilters({...filters, q: e.target.value})}
                placeholder="e.g. Garden, Waterfront, Golf"
              />
            </label>
          </div>
        )}
      </form>
    </section>
  );
}
export function Discovery({items,kind='properties',initialFilters={}}){
  const getInitialTab=(raw)=>{
    const s=(raw?.status||raw?.category||raw?.tab||raw?.lifestyle||'').toLowerCase();
    if(s.includes('ready')) return 'Ready';
    if(s.includes('off')) return 'Off Plan';
    if(s.includes('comm')) return 'Commercial';
    if(raw?.filter==='new') return 'Off Plan';
    return 'All';
  };

  const[filters,setFiltersState]=useState({...defaults,...initialFilters});
  const[sort,setSort]=useState('featured');
  const[tab,setTab]=useState(getInitialTab(initialFilters));
  const[limit,setLimit]=useState(9);
  const[drawer,setDrawer]=useState(false);
  const results=filterListings(items,filters,sort,tab);

  function setFilters(value){
    setFiltersState(value);
    setLimit(9);
  }

  function reset(){
    setFilters({...defaults});
    setTab('All');
    setSort('featured');
    window.history.replaceState(null,'',`/${kind}`);
  }

  useEffect(()=>{
    setFiltersState({...defaults,...initialFilters});
    setTab(getInitialTab(initialFilters));
    setLimit(9);
  },[initialFilters]);

  useEffect(()=>{
    if(!navigator.modelContext)return;
    const tool={
      name:'search_demo_properties',
      description:'Search illustrative Two Roots property inventory; no live availability or transactions.',
      inputSchema:{type:'object',properties:{query:{type:'string'}}},
      execute:async({query=''})=>({
        content:[{type:'text',text:JSON.stringify(filterListings(items,{q:query}).map(({title,slug,priceLabel})=>({title,url:`/${kind}/${slug}`,priceLabel})))}]
      })
    };
    try{navigator.modelContext.registerTool(tool);}catch{}
    return()=>{try{navigator.modelContext.unregisterTool(tool.name);}catch{}};
  },[items,kind]);

  return (
    <section className="container section discovery">
      {kind==='projects'&&(
        <div className="tabs project-tabs" aria-label="Project status">
          {['All','Off Plan','Ready','Commercial'].map(x=>(
            <button
              key={x}
              aria-pressed={tab===x || (x==='Off Plan' && (tab==='Off Plan' || tab==='Off-Plan'))}
              onClick={()=>{
                setTab(x);
                setLimit(9);
                if(x==='All'){
                  setFiltersState(prev=>({...prev,status:''}));
                }
              }}
            >
              {x}
            </button>
          ))}
        </div>
      )}
      <div className="discovery-layout">
        <aside className={kind==='projects' ? 'desktop-filters projects-filter-sidebar' : 'desktop-filters'}>
          {kind==='projects' ? (
            <ProjectsFilterBox filters={filters} setFilters={setFilters} onReset={reset}/>
          ) : (
            <>
              <div className="filter-title">
                <h2>Refine your search</h2>
                <button className="text-link" onClick={reset}>Reset</button>
              </div>
              <FilterFields filters={filters} setFilters={setFilters}/>
            </>
          )}
        </aside>
        <div>
          <div className="results-bar">
            <p aria-live="polite">
              <strong>{results.length}</strong> {kind==='projects'?'projects':'properties'}
            </p>
            <button className="button mobile-filters" onClick={()=>setDrawer(true)}>Filters</button>
            <label>
              Sort by
              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="featured">Featured first</option>
                <option value="latest">Latest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>
          <DemoNote/>
          <PropertyGrid items={results.slice(0,limit)} kind={kind}/>
          {results.length===0&&(
            <div className="empty">
              <h2>No {kind} match your current filters.</h2>
              <p>Try a wider budget or explore a different area.</p>
              <button className="button" onClick={reset}>Reset Filters</button>
            </div>
          )}
          {results.length>limit&&(
            <div className="load-more">
              <button className="button secondary" onClick={()=>setLimit(limit+9)}>
                Load more ({results.length-limit} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal open={drawer} onClose={()=>setDrawer(false)} title="Refine your search" className="filter-dialog">
        {kind==='projects' ? (
          <ProjectsFilterBox filters={filters} setFilters={setFilters} onReset={reset}/>
        ) : (
          <FilterFields filters={filters} setFilters={setFilters}/>
        )}
        <div className="actions">
          <button className="button" onClick={()=>setDrawer(false)}>Show {results.length} results</button>
          <button className="text-link" onClick={reset}>Reset Filters</button>
        </div>
      </Modal>
    </section>
  );
}
export function ImageGallery({item}){const[index,setIndex]=useState(0);const[open,setOpen]=useState(false);const touch=useRef(0);function next(delta){setIndex(v=>(v+delta+item.gallery.length)%item.gallery.length);}return <div className="gallery"><button className="gallery-main" onClick={()=>setOpen(true)} aria-label={`Open gallery for ${item.title}`} onTouchStart={e=>touch.current=e.changedTouches[0].clientX} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-touch.current;if(Math.abs(d)>45)next(d>0?-1:1);}}><Image src={item.gallery[index]} fill priority sizes="100vw" alt={`${item.title}: illustrative photo ${index+1}`}/><span className="badge">View gallery · {index+1} / {item.gallery.length}</span></button><div className="gallery-thumbs">{item.gallery.map((src,i)=><button key={i} aria-label={`Show photo ${i+1}`} aria-pressed={i===index} onClick={()=>setIndex(i)}><Image src={src} fill sizes="25vw" alt={`Illustrative view ${i+1}`}/></button>)}</div><Modal open={open} onClose={()=>setOpen(false)} title={`${item.title} — gallery`} className="gallery-dialog"><div className="lightbox" onKeyDown={e=>{if(e.key==='ArrowRight')next(1);if(e.key==='ArrowLeft')next(-1);}} onTouchStart={e=>touch.current=e.changedTouches[0].clientX} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-touch.current;if(Math.abs(d)>45)next(d>0?-1:1);}}><Image src={item.gallery[index]} fill sizes="90vw" alt={`Illustrative photo ${index+1} of ${item.gallery.length}`}/></div><div className="gallery-controls"><button className="button secondary" onClick={()=>next(-1)}>← Previous</button><span aria-live="polite">{index+1} / {item.gallery.length}</span><button className="button secondary" onClick={()=>next(1)}>Next →</button></div><DemoNote>Representative stock photography, not photographs of this fictional property.</DemoNote></Modal></div>}
const baseFields=[['name','Name','text',true],['email','Email','email',true],['phone','Phone','tel',true]];
export function EnquiryForm({variant='quick',context='',submitLabel='Submit Enquiry'}){
  const [status,setStatus]=useState('idle');
  const [errors,setErrors]=useState({});
  const [countryCode,setCountryCode]=useState('+971');
  const [phoneNumber,setPhoneNumber]=useState('');
  const form=useRef();
  const id=useId();
  const extra=variant==='investor'
    ?[['nationality','Nationality'],['country','Country of residence'],['budget','Investment budget'],['location','Preferred location'],['propertyType','Property type'],['goal','Investment goal'],['contactMethod','Preferred contact method']]
    :variant==='referral'
    ?[['country','Country','text',true],['nationality','Nationality','text',true],['contactMethod','Preferred contact method']]
    :variant==='full'
    ?[['country','Country'],['nationality','Nationality'],['budget','Budget'],['location','Preferred location'],['propertyType','Property type'],['bedrooms','Bedrooms'],['contactMethod','Preferred contact method']]
    :variant==='career'
    ?[['role','Position of interest'],['portfolio','CV / portfolio link','url'],['country','Country']]
    :variant==='newsletter'
    ?[]
    :[['contactMethod','Preferred contact method']];
  const fields=variant==='newsletter'?[baseFields[1]]:[...baseFields,...extra];
  const selectOptions={
    location:locations.map(l=>l.name),
    propertyType:options.propertyType,
    budget:budgetOptions.map(b=>b.label),
    contactMethod:['Call','Email','WhatsApp'],
    goal:['Rental income','Long-term ownership','Future home','Portfolio diversification'],
    bedrooms:['Studio','1','2','3','4','5+']
  };

  async function submit(e){
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.currentTarget));
    const fullPhone = phoneNumber.trim() ? `${countryCode} ${phoneNumber.trim()}` : (data.phone?.trim() || '');
    data.phone = fullPhone;
    const issues={};
    fields.forEach(([key,label,type,required])=>{
      if(required){
        if(key==='phone'){
          if(!phoneNumber.trim()) issues.phone='Phone number is required.';
        } else if(!data[key]?.trim()){
          issues[key]=`${label} is required.`;
        }
      }
    });
    if(data.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))issues.email='Enter a valid email address.';
    if(fullPhone&&!/^\+?[\d\s().-]{7,25}$/.test(fullPhone))issues.phone='Enter a valid phone number.';
    if(!data.consent)issues.consent='Please acknowledge the demo privacy notice.';
    setErrors(issues);
    if(Object.keys(issues).length){
      if(issues.phone&&!issues.name&&!issues.email){
        form.current.elements['phoneNumber']?.focus();
      }else{
        form.current.elements[Object.keys(issues)[0]]?.focus();
      }
      return;
    }
    setStatus('loading');
    try{
      const response=await fetch('/api/enquiry',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...data,phone:fullPhone,countryCode,phoneNumber:phoneNumber.trim(),variant,context})
      });
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'Unable to validate your enquiry.');
      setStatus('success');
    }catch{
      setStatus('error');
    }
  }

  return (
    <form ref={form} noValidate className={`enquiry-form ${variant==='newsletter'?'newsletter-form':''}`} onSubmit={submit}>
      <p className="form-note">Demo form · details are validated but are not sent or saved. Please use test details.</p>
      {context&&<p className="context-note">Enquiry: <strong>{context}</strong></p>}
      <div className="form-grid">
        {fields.map(([key,label,type='text',required=false])=>{
          if(key==='phone'){
            return (
              <div key={key} className="phone-field-item">
                <label htmlFor={`${id}-phone`}>{label}{required?' *':''}</label>
                <div className="phone-input-group">
                  <select
                    id={`${id}-countryCode`}
                    name="countryCode"
                    value={countryCode}
                    onChange={e=>setCountryCode(e.target.value)}
                    className="phone-country-select"
                    aria-label="Country calling code"
                  >
                    {countryCodes.map(c=>(
                      <option key={`${c.code}-${c.country}`} value={c.code}>
                        {c.flag} {c.country} ({c.code})
                      </option>
                    ))}
                  </select>
                  <input
                    id={`${id}-phone`}
                    name="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={e=>{
                      setPhoneNumber(e.target.value);
                      if(errors.phone)setErrors(prev=>({...prev,phone:undefined}));
                    }}
                    placeholder="50 123 4567"
                    required={required}
                    autoComplete="tel-national"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone?`${id}-phone-error`:undefined}
                    className="phone-number-input"
                  />
                </div>
                <input type="hidden" name="phone" value={phoneNumber.trim()?`${countryCode} ${phoneNumber.trim()}`:''} />
                {errors.phone&&<span className="field-error" id={`${id}-phone-error`}>{errors.phone}</span>}
              </div>
            );
          }
          return (
            <label key={key} htmlFor={`${id}-${key}`}>
              {label}{required?' *':''}
              {selectOptions[key]?(
                <select id={`${id}-${key}`} name={key} aria-invalid={!!errors[key]}>
                  <option value="">Select an option</option>
                  {selectOptions[key].map(x=><option key={x} value={x}>{x}</option>)}
                </select>
              ):(
                <input
                  id={`${id}-${key}`}
                  name={key}
                  type={type}
                  required={required}
                  autoComplete={key==='name'?'name':key==='email'?'email':undefined}
                  aria-invalid={!!errors[key]}
                  aria-describedby={errors[key]?`${id}-${key}-error`:undefined}
                />
              )}
              {errors[key]&&<span className="field-error" id={`${id}-${key}-error`}>{errors[key]}</span>}
            </label>
          );
        })}
      </div>
      {variant!=='newsletter'&&<label>Message<textarea name="message" rows="3" maxLength="4000"/></label>}
      <label className="consent">
        <input type="checkbox" name="consent" aria-invalid={!!errors.consent}/>
        <span>I understand this is a demo form. See the <Link href="/privacy-policy">privacy notice</Link>.</span>
      </label>
      {errors.consent&&<p className="field-error">{errors.consent}</p>}
      <button className="button" disabled={status==='loading'}>
        <span>{status==='loading'?'Checking details…':submitLabel}</span> <ArrowUpRight size={14}/>
      </button>
      <div role="status" aria-live="polite">
        {status==='success'&&<p className="form-result">Demo complete: your details passed validation. Nothing was sent or saved, and no advisor has received this enquiry.</p>}
        {status==='error'&&<p className="form-result">The form could not be checked. Please try again; nothing has been sent.</p>}
      </div>
    </form>
  );
}

export function ContactTabs({initial='Quick enquiry',context=''}){
  const tabs=['Quick enquiry','Property requirement','Partnership / Referral'];
  const [tab,setTab]=useState(tabs.includes(initial)?initial:'Quick enquiry');
  return (
    <>
      <div className="tabs contact-tabs">
        {tabs.map(x=>(
          <button key={x} aria-pressed={tab===x} onClick={()=>setTab(x)}>{x}</button>
        ))}
      </div>
      <h2>{tab}</h2>
      <EnquiryForm
        key={tab}
        variant={tab==='Quick enquiry'?'quick':tab==='Partnership / Referral'?'referral':'full'}
        context={context||tab}
      />
    </>
  );
}
export function AreaDiscovery({items}){const[q,setQ]=useState('');const[category,setCategory]=useState('All');const results=items.filter(x=>x.name.toLowerCase().includes(q.toLowerCase())&&(category==='All'||x.category===category));return <section className="section container"><div className="directory-controls"><label>Search locations<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Find a neighbourhood"/></label><div className="tabs">{['All','Popular','Emerging','Investment'].map(x=><button key={x} aria-pressed={category===x} onClick={()=>setCategory(x)}>{x}</button>)}</div></div><p aria-live="polite">{results.length} locations</p><div className="locations-grid">{results.map(x=><LocationCard key={x.id} item={x}/>)}</div>{!results.length&&<div className="empty"><p>No locations match your search.</p><button onClick={()=>{setQ('');setCategory('All');}} className="button">Reset search</button></div>}</section>}
export function InsightsDiscovery({items,initialCategory='All'}){const getCategory=(cat)=>{if(!cat||cat.toLowerCase()==='all'||cat.toLowerCase()==='blogs')return 'All';const found=items.find(x=>x.category.toLowerCase()===cat.toLowerCase());return found?found.category:'All';};const[category,setCategory]=useState(getCategory(initialCategory));const[q,setQ]=useState('');useEffect(()=>{setCategory(getCategory(initialCategory));},[initialCategory]);const results=items.filter(x=>(category==='All'||x.category===category)&&x.title.toLowerCase().includes(q.toLowerCase()));return <section className="section container"><div className="directory-controls"><label>Search insights<input value={q} onChange={e=>setQ(e.target.value)}/></label><label>Category<select value={category} onChange={e=>setCategory(e.target.value)}>{['All',...new Set(items.map(x=>x.category))].map(x=><option key={x}>{x}</option>)}</select></label></div><div className="blog-grid">{results.map(x=><BlogCard key={x.id} item={x}/>)}</div>{!results.length&&<p className="empty">No articles match your search.</p>}</section>}
