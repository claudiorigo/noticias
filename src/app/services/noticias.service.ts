import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaToHeadlines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage= 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>( query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines(){
    this.headlinesPage ++;    
    //return this.http.get<RespuestaToHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0f24a1a6fb144773bb7966794f63e18a`);
    return this.ejecutarQuery<RespuestaToHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
    
  }

  getTopHeadLinesCategoria(categoria: string){

    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    //return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0f24a1a6fb144773bb7966794f63e18a`);
    return this.ejecutarQuery<RespuestaToHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }

}
