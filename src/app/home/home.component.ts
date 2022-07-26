import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  searchFormGroup: FormGroup;
  
  constructor(private readonly httpservice: HttpService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchFormGroup = this._formBuilder.group({
      search: '',
    });
    this.$jumiaProducts = this.httpservice.getFromJumia(this.selectedVal).pipe(
      defaultIfEmpty(false)
    );
  }

  getKeyword(){
    this.$jumiaProducts = this.httpservice.getFromJumia(this.searchFormGroup.value.search)
  }

  getVal(e){
  this.selectedVal = e;
  }
  
}
