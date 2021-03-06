import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  surname: string;
  contactEmail: string;
  companyName: string;
  productType: string;
  createdAt: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  
  {name: 'Ambani',
  surname: 'Matsedu',
  contactEmail: 'ambani@gmail.com',
  companyName: 'BCX',
  productType: 'Enterprise Internet',
  createdAt: '01/07/2019'},
  {name: 'Ambani', surname: 'Matsedu', contactEmail: 'ambani@gmail.com',companyName: 'BCX',  productType: 'Enterprise Internet', createdAt: '01/07/2019'},
  {name: 'Ambani', surname: 'Matsedu', contactEmail: 'ambani@gmail.com',companyName: 'BCX',  productType: 'Enterprise Internet', createdAt: '01/07/2019'},
  {name: 'Ambani', surname: 'Matsedu', contactEmail: 'ambani@gmail.com',companyName: 'BCX',  productType: 'Enterprise Internet', createdAt: '01/07/2019'},
  {name: 'Ambani', surname: 'Matsedu', contactEmail: 'ambani@gmail.com',companyName: 'BCX',  productType: 'Enterprise Internet', createdAt: '01/07/2019'},
  {name: 'Ambani', surname: 'Matsedu', contactEmail: 'ambani@gmail.com',companyName: 'BCX',  productType: 'Enterprise Internet', createdAt: '01/07/2019'},
  {name: 'Ambani', surname: 'Matsedu', contactEmail: 'ambani@gmail.com',companyName: 'BCX',  productType: 'Enterprise Internet', createdAt: '01/07/2019'},
  {name: 'Ambani', surname: 'Matsedu', contactEmail: 'ambani@gmail.com',companyName: 'BCX',  productType: 'Enterprise Internet', createdAt: '01/07/2019'},
  {name: 'Ambani', surname: 'Matsedu', contactEmail: 'ambani@gmail.com',companyName: 'BCX',  productType: 'Enterprise Internet', createdAt: '01/07/2019'}
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'surname': return compare(+a.surname, +b.surname, isAsc);
        case 'contactEmail': return compare(+a.contactEmail, +b.contactEmail, isAsc);
        case 'companyName': return compare(+a.companyName, +b.companyName, isAsc);
        case 'productType': return compare(+a.productType, +b.productType, isAsc);
        case 'createdAt': return compare(+a.createdAt, +b.createdAt, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
