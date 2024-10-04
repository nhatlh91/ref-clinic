import { Component } from '@angular/core';
import {MatPaginatorIntl} from "@angular/material/paginator";

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.css'
})
export class CustomPaginatorComponent extends MatPaginatorIntl{
  override itemsPerPageLabel = 'Số dòng mỗi trang:';
  override nextPageLabel = 'Trang tiếp theo';
  override previousPageLabel = 'Trang trước';
  override firstPageLabel = 'Trang đầu';
  override lastPageLabel = 'Trang cuối';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return 'Trang 0 trên 0';
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `Trang ${page + 1} / ${Math.ceil(length / pageSize)}`;
  };
}
