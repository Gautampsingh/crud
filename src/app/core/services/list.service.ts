import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from 'src/app/shared/models/List.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  baseUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  // Get all list
  public getAll(): Observable<List[]> {
    const url = this.baseUrl + 'Task.json';
    return this.httpClient.get(url).pipe(
      map((items: any) => {
        let data: List[] = [];
        if (items) {
          Object.keys(items).map((i) => {
            data.push({
              title: i,
              id: items[i].id,
              description: items[i].description,
              priority: items[i].priority,
              status: items[i].status,
            });
          });
        }
        return data;
      })
    );
  }

  // Delete row list
  public delete(name: string): Observable<any> {
    const url = `${this.baseUrl}Task/${name}.json`;
    return this.httpClient.delete(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  // Update row list
  public put(modalData: any, name: any): Observable<List> {
    const url = `${this.baseUrl}Task/${name}.json`;
    return this.httpClient.put(url, modalData).pipe(
      map((response: List) => {
        return response;
      })
    );
  }

  // Add row list
  public POST(modalData: any): Observable<List> {
    const url = `${this.baseUrl}Task.json`;
    return this.httpClient.post(url, modalData).pipe(
      map((response: List) => {
        return response;
      })
    );
  }
}
