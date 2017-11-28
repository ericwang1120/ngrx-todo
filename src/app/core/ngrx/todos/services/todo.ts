import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
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

  public removeMany(ids: number[]): Observable<number[]> {
    return ids.length > 0 ? Observable.from(ids)
      .mergeMap((id) => this.removeOne(id))
      .map(() => ids) : Observable.of(ids);
  }

  public editOne(id: number, changes: Partial<Todo>): Observable<{ id: number, changes: Partial<Todo> }> {
    const obj = {
      id: id,
      ...changes
    };

    return this.http
      .put(`api/todos`, JSON.stringify(obj), this.jwt())
      .map(() => {
        return { id: id, changes: changes };
      });
  }

  private jwt() {
    const jwtHeaders = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: jwtHeaders });
  }
}
