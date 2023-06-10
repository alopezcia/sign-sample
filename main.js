import './style.css'

const span = document.getElementById('coords');
const spanC = document.getElementById('coords-calc');

const serializeForm = ( form ) => {
  let obj = {}
  const formData = new FormData( form );
  for( let key of formData.keys() ) {
        obj[key]=formData.get(key);
  }
  return obj;
};

const mainFormSubmitted =  (event) => {
  // console.log( event  );
  const form = event.target;
  const serialized = serializeForm(event.target);
  console.log(serialized);

  // Validaciones del formulario 
  // 1º Aceptar protección de datos
  if( !serialized['acepta-trat'] ){
    event.preventDefault();
    event.stopPropagation();
    Swal.fire({
      icon: 'error',
      title: 'Debe aceptar la protección de datos',
    })
    return;
  }

  // 2º Chequear datos requeridos
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    let campoErroneo = '';
    const campos=[ 
    'alergias',
    'apellidos',
    'apellidos-madre',
    'apellidos-padre',
    'codpost',
    'colegio',
    'comentarios',
    'curso-escolar',
    'direccion',
    'dni-madre',
    'dni-padre',
    'email',
    'fecha-nacimiento',
    'nombre',
    'nombre-madre',
    'nombre-padre',
    'parroquia-bautizo',
    'telefono-madre',
    'telefono-padre',
    ];

    campos.forEach(element => {
      if( !serialized[element] ){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `El campo ${element} es obligatrio`,
          footer: '<a href="">Why do I have this issue?</a>'
        })
        return;
      }
    });
        
    // $('.invalid-feedback').css('display', 'block');
  }
  form.classList.add('was-validated')
  const json = JSON.stringify( serialized );
  console.log(json);
};

const logSubmit = (event) => {
  console.log( `Form Submitted! Timestamp: ${event.timeStamp}` );
  event.preventDefault();
};

const form = document.getElementById("main-form");
form.addEventListener("submit", mainFormSubmitted);

const resetCanvas = () => {
  const canvas = document.getElementById('canvas');
  canvas.width_line = 1;
  canvas.color = "#000000";
  canvas.sign = false;
  canvas.begin_sign = false;
  canvas.cursorX = 0;
  canvas.cursorY = 0;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
};

document.getElementById("reset").addEventListener("click", () => {
  resetCanvas();
})



// Target => canvas
const updateMousePosition = (target, mX, mY) => {
    const rect = target.getBoundingClientRect();
    // console.log( rect, mX, mY );
    const scaleX = target.width / rect.width;
    const scaleY = target.height / rect.height;
    target.cursorX = Math.floor( ((mX - rect.left)*scaleX)*100)/100;
    target.cursorY = Math.floor( ((mY - rect.top)*scaleY)*100)/100;
  }

// Target => canvas
const  createSignature = (target) => {
    if( target ){
      const context = target.getContext('2d');
      // console.log( 'context', context );
      if( context ){
        if (!target.begin_sign) {
          context.beginPath();
          context.moveTo(target.cursorX, target.cursorY);
          target.begin_sign = true;
        } else {
          context.lineTo(target.cursorX, target.cursorY);
          context.strokeStyle = target.color;
          context.lineWidth = target.width_line;
          context.stroke();
        }
      }
    }
};

const onMouseDown = ({ target, pageX, pageY }) => {
  target.sign = true;
  // span.innerText = `md   x: ${ target.cursorX} y; ${target.cursorY}`;
  updateMousePosition(target, pageX, pageY);
};

const onMouseUp = ({target}) => {
  target.sign = false;
  target.begin_sign = false;
};

const onMouseMove = ({ target, pageX, pageY }) => {
  span.innerText = `mm   x: ${ pageX} y; ${pageY}`;
  updateMousePosition(target, pageX, pageY);
  spanC.innerText = `sign: ${ target.sign } begin_sign: ${target.begin_sign}  x: ${ target.cursorX} y; ${target.cursorY}`;
  if (target.sign) {
    createSignature(target);
  }
};
  
const  modalEvents = ()=> {
    $("#bookingmodal").on("hidden.bs.modal", function () {
      // TODO - Quitar eventos
      const canvas = document.getElementById('canvas');
      canvas.removeEventListener("mousedown", onMouseDown, false );
      canvas.removeEventListener("mouseup", onMouseUp, false );
      canvas.removeEventListener('mousemove', onMouseMove, false );

      let i = document.getElementById('firmadoPadre');
      if(  this.progenitor === 'Madre'){
        i = document.getElementById('firmadoMadre');
      }
      const base64 = canvas.toDataURL();
      i.src = base64;
      resetCanvas();
      canvas.sign = false;
      canvas.begin_sign = false;
      canvas.cursorX = 0;
      canvas.cursorY = 0;

    });

    $("#bookingmodal").on("show.bs.modal", function (event) {
      const canvas = document.getElementById('canvas');
      canvas.width_line = 1;
      canvas.color = "#000000";
      canvas.sign = false;
      canvas.begin_sign = false;
      canvas.cursorX = 0;
      canvas.cursorY = 0;
      const context = canvas.getContext('2d');
      
      const button = event.relatedTarget;
      let i = document.getElementById('firmadoPadre');
      this.progenitor = button.getAttribute('data-bs-p');
      if(  this.progenitor === 'Madre'){
        i = document.getElementById('firmadoMadre');
      }
      if( i.src ){
        context.drawImage(i, 0, 0);
      }
      canvas.addEventListener("mousedown", onMouseDown, false );
      canvas.addEventListener("mouseup", onMouseUp, false );
      canvas.addEventListener('mousemove', onMouseMove, false );
    });
}


// const signature = new Signature();
modalEvents();