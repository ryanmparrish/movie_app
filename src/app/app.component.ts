import { Component, OnInit } from '@angular/core';
import { MoviesService } from './shared/movies.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MOVIE-APP';

  constructor(private moviesService: MoviesService, private http: HttpClient) {}
  movies = {};
  moviesFull = {};

  year2000: boolean = true; // visible by default
  year1900: boolean = false; // hidden by default
  toggleClass(e, year) {
    if(year === '2000'){
      this.year2000 = ! this.year2000;
    }else{
      this.year1900 = ! this.year1900;
    }
  }

  loadMovies() {
    this.moviesService.getMovies().subscribe(data => this.movies = data);
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
      // console.log('movies.Search', movies.Search);
      this.getMovieDeets(movies['Search']);
    });
  }

  getMovieDeets(movies){
    let finalData = [];
    if(movies){
      for ( var i in movies ) {
        this.moviesService.getMovieData(movies[i].imdbID).subscribe(data => {
          finalData.push(Object.assign( {}, movies[i], data ));
        });
      }
      this.moviesFull = finalData;
    }
    // console.log('finalData', finalData);
  }

  getMovieImageName(url) {
    let parsedURL = new URL(url),
        pathName = parsedURL.pathname;
    // console.log(parsedURL);
    return pathName.replace('/images/M/', './assets/');
  }


}
