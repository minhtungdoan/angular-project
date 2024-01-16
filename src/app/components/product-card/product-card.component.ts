import { SlicePipe } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { CustomSlicePipe } from '../../pipes/custom-slice.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'], // Corrected property name
})
export class ProductCardComponent {
  @Input() productChild: any;
}

@NgModule({
  declarations: [
    // ...
    CustomSlicePipe,
  ],
  // ...
})
export class AppModule {}
