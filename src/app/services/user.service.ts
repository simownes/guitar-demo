import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Guitar } from '../models/guitar.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private _user?: User;

    get user(): User | undefined {
      return this._user
    }

    set user(user: User | undefined) {
      StorageUtil.StorageSave<User>(StorageKeys.User, user!)
      this._user = user;
    }

      constructor() { 
        this._user = StorageUtil.StorageRead<User>(StorageKeys.User)
        
      }

  public inFavorites(guitarId: string): boolean {
    if (this._user) {
    return Boolean(this._user?.favourites.find((guitar: Guitar) => guitar.id === guitarId));
  }
  return false;
}

  public addToFavorites(guitar: Guitar): void {
    if(this._user) {
      this._user.favourites.push(guitar);
    }
  }

  public removeFromFavorites(guitarId: string): void {
    if(this._user) {
      this._user.favourites = this._user.favourites.filter((guitar: Guitar) => guitar.id !== guitarId);
    }
  }

}
