(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const m=document.getElementById("coords"),f=document.getElementById("coords-calc"),g=e=>{let o={};const n=new FormData(e);for(let r of n.keys())o[r]=n.get(r);return o},p=e=>{const o=e.target,n=g(e.target);if(console.log(n),!n["acepta-trat"]){e.preventDefault(),e.stopPropagation(),Swal.fire({icon:"error",title:"Debe aceptar la protección de datos"});return}o.checkValidity()||(e.preventDefault(),e.stopPropagation(),["alergias","apellidos","apellidos-madre","apellidos-padre","codpost","colegio","comentarios","curso-escolar","direccion","dni-madre","dni-padre","email","fecha-nacimiento","nombre","nombre-madre","nombre-padre","parroquia-bautizo","telefono-madre","telefono-padre"].forEach(s=>{if(!n[s]){Swal.fire({icon:"error",title:"Oops...",text:`El campo ${s} es obligatrio`,footer:'<a href="">Why do I have this issue?</a>'});return}})),o.classList.add("was-validated");const r=JSON.stringify(n);console.log(r)},h=document.getElementById("main-form");h.addEventListener("submit",p);const l=()=>{const e=document.getElementById("canvas");e.width_line=1,e.color="#000000",e.sign=!1,e.begin_sign=!1,e.cursorX=0,e.cursorY=0,e.getContext("2d").clearRect(0,0,e.width,e.height)};document.getElementById("reset").addEventListener("click",()=>{l()});const u=(e,o,n)=>{const r=e.getBoundingClientRect(),t=e.width/r.width,s=e.height/r.height;e.cursorX=Math.floor((o-r.left)*t*100)/100,e.cursorY=Math.floor((n-r.top)*s*100)/100},y=e=>{if(e){const o=e.getContext("2d");o&&(e.begin_sign?(o.lineTo(e.cursorX,e.cursorY),o.strokeStyle=e.color,o.lineWidth=e.width_line,o.stroke()):(o.beginPath(),o.moveTo(e.cursorX,e.cursorY),e.begin_sign=!0))}},c=({target:e,pageX:o,pageY:n})=>{e.sign=!0,u(e,o,n)},a=({target:e})=>{e.sign=!1,e.begin_sign=!1},d=({target:e,pageX:o,pageY:n})=>{m.innerText=`mm   x: ${o} y; ${n}`,u(e,o,n),f.innerText=`sign: ${e.sign} begin_sign: ${e.begin_sign}  x: ${e.cursorX} y; ${e.cursorY}`,e.sign&&y(e)},b=()=>{$("#bookingmodal").on("hidden.bs.modal",function(){const e=document.getElementById("canvas");e.removeEventListener("mousedown",c,!1),e.removeEventListener("mouseup",a,!1),e.removeEventListener("mousemove",d,!1);let o=document.getElementById("firmadoPadre");this.progenitor==="Madre"&&(o=document.getElementById("firmadoMadre"));const n=e.toDataURL();o.src=n,l(),e.sign=!1,e.begin_sign=!1,e.cursorX=0,e.cursorY=0}),$("#bookingmodal").on("show.bs.modal",function(e){const o=document.getElementById("canvas");o.width_line=1,o.color="#000000",o.sign=!1,o.begin_sign=!1,o.cursorX=0,o.cursorY=0;const n=o.getContext("2d"),r=e.relatedTarget;let t=document.getElementById("firmadoPadre");this.progenitor=r.getAttribute("data-bs-p"),this.progenitor==="Madre"&&(t=document.getElementById("firmadoMadre")),t.src&&n.drawImage(t,0,0),o.addEventListener("mousedown",c,!1),o.addEventListener("mouseup",a,!1),o.addEventListener("mousemove",d,!1)})};b();
