import {FormControl, Validators} from '@angular/forms';

export class ValidatorsCharacters {
  static EmailAddress = Validators.pattern('[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+');
  static PhoneFax = Validators.pattern('^0[0-9]*$');
  static Password = Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
  static Username = Validators.pattern('^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');
  // tslint:disable-next-line:max-line-length
  static EmailPattern = Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  static datePattern(control:FormControl): { [key: string]: any }{
    let date =new Date( control.value);
    let dateNow = new Date();
    console.log(date+"  "+dateNow)
    if (date <= dateNow) {
     return {"datePattern":true};
    }
    else{
      return null;
    }
  }
}
