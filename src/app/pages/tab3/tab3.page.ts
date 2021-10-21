import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  totalNoticias: number;
  status: string;

  constructor(public dataLocalService: DataLocalService,
              private noticiasService: NoticiasService) {

    this.noticiasService.getTopHeadLines().subscribe(resp =>{           
      this.totalNoticias = resp.totalResults;      
      if (resp.status === 'ok'){
        this.status = 'success'
      }else{
        this.status = 'danger'
      }
    });
  }
  
  
  



}
