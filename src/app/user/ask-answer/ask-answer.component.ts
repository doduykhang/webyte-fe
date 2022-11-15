import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CKEditor4 } from 'ckeditor4-angular';
import { Answer } from 'src/app/models/answer';
import { question } from 'src/app/models/question';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AnswerserviceService } from 'src/app/service/userservice/answerservice.service';
import { HeaderserviceService } from 'src/app/service/userservice/headerservice.service';
import { QuestionserviceService } from 'src/app/service/userservice/questionservice.service';
import { TopicserviceService } from 'src/app/service/userservice/topicservice.service';

@Component({
  selector: 'app-ask-answer',
  templateUrl: './ask-answer.component.html',
  styleUrls: ['./ask-answer.component.css']
})
export class AskAnswerComponent implements OnInit {
  panelOpenState = false;
  topic: FormControl = new FormControl('', Validators.required);
  answer: FormControl = new FormControl('');
  data;
  listTopics;
  listQuestion;
  accountid;
  test = '<p>hi</p>'
  question: question = new question();
  newAnswer: Answer = new Answer();
  constructor(private headerService: HeaderserviceService, private toppicService: TopicserviceService,
    private authenticate: AuthenticationService, private questionService: QuestionserviceService, private answerService: AnswerserviceService) {
  }

  post = false;
  ngOnInit() {
    this.headerService.setActive('ask-answer');
    this.question.accountId = this.authenticate.currentUserValue.id;
    this.accountid = this.authenticate.currentUserValue.id;
    this.toppicService.getAllTopics().subscribe(data => {
      this.listTopics = data;
      console.log(data);
    })
    this.questionService.getAllQuestion().subscribe(data => {
      this.listQuestion = data;
      console.log(data);
    })

  }

  clickPost() {
    this.post = !this.post;
    console.log(this.post);
  }
  registerAnswer() {
    this.question.topicId = this.topic.value;
    this.question.questionContent = this.data;
    console.log(this.question);
    this.questionService.insertAllTopics(this.question).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
    console.log(this.data);
    console.log(this.topic.value);

  }
  public onChange(event: CKEditor4.EventInfo) {
    this.data = event.editor.getData();
  }
  sendAnswer(questionId) {
    this.newAnswer.accountid = this.accountid;
    this.newAnswer.answercontent = this.answer.value;
    this.newAnswer.questionid = questionId;
    this.answerService.insertAllAnswer(this.newAnswer).subscribe(data => {
      this.questionService.getAllQuestion().subscribe(data => {
        this.listQuestion = data;
        console.log(data);
      })
    })
  }
}
