import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ['.submit {display: flex; justify-content: center;}']
})
export class AppComponent {
  public message: string;

  public customer: Customer = new Customer(0, { firstname: 'Max', lastname: 'Mustermann' });

  submit() {
    this.message = JSON.stringify(this.customer);
    this.customer = new Customer();
  }
}

export class Name {
  constructor(public firstname: string, public lastname: string) {}
}
export class Customer {
  constructor(public id?: number, public name?: Name) {}
}
