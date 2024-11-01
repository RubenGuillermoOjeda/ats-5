import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  readonly url = "http://localhost:3001/locations";

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url);
  }

  getLocationById(id: string): Observable<Location> {
    return this.http.get<Location>(this.url + `/${id}`);
  }

  getHighestId(): Observable<number> {
    return this.http.get<Location[]>(this.url).pipe(
      map(locations => locations.sort((a,b) => b.id - a.id)[0].id
    ));
  }

  getCategories(): Observable<string[]> {
    return this.getLocations().pipe(
      map(locations => [...new Set<string>(locations.map(location => location.category))]),
    );
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.url, location);
  }

  updateLocation(id:number, location:Location):Observable<Location> {
    return this.http.put<Location>(this.url + `/${id}`, location);
  }

  deleteLocation(id:number): Observable<Location> {
    return this.http.delete<Location>(this.url + `/${id}`);
  }

}
