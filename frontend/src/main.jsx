import React,{lazy,Suspense,useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {fetchCatalog,fetchProduct,fetchCompany,fetchContent} from './api';
import {Header,Footer,Dock} from './layouts/Shell';
import {resolve,metadata} from './app/routes';
import './styles/site.css';
const Home=lazy(()=>import('./features/business/Home'));
const Business=key=>lazy(()=>import('./features/business/Pages').then(m=>({default:m[key]})));
const Listing=Business('Listing'),Editorial=Business('Editorial'),Project=Business('Project'),Privacy=Business('Privacy');
const Catalog=lazy(()=>import('./Catalog'));
const Detail=lazy(()=>import('./pages/Detail'));
const Enquiry=lazy(()=>import('./features/contact/EnquiryPage'));
const params=new URLSearchParams(location.search);
function Site({content,company,data,p}){
 const r=resolve(location.pathname,content,data,p,params);
 useEffect(()=>{metadata(r)},[]);
 const contact=company.contact;
 let body;
 switch(r.view){
 case 'home':body=<Home content={content} contact={contact}/>;break;
 case 'list':body=<Listing {...r}/>;break;
 case 'editorial':body=<Editorial {...r}/>;break;
 case 'project':body=<Project project={r.page}/>;break;
 case 'catalog':body=<Catalog data={data} params={params}/>;break;
 case 'detail':body=<Detail p={p} contact={contact} related={data.products.filter(v=>v.category_id===p.category_id&&v.product_id!==p.product_id).slice(0,3)}/>;break;
 case 'contact':body=<Enquiry contact={contact} initialDescription={params.get('service')||''}/>;break;
 case 'privacy':body=<Privacy contact={contact}/>;break;
 default:body=<main className="shell block"><h1>Page introuvable</h1><a href="/">Retour à l’accueil</a></main>
 }
 return <><a className="skip" href="#route-content">Aller au contenu</a><Header content={content}/><div id="route-content" tabIndex="-1"><Suspense fallback={<p className="shell block" role="status">Chargement…</p>}>{body}</Suspense></div><Footer contact={contact} content={content}/><Dock contact={contact} product={p}/></>
}
function App(){const [values,setValues]=useState(null),[error,setError]=useState('');
 useEffect(()=>{const product=location.pathname==='/produit.html',catalog=product||['/categorie.html','/catalogue.html'].includes(location.pathname);
 Promise.all([fetchContent(),fetchCompany(),catalog?fetchCatalog():null,product?fetchProduct(params.get('id')||'missing'):null]).then(setValues).catch(e=>setError(e.message));},[]);
 if(error)return <main className="shell block" role="alert"><h1>{error}</h1><button onClick={()=>location.reload()}>Réessayer</button> · <a href="/">Accueil</a></main>;
 return values?<Site content={values[0]} company={values[1]} data={values[2]} p={values[3]}/>:<p className="shell block" role="status">Chargement…</p>;
}
createRoot(document.getElementById('root')).render(<App/>);
