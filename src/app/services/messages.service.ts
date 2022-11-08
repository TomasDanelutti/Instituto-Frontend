import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  toast: HTMLIonToastElement;

  constructor(private toastController: ToastController, private alertController: AlertController) { }


  // IONIC TOASTS
  async showMessage(header: string, message: string, duration: number) {

    if(this.toast) {
      // Si ya existe un toast lo cierro, para mostrar el nuevo.
      this.toast.dismiss();
    }

    // Guardo el toast.
    this.toast = await this.toastController.create({
      header: header,
      message: message,
      duration: duration,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });

    this.toast.present();
  }

  async showtAlert(header: string, message: string, handler: any) {

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Aceptar',
          handler: handler,
        },{
          text: 'Cancelar',
        }
      ]
    });

    await alert.present();
  }

  //  SWEET ALERT
  ventanaExitosa(titulo: string, textoCuerpo?: string) {
    return Swal.fire({
      icon: 'success',
      title: titulo,
      text: textoCuerpo,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1262e0',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  ventanaInfo(titulo: string, textoCuerpo?: string) {
    Swal.fire({
      icon: 'info',
      title: titulo,
      text: textoCuerpo,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1262e0',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  ventanaError(titulo: string, textoCuerpo?: string) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: textoCuerpo,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1262e0',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  ventanaWarning(titulo: string, textoCuerpo?: string) {
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text: textoCuerpo,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  ventanaConfirmar(titulo: string, textoCuerpo: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      text: textoCuerpo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1262e0',
      cancelButtonColor: '#90a4ae',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  ventanaErrorConFooter(titulo: string, textoCuerpo?: string) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: textoCuerpo,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#1262e0',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      footer: 'Por favor, contáctese con nosotros.'
    });
  }

  ventanaCrearCuenta(titulo: string, textoCuerpo: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: titulo,
      text: textoCuerpo,
      icon: 'warning',
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: 'Médico',
      confirmButtonColor: '#1262e0',
      denyButtonText: `Institución`,
      denyButtonColor: '#90a4ae',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  ventanaErrorCustomTextConfirmButton(titulo: string, textoCuerpo: string, textoBoton: string, mostrarBotonCancelar: boolean = false) {

    let swalFire: SweetAlertOptions<any, any> = {
      icon: 'error',
      title: titulo,
      text: textoCuerpo,
      showConfirmButton: true,
      confirmButtonText: textoBoton,
      confirmButtonColor: '#1262e0',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    };


    if (mostrarBotonCancelar) {
      swalFire.showCancelButton = true;
      swalFire.cancelButtonColor = '#90a4ae';
      swalFire.cancelButtonText = 'Cancelar';
    }

    return Swal.fire(swalFire);
  }

  ventanaWarningCustomButtons(titulo: string, textoCuerpo: string, textoBotonConfirmar: string, textoBotonCancelar: string) {
    return Swal.fire({
      icon: 'warning',
      title: titulo,
      text: textoCuerpo,
      showCancelButton: true,
      cancelButtonColor: '#90a4ae',
      cancelButtonText: textoBotonCancelar,
      showConfirmButton: true,
      confirmButtonText: textoBotonConfirmar,
      confirmButtonColor: '#1262e0',
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  async ventanaVerificacionMotivo(){
    const { value: text } = await Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: 'Lamentamos que quieras desinscribirte del curso. Podrias indicarnos el motivo por favor',
      input: 'text',
      inputPlaceholder: 'Ingrese el motivo aqui.',
      // (Debe ir sin el 0 y sin el 15. Ej: 1122334455)
      inputAttributes: {
      },
      confirmButtonColor: '#1262e0',
      denyButtonColor: '#90a4ae',
      showCancelButton: true,
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      inputValidator: (value) => {
        if (value.length === 0) {
          return 'El motivo es obligatorio'
        }
      }
    })
    return text;
  }

  async ventanaVerificacionToken(){
    const { value: text } = await Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: 'Hemos enviado un mail con un codigo para finalizar su solicitud. Por favor ingreselo',
      input: 'text',
      inputPlaceholder: 'Ingrese el codigo aqui.',
      // (Debe ir sin el 0 y sin el 15. Ej: 1122334455)
      inputAttributes: {
      },
      confirmButtonColor: '#1262e0',
      denyButtonColor: '#90a4ae',
      showCancelButton: true,
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar solicitud',
      inputValidator: (value) => {
        if (value.length === 0) {
          return 'El codigo es obligatorio'
        }
      }
    })
    return text;
  }
}
