const aliases={'/index.html':'/','/apropos.html':'/a-propos','/services.html':'/expertises','/contact.html':'/contact','/diagnostic.html':'/contact','/blog.html':'/guides','/article-isolation-phonique.html':'/guides','/categorie.html':'/catalogue.html'};
export const normalizePath = path => path.replace(/\/+$/, '') || '/';
export function resolve(path,content,data,p,params){
 const clean=normalizePath(path);
 const target=aliases[clean]||clean;
 if(target==='/produit.html'&&!p)return {view:'missing',title:'Produit introuvable',summary:'Cette fiche produit est indisponible.',path:target};
 if(target.startsWith('/produits/')&&p)return {view:'detail',title:p.product_name,summary:p.short_description,path:target};
 const routes={
 '/':['home','Isolation & aménagement des environnements exigeants.','Exécution de salles médicales, acoustique, isolation et aménagement clé en main au Maroc.'],
 '/contact':['contact','Demander une visite technique','Présentez votre projet, sa ville, sa surface et son calendrier à notre équipe technique.'],
 '/catalogue.html':['catalog',data?.categories[params.get('cat')]?.title||'Catalogue de produits','Matériaux, caractéristiques techniques et documents pour votre projet.'],
 '/produit.html':['detail',p?.product_name,p?.short_description],
 '/confidentialite.html':['privacy','Confidentialité','Traitement des demandes et des documents techniques.'],
 };
 if(routes[target]){const [view,title,summary]=routes[target];return {view,title,summary,path:target==='/produit.html'&&p?'/produits/'+(p.slug||p.product_id):target+(['/produit.html','/catalogue.html'].includes(target)?location.search:'')};}
 for(const [base,key,label,summary] of [
 ['/expertises','services','Expertises','Trois spécialités techniques et un socle BTP commun pour livrer des environnements complets.'],
 ['/secteurs','sectors','Secteurs','Des solutions adaptées aux exploitants, donneurs d’ordre et prescripteurs.'],
 ['/guides','guides','Guides techniques','Des repères pour préparer votre consultation et votre visite de chantier.'],
 ['/realisations','projects','Réalisations','Dossiers de chantier et documents de référence ouverts à la communication.']]){
  if(target===base)return {view:'list',title:label,summary,items:content[key],base,path:target};
  if(target.startsWith(base+'/')){const item=content[key].find(x=>x.slug===target.slice(base.length+1));if(item)return {view:key==='projects'?'project':'editorial',type:label,page:item,title:item.title,summary:item.summary||item.context,base,path:target};}
 }
 for(const [url,key,label] of [['/methode','method','Méthode & qualité'],['/a-propos','about','À propos'],['/en','english','International suppliers']]){
  if(target===url){const page=content[key];return {view:'editorial',page,title:page.title,summary:page.summary,type:label,en:key==='english',path:url};}
 }
 return {view:'missing',title:'Page introuvable',summary:'Cette page est indisponible.',path:target};
}
export function metadata(route,contact={}){
 const title=route.title+' | ISOL SOLUTIONS';
 document.title=title;document.documentElement.lang=route.en?'en':'fr';
 const url=new URL(route.path,import.meta.env.VITE_PUBLIC_ORIGIN||location.origin);
 const set=(selector,attr,key,value)=>{
   let el=document.head.querySelector(selector);if(!el){el=document.createElement('meta');el.setAttribute(attr,key);document.head.append(el);}el.content=value;
 };
 set('meta[name="description"]','name','description',route.summary||route.title);
 for(const [key,value] of Object.entries({title,description:route.summary||route.title,url:url.href,type:route.base==='/guides'?'article':'website',locale:route.en?'en_US':'fr_MA',site_name:'ISOL SOLUTIONS',image:new URL('/assets/images/site-logo.png',url).href}))set('meta[property="og:'+key+'"]','property','og:'+key,value);
 let canonical=document.querySelector('link[rel=canonical]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical);}canonical.href=url.href;
 const home=route.view==='home';const ld=document.createElement('script');ld.type='application/ld+json';ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':home?'Organization':route.base==='/guides'&&route.page?'Article':'WebPage',name:home?'ISOL SOLUTIONS':route.title,url:url.href,description:route.summary,...(home?{logo:new URL('/assets/images/site-logo.png',url).href,telephone:contact.whatsapp?`+${contact.whatsapp}`:undefined,email:contact.email,address:{'@type':'PostalAddress',addressLocality:'Casablanca',addressCountry:'MA'}}:{})});document.head.append(ld);
}
