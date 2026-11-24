import React, {useEffect,useRef} from "react";

// An architectural illustration, drawn in an axonometric projection. No project imagery.
function draw(canvas) {
  const w=720,h=500,ratio=Math.min(window.devicePixelRatio||1,2);
  canvas.width=w*ratio;canvas.height=h*ratio;
  const ctx=canvas.getContext("2d");ctx.scale(ratio,ratio);
  const project=([x,y,z])=>[304+(x-y)*1.29,269+(x+y)*.51-z*1.34];
  function face(vertices,fill,stroke="#c4dcff",width=.85){
    ctx.beginPath();vertices.map(project).forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    if(vertices.length>2)ctx.closePath();
    if(fill){ctx.fillStyle=fill;ctx.fill();}
    ctx.lineWidth=width;ctx.strokeStyle=stroke;ctx.stroke();
  }
  function box(x,y,z,l,d,t,colors){
    const X=x+l,Y=y+d,Z=z+t;
    face([[x,Y,z],[X,Y,z],[X,Y,Z],[x,Y,Z]],colors[0]);
    face([[X,y,z],[X,Y,z],[X,Y,Z],[X,y,Z]],colors[1]);
    face([[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]],colors[2]);
  }
  // Site grid and open construction axes.
  for(let i=-140;i<=300;i+=16){
    face([[i,-125,0],[i,205,0]],null,"#7b9cc04a",.6);
    face([[-130,i,0],[290,i,0]],null,"#7b9cc04a",.6);
  }
  const base=["#29496b","#193b60","#607f9a"],glass=["#41688a","#274b70","#8da8be"],slab=["#90aabe","#6888a4","#b8c9d5"];
  function block(x,y,l,d,levels){
    box(x-3,y-3,0,l+6,d+6,4,base);
    for(let floor=0;floor<levels;floor++){
      const z=4+floor*25;
      box(x,y,z,l,d,23,glass);
      for(let pos=2;pos<l-2;pos+=9){
        face([[x+pos,y+d,z+1],[x+pos,y+d,z+22]],null,"#cbdce5",1);
        face([[x+pos+1,y+d,z+1],[x+pos+1,y+d,z+22]],null,"#122f50",.8);
      }
      for(let pos=2;pos<d-2;pos+=9)face([[x+l,y+pos,z+1],[x+l,y+pos,z+22]],null,"#b9cfe0",.9);
      face([[x,y+d,z+12],[x+l,y+d,z+12]],null,"#cbdde8",.7);
      face([[x+l,y,z+12],[x+l,y+d,z+12]],null,"#d3dfea",.7);
      box(x-2,y-2,z+21,l+4,d+4,4,slab);
    }
    const roof=4+levels*25;
    face([[x+3,y+3,roof],[x+l-3,y+3,roof],[x+l-3,y+d-3,roof],[x+3,y+d-3,roof]],"#829fb6","#eff6ff",1);
    for(let p=8;p<l-5;p+=10)face([[x+p,y+4,roof],[x+p,y+d-4,roof]],null,"#b2c9d8",.55);
    box(x+9,y+8,roof,24,13,6,base);box(x+42,y+8,roof,13,13,5,base);
  }
  box(-14,-21,-3,229,136,4,base);
  block(2,-12,165,44,4);
  block(109,32,84,60,2);
  block(-4,35,98,50,2);
  box(64,85,0,5,25,22,base);box(97,85,0,5,25,22,base);
  box(57,82,22,54,33,3,slab);
  for(let i=0;i<4;i++)box(56,111+i*3,0,57,3,4-i,slab);
  // Fine extension lines locate the drawing on the sheet.
  ctx.setLineDash([4,5]);
  face([[0,-12,104],[0,-54,104]],null,"#c9def0",.8);
  face([[165,-12,104],[165,-54,104]],null,"#c9def0",.8);
  face([[0,-49,104],[165,-49,104]],null,"#c9def0",.8);
  ctx.setLineDash([]);
}
export default function BuildingStudy(){
  const ref=useRef(null);useEffect(()=>draw(ref.current),[]);
  return <figure className="study"><div className="drawing-grid" aria-hidden="true"/><div className="drawing-top"><span>PÔLE SANTÉ</span><span>VUE AXONOMÉTRIQUE</span></div><canvas ref={ref} aria-label="Illustration axonométrique d’un bâtiment de santé"/><figcaption><span className="caption-rule"/>Aménagement hospitalier <small>Schéma de principe</small></figcaption></figure>
}
