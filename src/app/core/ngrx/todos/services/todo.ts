import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Todo } from '../models/todo';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {
  constructor(private http: Http) { }

  public load(): Observable<Todo[]> {
    return this.http
      .get(`api/todos`, this.jwt())
      .map((res) => {
        return res.json();
      });
  }

  public addOne(todo: Todo): Observable<Todo> {
    return this.http
      .post(`api/todos`, JSON.stringify(todo), this.jwt())
      .map((res) => {
        return res.json();
      });
  }

  public removeOne(id: number): Observable<number> {
    return this.http
      .delete(`api/todos/${id}`, this.jwt())
      .map(() => id);
  }

  private jwt() {
    const jwtHeaders = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: jwtHeaders });
  }
}
