import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, Validators} from '@angular/forms';
import {Answer} from '../../models/answer';
import {HeaderserviceService} from '../../service/userservice/headerservice.service';
import {TopicserviceService} from '../../service/userservice/topicservice.service';
import {AuthenticationService} from '../../service/authentication.service';
import {QuestionserviceService} from '../../service/userservice/questionservice.service';
import {AnswerserviceService} from '../../service/userservice/answerservice.service';
import {CKEditor4} from 'ckeditor4-angular';
import {question} from '../../models/question';
import { NotifyService } from 'src/app/service/notify.service';

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
  test = '<p>hi</p>';
  question: question = new question();
  newAnswer: Answer = new Answer();

  constructor(private headerService: HeaderserviceService, private toppicService: TopicserviceService, private notify: NotifyService,
              private authenticate: AuthenticationService, private questionService: QuestionserviceService,
              private answerService: AnswerserviceService) {
  }

  post = false;

  ngOnInit() {
    this.headerService.setActive('ask-answer');
    this.question.userId = this.authenticate.currentUserValue.id;
    this.accountid = this.authenticate.currentUserValue.id;
    this.toppicService.getAllTopics().subscribe(data => {
      this.listTopics = data;
    });
    this.questionService.getAllQuestion().subscribe(data => {
      this.listQuestion = data;
    });
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
      this.notify.notifySuccessNotLink('Đã đặt câu hỏi', '');
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
      // tslint:disable-next-line:no-shadowed-variable
      this.questionService.getAllQuestion().subscribe(data => {
        this.listQuestion = data;
      });
    });
  }
}
