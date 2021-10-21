import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private datalocalService: DataLocalService) { 

  }
  
  ngOnInit() {}

  abrirNoticia(){
    //console.log('Noticia',this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){
    let guardarBorrarBtn;

    if ( this.enFavoritos ) {

      guardarBorrarBtn = {  
        text: 'Borrar Favorito',
        icon: 'trash',        
        handler: () => {            
          this.datalocalService.borrarNoticias( this.noticia );
        }
      };
      
    } else {

      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        handler: () => {            
          this.datalocalService.guardarNoticias( this.noticia );
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      
      cssClass: 'my-custom-class',
      buttons: [ 
        {
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            console.log('Compartir...');
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            );
          }
        }, 
        guardarBorrarBtn,     
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]      
    });
    await actionSheet.present();

    //const { role } = await actionSheet.onDidDismiss();
    //console.log('onDidDismiss resolved with role', JSON.stringify(role))
  }

}
