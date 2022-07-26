import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  $products: Array<any>[5];
  $jumiaProducts: Observable<any>;
  selectedVal: string = ' ';
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

  comparePrices(keyword: string){
    this.$jumiaProducts = this.httpservice.getFromJumia(keyword)
  }

}
