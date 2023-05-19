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

    // Mostrar el mensaje de "No se encontraron resultados"
    this.timer = setTimeout(() => {
      this.showNoResultsMessage = true;
    }, 1500);

    this.searchService.searchCollection(this.searchText).subscribe(
      (results: Frases[]) => {
        // Filtrar los resultados de acuerdo a los diferentes tipos de coincidencias
        this.searchResults = this.filterSearchResults(results);
        this.showNoResultsMessage = this.searchResults.length === 0;
      },
      (error: any) => {
        this.showNoResultsMessage = false; // Ocultar el mensaje en caso de error
        console.error(error);
      }
    );
  }

  filterSearchResults(results: Frases[]): Frases[] {
    const filteredResults: Frases[] = [];

    if (this.searchText.length === 0) {
      return results; // Si no hay texto de búsqueda, devolver todos los resultados
    }

    const regex = new RegExp(this.escapeRegExp(this.searchText), 'i'); // Expresión regular para la búsqueda (ignora mayúsculas y minúsculas)

    for (const result of results) {
      const lowercaseTitle = result.frase.toLowerCase();
      const lowercaseContent = result.autor.toLowerCase();

      // Verificar coincidencia en el título o el contenido utilizando la expresión regular
      if (regex.test(lowercaseTitle) || regex.test(lowercaseContent)) {
        filteredResults.push(result);
      }
    }

    return filteredResults;
  }

  escapeRegExp(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  clearSearch() {
    this.searchText = '';
    this.searchResults = [];
    this.showNoResultsMessage = false;
  }
}
