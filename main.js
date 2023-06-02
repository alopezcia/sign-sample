import './style.css'

class Signature {
  constructor() {
    this.width_line = 1;
    this.color = "#000000";

    // this.signPadre = false;
    // this.begin_signPadre = false;
    // this.signMadre = false;
    // this.begin_signMadre = false;

    this.sign = false;
    this.begin_sign = false;


    this.canvas = document.getElementById('canvas');
    const context = this.canvas.getContext('2d');
    context.lineJoin = 'round';
    context.lineCap = 'round';

    this.span = document.getElementById('coords');

    // Establece eventos 
    this.mouseDownEvents();
    this.mouseUpEvents();
    this.mouseMoveEvents();
    this.modalEvents();
    this.resetCanvas();

    this.createSignature(this.canvas);
    this.clearCanvas();
  }


  updateMousePosition(target, mX, mY) {
    const rect = target.getBoundingClientRect();
    // console.log( rect, mX, mY );
    const scaleX = target.width / rect.width;
    const scaleY = target.height / rect.height;
    this.cursorX = (mX - rect.left) * scaleX;
    this.cursorY = (mY - rect.top) * scaleY;
    // const context = target.getContext('2d');
    // context.strokeStyle = 'red';
    // context.beginPath();
    // context.rect(0,0,300,150);
    // context.stroke();

  }

  createSignature(target) {
    this.span.innerText = `   x: ${ this.cursorX} y; ${this.cursorY}`;
    if( target ){
      const context = target.getContext('2d');
      // console.log( 'context', context );
      if( context ){
        // context.lineJoin = 'round';
        // context.lineCap = 'round';
        if (!this.begin_sign) {
          context.beginPath();
          context.moveTo(this.cursorX, this.cursorY);
          this.begin_sign = true;
        } else {
          context.lineTo(this.cursorX, this.cursorY);
          context.strokeStyle = this.color;
          context.lineWidth = this.width_line;
          context.stroke();
        }
      }
    }
  }


  // updateMousePositionPadre(mX, mY) {
  //   const rectPadre = this.canvasPadre.getBoundingClientRect();
  //   const scaleXPadre = this.canvasPadre.width / rectPadre.width;
  //   const scaleYPadre = this.canvasPadre.height / rectPadre.height;
  //   this.cursorXPadre = (mX - rectPadre.left) * scaleXPadre;
  //   this.cursorYPadre = (mY - rectPadre.top) * scaleYPadre;
  // }
  
  // updateMousePositionMadre(mX, mY) {
  //   const rectMadre = this.canvasMadre.getBoundingClientRect();
  //   const scaleXMadre = this.canvasMadre.width / rectMadre.width;
  //   const scaleYMadre = this.canvasMadre.height / rectMadre.height;
  //   this.cursorXMadre = (mX - rectMadre.left) * scaleXMadre;
  //   this.cursorYMadre = (mY - rectMadre.top) * scaleYMadre;
  // }
  
  mouseDownEvents() {
    this.canvas.addEventListener("mousedown", 
        ({ target, pageX, pageY }) => {
          this.sign = true;
          this.updateMousePosition(target, pageX, pageY);
        });
  }

  mouseUpEvents() {
    this.canvas.addEventListener("mouseup", (event) => {
      // console.log( event );
      this.sign = false;
      this.begin_sign = false;
    });
  }

  mouseMoveEvents() {
    this.canvas.addEventListener('mousemove', 
        ({ target, pageX, pageY }) => {
          if (this.sign) {
            // console.log('mouseMove canvasPadre', pageX, pageY);
            this.updateMousePosition(target, pageX, pageY);
            this.createSignature(target);
          }
        });
  }

  resetCanvas() {
    document.getElementById("reset").addEventListener("click", () => {
      this.clearCanvas();
    })
  }

  // createSignaturePadre() {
  //   if (!this.begin_signPadre) {
  //     this.contextPadre.beginPath();
  //     this.contextPadre.moveTo(this.cursorXPadre, this.cursorYPadre);
  //     this.begin_signPadre = true;
  //   } else {
  //     this.contextPadre.lineTo(this.cursorXPadre, this.cursorYPadre);
  //     this.contextPadre.strokeStyle = this.color;
  //     this.contextPadre.lineWidth = this.width_line;
  //     this.contextPadre.stroke();
  //   }
  // }

  // createSignatureMadre() {
  //   if (!this.begin_signMadre) {
  //     this.contextMadre.beginPath();
  //     this.contextMadre.moveTo(this.cursorXMadre, this.cursorYMadre);
  //     this.begin_signMadre = true;
  //   } else {
  //     // console.log('lineTo ', this.cursorXMadre, this.cursorYMadre);
  //     this.contextMadre.lineTo(this.cursorXMadre, this.cursorYMadre);
  //     this.contextMadre.strokeStyle = this.color;
  //     this.contextMadre.lineWidth = this.width_line;
  //     this.contextMadre.stroke();
  //   }
  // }


  clearCanvas() {
    const context = this.canvas.getContext('2d');
    if( context )
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }


  modalEvents(){

    $("#bookingmodal").on("hidden.bs.modal", function () {
      // put your default event here
      const c = document.getElementById('canvas');
      let i = document.getElementById('firmadoPadre');
      if(  this.progenitor === 'Madre'){
        i = document.getElementById('firmadoMadre');
      }
      const base64 = c.toDataURL();
      i.src = base64;
    });

    $("#bookingmodal").on("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      const c = document.getElementById('canvas');
      let i = document.getElementById('firmadoPadre');
      this.progenitor = button.getAttribute('data-bs-p');
      if(  this.progenitor === 'Madre'){
        i = document.getElementById('firmadoMadre');
      }
      if( i.src ){
        const context = c.getContext('2d');
        context.drawImagen(i, 0, 0);
      }
    });

  }
}

// document.addEventListener("DOMContentLoaded", event => {
//   new Signature();
// });

const serializeForm = ( form ) => {
  let obj = {}
  const formData = new FormData( form );
  for( let key of formData.keys() ) {
        obj[key]=formData.get(key);
  }
  return obj;
};


const mainFormSubmitted =  (event) => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    console.log( event );
    const forms = document.querySelectorAll('.needs-validation')
    const form = forms[0]
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
    // const json = JSON.stringify( serializeForm(event.target) );
    // console.log(json);
  };

const signature = new Signature();
// console.log(signature);

function logSubmit(event) {
  console.log( `Form Submitted! Timestamp: ${event.timeStamp}` );
  event.preventDefault();
}

const form = document.getElementById("main-form");
console.log(form);
form.addEventListener("submit", logSubmit);

