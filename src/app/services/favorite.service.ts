import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guitar } from '../models/guitar.model';
import { User } from '../models/user.model';
import { GuitarCatalogueService } from './guitar-catalogue.service';
import { UserService } from './user.service';

const  { apiKey, apiUsers }  = environment;

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private readonly http: HttpClient,
    private readonly guitarService: GuitarCatalogueService,
    private readonly userService: UserService
  ) { }

  //get the guitar based id
    public addToFavorites(guitarId: string): Observable<User> {
      if (!this.userService.user) {
        throw new Error("addToFavorites: There is no user")
      }
      
      const user: User = this.userService.user;

      const guitar: Guitar | undefined = this.guitarService.guitarById(guitarId)

      if (!guitar) {
        throw new Error("addToFavorites: No guitars with id: " + guitarId)
      }

      if (this.userService.inFavorites(guitarId)) {
        this.userService.removeFromFavorites(guitarId);
      }else {
        this.userService.addToFavorites(guitar);
      }

      const headers = new HttpHeaders({
        'content-type': 'application/json',
        'x-api-key': apiKey
      })


      return this.http.patch<User>(`${apiUsers}/${user.id}`, {
        favourites: [...user.favourites]
      }, {
        headers
      })
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
        })
      )
    }
}
