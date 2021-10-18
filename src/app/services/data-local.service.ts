import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  
  private _storage: Storage | null = null;
  noticias: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
    this.cargarFavoritos();
  }

  async init(){
    const storage =  await this.storage.create();
    this._storage = storage;
  }

  async guardarNoticias(noticia){    
    const existe = this.noticias.find(findNoticia => findNoticia.title === noticia.title);
    
    if (!existe) {
 
      this.noticias.unshift(noticia); 
      this._storage.set('favoritos', this.noticias);
    }
    
  }

  async cargarFavoritos(){
    const result = await this.storage.get('favoritos');    
    if (result) { 
      this.noticias = result; 
    }
  }  


}
