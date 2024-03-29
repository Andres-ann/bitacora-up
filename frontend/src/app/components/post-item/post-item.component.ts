import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  @Output() onLikeUpPost = new EventEmitter();

  frases: Frases[] = [];
  id!: any;

  constructor(private crudService: CrudService, private router: Router) {}

  ngOnInit(): void {}

  delete(id: any, i: any) {
    if (confirm('¿Está seguro que desea eliminar esta frase?')) {
      this.crudService.deleteFrase(id).subscribe(() => {
        this.frases.splice(i, 1);
        this.onFraseDeleted.emit();
        this.router.navigateByUrl('/');
      });
    }
  }

  updateLikes(id: any) {
    this.crudService.getFrase(id).subscribe((data) => {
      data.likes++;
      this.crudService.updateFrase(id, data).subscribe(() => {
        this.post.likes = data.likes;
        this.onLikeUpPost.emit();
      });
    });
  }

  shareOnWhatsApp(id: any) {
    const url = encodeURIComponent(`https://bitacora-up.vercel.app/view/${id}`);
    console.log(url);
    window.open(
      `https://api.whatsapp.com/send?text=¡Mira%20esta%20frase%20en%20la%20Bitácora!%20${url}`,
      '_blank'
    );
  }

  isNaNValue(value: any): any {
    return isNaN(value) ? 0 : value;
  }
}
