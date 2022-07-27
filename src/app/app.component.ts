import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from './services/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bargainHunter';

  constructor(private sharingservice: SharingService) {}

  sendMessage(){
    this.sharingservice.sendUpdate('reload')
  }

}
