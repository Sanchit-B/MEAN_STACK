import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-books-list',
  templateUrl: './users-books-list.component.html',
  styleUrls: ['./users-books-list.component.css']
})
export class UsersBooksListComponent implements OnInit {

  Book: string = 'Book';
  Song: string = 'Song';

  booksList = [];
  songsList = [];

  constructor() { }

  ngOnInit() {
  }

  onItemAdded(item) {
    if(item.type === 'Song') {
      this.songsList.push(item);
    } else {
      this.booksList.push(item);
    }
  }


  onItemDelete(item) {
    if(item.type === 'Song') {
      this.songsList = this.songsList.filter(song => song.name !== item.name);
    } else if(item.type === 'Book') {
      this.booksList = this.booksList.filter(book => book.name !== item.name);
    }
  }
}
