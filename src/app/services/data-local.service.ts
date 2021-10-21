import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  
  private _storage: Storage | null = null;
  noticias: Article[] = [];

  constructor(private storage: Storage,
              public toastController: ToastController) {
    this.init();
    this.cargarFavoritos();
  }

  async init(){
    const storage =  await this.storage.create();
    this._storage = storage;
  }

  async favoritosToast( message: string ){
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  async guardarNoticias(noticia){    
    const existe = this.noticias.find(findNoticia => findNoticia.title === noticia.title);
    
    if (!existe) {
 
      this.noticias.unshift(noticia); 
      this._storage.set('favoritos', this.noticias);
    }

    this.favoritosToast('Agregado a favorito');
  }

  async cargarFavoritos(){
    const favoritos = await this.storage.get('favoritos');    
    if (favoritos) { 
      this.noticias = favoritos;      
    }
  }

  borrarNoticias( noticia: Article ){
    this.noticias = this.noticias.filter(filterNoti => filterNoti.title !== noticia.title);
    this._storage.set('favoritos', this.noticias);
    this.favoritosToast('Borrado de favorito');
  }


}
