import { Directive, ElementRef, Renderer2, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Name } from './app.component';

@Directive({
  selector: '[nameConverter]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameConverterDirective),
      multi: true
    }
  ]
})
export class NameConverterDirective implements ControlValueAccessor {
  private onChangeMethod;
  private onTouchMethod;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  writeValue(value: any) {
    let val = '';
    if (value && value.firstname && value.lastname) {
      const name: Name = <Name>value;
      val = name.firstname + ' ' + name.lastname;
    }
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', val);
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const namesp = event.target.value.split(' ', 2);
    const targetValue = new Name(namesp[0], namesp.length == 1 ? '' : namesp[1]);
    this.onChangeMethod(targetValue);
  }

  registerOnChange(fn: any) {
    this.onChangeMethod = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchMethod = fn;
  }
}
