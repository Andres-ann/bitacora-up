import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Frases } from 'src/app/models/frases.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: any;
  model: Frases;
  constructor(
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getFrase(this.id).subscribe((res) => {
      this.model = {
        _id: res.id,
        frase: res.frase,
        autor: res.autor,
        likes: res.likes,
        visualizaciones: res.visualizaciones,
      };
    });
  }

  onSubmit(product: Frases) {
    this.crudService.updateFrase(this.id, product).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
