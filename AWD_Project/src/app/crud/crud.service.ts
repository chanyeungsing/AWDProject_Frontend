import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private readonly baseUrl = 'http://localhost/index.php';
  private http = inject(HttpClient);

  async getAll<T>(controllerName: string): Promise<T> {
    const params = new HttpParams().set('controller', controllerName);
    const obs = this.http.get<T>(this.baseUrl, { params });
    return await firstValueFrom(obs);
  }

  async getByKey<T>(controllerName: string, key: string | number): Promise<T> {
    const params = new HttpParams()
      .set('controller', controllerName)
      .set('key', key.toString());
    const obs = this.http.get<T>(this.baseUrl, { params });
    return await firstValueFrom(obs);
  }

  async deleteByKey(
    controllerName: string,
    key: string | number
  ): Promise<any> {
    const params = new HttpParams()
      .set('controller', controllerName)
      .set('key', key.toString());
    const obs = this.http.delete<any>(this.baseUrl, { params });
    return await firstValueFrom(obs);
  }

  async create(controllerName: string, formData: any): Promise<any> {
    const params = new HttpParams().set('controller', controllerName);
    const body = new URLSearchParams();
    Object.keys(formData).forEach((key) =>
      formData[key] != null ? body.set(key, formData[key]) : ''
    );
    const obs = this.http.post<any>(this.baseUrl, body.toString(), { params });
    return await firstValueFrom(obs);
  }

  async updateByKey(controllerName: string, formData: any): Promise<any> {
    const params = new HttpParams().set('controller', controllerName);
    const body = new URLSearchParams();
    Object.keys(formData).forEach((key) => body.set(key, formData[key]));
    const obs = this.http.put<any>(this.baseUrl, body.toString(), { params });
    return await firstValueFrom(obs);
  }
}
