import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly baseUrl = 'http://localhost/index.php';
  private http = inject(HttpClient);

  async getByKey<T>(controllerName: string, formData: any): Promise<T> {
    let params = new HttpParams().set('controller', controllerName);
    Object.keys(formData).forEach((key: string) =>
      formData[key] != null ? (params = params.set(key, formData[key])) : ''
    );
    const obs = this.http.get<T>(this.baseUrl, { params });
    return await firstValueFrom(obs);
  }
}
