import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Frases } from 'src/app/models/frases.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent implements OnInit {
  @Input() post: any;
  @Input() i: any;
  @Output() onFraseDeleted = new EventEmitter();

  frases: Frases[] = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getFrases().subscribe((res: Frases[]) => {
      this.frases = res;
    });
  }

  delete(id: any, i: any) {
    if (confirm('¿Está seguro que desea eliminar esta frase?')) {
      this.crudService.deleteFrase(id).subscribe(() => {
        this.frases.splice(i, 1);
        this.onFraseDeleted.emit();
      });
    }
  }
}
