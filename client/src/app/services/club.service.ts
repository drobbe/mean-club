import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from '@app/models';
import { FilterClubClass } from '@app/models/filter-club';
import { environment } from '@environments/environment';
import { delay, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClubService {
  constructor(private http: HttpClient) {}

  getItems(filter: FilterClubClass): Observable<Club[]> {
    return this.http
      .get<any>(
        `${environment.apiUrl}/clubs?page=${filter.page}&perpage=${filter.itemsPerPage}&name=${filter.name}&mode=${filter.mode}`
      )
      .pipe(delay(200));
  }

  create(data: { name: string; text: string }): Observable<Club> {
    return this.http.post<any>(`${environment.apiUrl}/clubs`, data);
  }
}
