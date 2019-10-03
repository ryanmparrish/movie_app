import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class MoviesService {
  constructor (
    private http: HttpClient
  ) {}

  getMovies() {
    return this.http.get(`http://www.omdbapi.com/?s=Batman&apikey=f9526e2e`);
  }

  getMovieData(movieId) {
    return this.http.get(`http://www.omdbapi.com/?i=`+movieId+`&apikey=f9526e2e`);
  }

}
