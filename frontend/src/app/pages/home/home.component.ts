import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any[];

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.crudService.getFrases().subscribe((data) => {
      this.posts = data;
    });
  }
}
