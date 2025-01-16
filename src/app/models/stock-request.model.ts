import { Variant } from "./varient.model";

export interface StockRequest {
    stockRequestId: number;
    varientId: number;
    varient: Variant;
    quantity: number;
    supplierName: string;
    supplierEmail: string;
    status: string;
    createdDate: Date;
  }
  