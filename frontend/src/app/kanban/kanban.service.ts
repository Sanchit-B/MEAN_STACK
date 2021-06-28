import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  API_ROOT = environment.apiUrl;
  STAGE = environment.stage;

  constructor(
    private http: HttpClient
  ) {
    this.API_ROOT += `3000/${this.STAGE}/api`
  }

  registerOrUpdateTask([...args]) {
    let endPoint = this.API_ROOT + '/tasks';

    // if update request
    if (args[1] === true) {
      endPoint += `/${args[0]._id}`
      return this.http.patch(endPoint, args[0]).toPromise();
    }

    // if update request
    else {
      return this.http.post(endPoint, args[0]).toPromise();
    }
  }

  getTasks(_id?, searchKey?) {
    const endpoint = this.API_ROOT + `/tasks`;

    let params = {};
    if (_id) {
      const Obj = {
        id: _id
      }
      params = Object.assign(Obj, params);
    }

    if (searchKey) {
      const Obj = {
        search: searchKey
      }
      params = Object.assign(Obj, params);
    }

    return this.http.get(endpoint, { params }).toPromise();
  }

  deleteTaskById(id) {
    const endpoint = this.API_ROOT + `/tasks/${id}`;

    return this.http.delete(endpoint).toPromise();
  }
}
