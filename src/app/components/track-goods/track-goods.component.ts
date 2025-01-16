import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { Variant } from 'src/app/models/varient.model';

@Component({
  selector: 'app-track-goods',
  templateUrl: './track-goods.component.html',
  styleUrls: ['./track-goods.component.css']
})
export class TrackGoodsComponent implements OnInit{
  variants: Variant[] = [];
  endDate: string = '';

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getVariants();
  }

  getVariants(): void {
    const formattedEndDate = this.formatDate(this.endDate);
    console.log(formattedEndDate);
    this.supplierService.getVariants(this.endDate).subscribe({
      next: (data: Variant[]) => this.variants = data,
      error: (error: any) => {
        console.log(error);
        alert(error);
      }
    });
  }

  onDateChange(event: any): void {
    this.endDate = event.target.value;
    this.getVariants();
  }

  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

}
