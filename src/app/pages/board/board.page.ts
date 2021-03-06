import { Component, OnInit } from '@angular/core';
// import {Books} from 'src/book-list'
import {Articles} from 'src/article-list'
import {Sqlite} from '../../sqlite'

import { FormBuilder, FormsModule, ReactiveFormsModule ,FormGroup, Validators } from '@angular/forms';
import { Article } from 'src/article';
import {JsonpServiceService} from '../../services/jsonp-service.service'
@Component({
  selector: 'app-board',
  templateUrl: './board_test.page.html',
  styleUrls: ['./board.page.scss'],
  providers: []
})
export class BoardPage implements OnInit {
  myForm: FormGroup;
  articles:  Article[];
  public article: any;

  schedule: Array<{id: any, title: string, contents: Array<String>}>;

  constructor(
    private JsonpServiceService : JsonpServiceService,
    public sqlite :Sqlite
    , public formBuilder: FormBuilder ) { 
    this._iniitializeApp();
  }

  _iniitializeApp() {
    this.myForm = this.formBuilder.group({
      id:[''],
      title: [''],
      contents: ['']
    });

    this.schedule = [];
  }

  ngOnInit() {
  }

  increseDay(){
    let i = this.schedule.length;
    this.schedule.push({
      id: i+1,
      title: i+1+ ' days',
      contents: []
    });
  }

  decreseDay(){
    let i = this.schedule.length;
    this.schedule.pop();
  }

  addContent(day){
    var id = day.id;
    var title = day.title;
    var contents = this.myForm.value["contents"].toString().trim();
    for (let i = 0; i < this.schedule.length; i++) {
      if (this.schedule[i].id == day.id) {
        console.log("Added Contents in " + day.id)
        this.schedule[i].contents.push(contents);
        break;
      }
    }
  }

  deleteContent(day:any, index:any){
    var id = day.id;
    var title = day.title;
    console.log(index)
    for (let i = 0; i < this.schedule.length; i++) {
      if (this.schedule[i].id == day.id) {
        console.log("Deleted Contents")
        this.schedule[i].contents.splice(index,1);
        break;
      }
    }
  }

  getArticleAll(){
    this.JsonpServiceService.selectArticleAll().subscribe(
      data => {
          if (data != null) {
            console.log(data)
          }
          // this.getSearchDataList(this.date);
      },
      err => {
          console.log("Error")

      }
    );
  }

  getArticle() {
    var id = this.myForm.value["id"].toString().trim();

    this.JsonpServiceService.selectArticle(id).subscribe(
      data => {
          if (data != null) {
            console.log(data)
          }
          // this.getSearchDataList(this.date);
      },
      err => {
          console.log("Error")

      }
    );
  }
  addArticle() {
    
    var data = {
      title: this.myForm.value["title"].toString().trim(),
      contents: this.myForm.value["contents"].toString().trim()
    };


    console.log(data)


    this.JsonpServiceService.insertArticle(data).subscribe(
      data => {
          if (data != null) {
            console.log(data)
          }
          // this.getSearchDataList(this.date);
      },
      err => {
          console.log("Error")

      }
    );

  }

  deleteArticle(){
    var id = this.myForm.value["id"].toString().trim();

    console.log(id)
    this.JsonpServiceService.deleteArticle(id).subscribe(
      data => {
          if (data != null) {
            console.log(data)
          }
          // this.getSearchDataList(this.date);
      },
      err => {
          console.log("Error")

      }
    );
  }

  modifyArticle(){
    var data = {
      id: this.myForm.value["id"].toString().trim(),
      title: this.myForm.value["title"].toString().trim(),
      contents: this.myForm.value["contents"].toString().trim()
    };


    console.log(data)


    this.JsonpServiceService.modifyArticle(data.id, data).subscribe(
      data => {
          if (data != null) {
            console.log(data)
          }
          // this.getSearchDataList(this.date);
      },
      err => {
          console.log("Error")

      }
    );
  }

}
