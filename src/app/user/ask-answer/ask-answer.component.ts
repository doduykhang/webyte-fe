import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CKEditor4 } from 'ckeditor4-angular';
import { Answer } from 'src/app/models/answer';
import { question } from 'src/app/models/question';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotifyService } from 'src/app/service/notify.service';
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
  constructor(private headerService: HeaderserviceService, private toppicService: TopicserviceService, private notify: NotifyService,
    private authenticate: AuthenticationService, private questionService: QuestionserviceService, private answerService: AnswerserviceService) {
  }

  post = false;
  ngOnInit() {
    this.headerService.setActive('ask-answer');
    if(this.authenticate.currentUserValue){
      this.question.userId = this.authenticate.currentUserValue.id;
      this.accountid = this.authenticate.currentUserValue.id;
    }
    
    this.toppicService.getAllTopics().subscribe(data => {
      this.listTopics = data;
    })
    this.questionService.getAllQuestion().subscribe(data => {
      this.listQuestion = data;
    })

  }

  clickPost() {
    this.post = !this.post;
  }
  registerAnswer() {
    this.question.topicId = this.topic.value;
    this.question.questionContent = this.data;
    if(!this.question.questionContent || this.question.questionContent.trim()==''){
      return;
    }
    this.questionService.insertAllTopics(this.question).subscribe(data => {
      this.notify.notifySuccessNotLink('???? ?????t c??u h???i', '');
      window.location.reload();
    });

  }
  public onChange(event: CKEditor4.EventInfo) {
    this.data = event.editor.getData();
  }
  sendAnswer(questionId) {
    this.newAnswer.userId = this.accountid;
    this.newAnswer.answerContent = this.answer.value;
    this.newAnswer.questionId = questionId;

    if(!this.newAnswer.answerContent || this.newAnswer.answerContent.trim()==''){
      return;
    }
    this.answerService.insertAllAnswer(this.newAnswer).subscribe(data => {
      this.questionService.getAllQuestion().subscribe(data => {
        this.listQuestion = data;
        window.location.reload();
      })
    })
  }
}
