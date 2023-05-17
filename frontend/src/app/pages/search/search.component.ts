import { Component, OnInit } from '@angular/core';
import { Frases } from 'src/app/models/frases.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchText = '';
  searchResults: Frases[] = [];
  showNoResultsMessage = false;
  private timer: any;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.timer = null;
  }

  search() {
    clearTimeout(this.timer);

    // Mostrar el mensaje de "No se encontraron resultados" después de 3 segundos
    this.timer = setTimeout(() => {
      this.showNoResultsMessage = true;
    }, 500);

    this.searchService.searchCollection(this.searchText).subscribe(
      (results: Frases[]) => {
        this.searchResults = results;
        this.showNoResultsMessage = false; // Ocultar el mensaje si se encontraron resultados
      },
      (error: any) => {
        this.showNoResultsMessage = false; // Ocultar el mensaje en caso de error
        console.error(error);
      }
    );
  }
}
