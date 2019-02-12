import { Component, OnInit } from '@angular/core';
import { News } from '../classes/news';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private dataService: GetDataService) { }
  news:News[];
  ngOnInit() {
    this.getNews();
  }
  getNews(){
    this.dataService.getNews().subscribe(news => {
      this.news = news;
    });
  }

}
