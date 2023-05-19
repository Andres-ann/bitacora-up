import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Frases } from 'src/app/models/frases.model';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  id!: any;
  posts: Frases[] = [];
  isLoading: boolean = true;

  @Input() visualizaciones!: number;
  @Output() postUpdated = new EventEmitter<Frases>();

  constructor(
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getFrase(this.id).subscribe((data) => {
      data.visualizaciones++;
      this.crudService.updateFrase(this.id, data).subscribe();
      this.posts = [data];
      this.isLoading = false;
    });
  }

  updateLikeList() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getFrase(this.id).subscribe((data) => {
      this.posts = [data];
    });
  }
}
