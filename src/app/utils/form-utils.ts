import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  //Basado en metodoss estaticos y clase

  static getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este caso es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minLength']} caracteres `;
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`;
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


}
