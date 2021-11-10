import { Component, OnInit } from '@angular/core';
import { AppHttpService } from '../services/app-http.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public hello: string = "";
  constructor(private appHttpService: AppHttpService) { }

  ngOnInit(): void { }

  callBE() {
    this.appHttpService.getHello().subscribe(str => this.hello = str.hello);
  }
}
