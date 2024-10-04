export interface Item {
  itemId?: number,
  barcode?: string,
  medicineName?: string,
  activeIngredient?: string,
  dosageForm?: string,
  strength?: string,
  unit?: string,
  packaging?: string,
  manufacturer?: string,
  description?: string,
}

export interface ImportVoucher {
  importVoucherId?: number,
  createDate: Date,
  createdBy: string,
  vendor: string,
  description: string,
  total: number,
  vat: number,
  totalAmount: number,
  details?: ImportVoucherDetail[]
}

export interface ImportVoucherDetail {
  importVoucherDetailId: number,
  importVoucherId: number,
  itemId: number,
  barcode: string,
  medicineName: string,
  unit: string,
  expiryDate: Date,
  unitPrice: number,
  quantity: number,
}

export interface InventoryDto {
  inventoryId: number;
  medicineName: string;
  activeIngredient: string;
  barcode: string;
  unitPrice:number;
  importQuantity:number;
  remainingQuantity:number;
  importDate:Date ;
  expiryDate: Date;
}

export interface ExportVoucher {
  exportVoucherId?: number,
  createDate?: Date,
  createdBy?: string,
  patientId?: number,
  description?: string,
  payment?: string,
  total?: number,
  surcharge?: number,
  totalAmount?: number,
  details?: ExportVoucherDetail[]
}

export interface ExportVoucherDetail {
  exportVoucherDetailId?: number,
  exportVoucherId?: number,
  itemId?: number,
  medicineName?: string,
  unit?: string,
  unitPrice: number,
  quantity: number,
}

export interface InventoryDtoExport {
  itemId?: number,
  barcode?: string,
  medicineName?: string,
  activeIngredient?: string,
  unit?: string,
  totalRemainingQuantity?: number,
  retailPrice?: number,
  priceWithService?: number,
}
