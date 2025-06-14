import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent {
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  /*  isValidField(fieldName: string): boolean | null {
    console.log(fieldName);
    console.log(this.myForm.controls[fieldName].errors);
    //funcion para saber si existe un error o si ha sudo tocado cada parte del formulario
    return (
      !!this.myForm.controls[fieldName].errors &&
      this.myForm.controls[fieldName].touched
    );
  }

  getFieldError(fieldName: string): string | null {
    //funcion para determinar si existe un error y pitar la clase de error

    if (!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};
    console.log(errors);

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
  } */

  onSave() {
    //comprueba si es invalido, y marca todas como erroneas
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    //reset y pintar valores por defecto
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
