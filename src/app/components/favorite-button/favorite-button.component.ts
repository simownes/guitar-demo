import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {

  public isFavorite: boolean = false;
  public loading: boolean = false;

  @Input() guitarId: string = "";

  constructor(
    private userService: UserService,
    private readonly favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.isFavorite = this.userService.inFavorites(this.guitarId)
  }


  onFavoriteClick(): void {
    //add guitar to favorite
    this.loading = true;
    this.favoriteService.addToFavorites(this.guitarId)
    .subscribe({
      next: (response: User) => {
        this.loading = false;
        this.isFavorite = this.userService.inFavorites(this.guitarId);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error)
      }
    })
  }

}
