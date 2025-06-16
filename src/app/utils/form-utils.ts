import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}
export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  //Basado en metodoss estaticos y clase

  static getTextErrors(errors: ValidationErrors) {
    console.log(errors);

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este caso es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres `;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
        case 'email':
          return `el valor ingresado no es un correo electrónico`;
        case 'pattern':
          if (errors['pattern'].requiredPattern == FormUtils.emailPattern) {
            return `el valor ingresado no es un correo electrónico`;
          }
          return `Error de patron`;
        case 'passwordNotEqual':
          return `Las contraseñas no son iguales`;
        case 'emailTaken':
          return `Este correo electronico ya esta registrado`;
        case 'noName':
          return `Este nombre no es soportado`;
        default:
          return `Error no controlado ${key}`;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    /*    console.log(fieldName);
    console.log(this.myForm.controls[fieldName].errors); */
    //funcion para saber si existe un error o si ha sudo tocado cada parte del formulario
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    /* funcion para determinar si existe un error y pitar la clase de error */

    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};
    console.log(errors);

    return FormUtils.getTextErrors(errors);
  }

  static isValidFielInArray(formArray: FormArray, index: number) {
    //Comprobar si se ha tocado o contiene error el elemento del array
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    /* funcion para determinar si existe un error y pitar la clase de error */

    if (formArray.controls.length == 0) return null;

    const errors = formArray.controls[index].errors ?? {};
    console.log(errors);

    return FormUtils.getTextErrors(errors);
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      return field1Value == field2Value ? null : { passwordNotEqual: true };
    };
  }

  static async checkingServerResponse(control: AbstractControl) {
    console.log('Validando servidor.....');

    await sleep();

    const formValue = control.value;
    console.log('validado');
    if (formValue == 'hola@mundo.es') {
      return {
        emailTaken: true,
      };
    }
    return null;
  }

  static notName(control: AbstractControl) {
    const nameValue = control?.value;
    return nameValue == 'miguel' ? { noName: true } : null;
  }
}
