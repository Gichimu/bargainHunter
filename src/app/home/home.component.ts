import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  $products: Array<any>[5];
  $jumiaProducts: Observable<any>;
  selectedVal: string = 'fish';
  $carrefourProducts: Observable<any>
  constructor(private readonly httpservice: HttpService) {}

  ngOnInit(): void {
    this.$jumiaProducts = this.httpservice.getFromJumia(this.selectedVal).pipe(
      defaultIfEmpty(false)
    );
  }

  

  getVal(e){
  this.selectedVal = e
  }
  
}
