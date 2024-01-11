import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_QUESTION, GET_ANSWERS } from '../graphql.operations';
import { Router } from '@angular/router';


interface Question {
  id: number;
  text: string;
}

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})


export class DefaultComponent implements OnInit {
  nbr=1;
  ansr: string = '';
  currentQuestionIndex = 0;
  
  questions: Question[] = [
    { id: 1, text: "سؤال 1 : من النبي الذي طلب منه قومه أن ينزل لهم مائدة من السماء ؟" },
    { id: 2, text: "سؤال 2 : من الذي كفل السيدة مريم؟" },
    { id: 3, text: "سؤال 3 : ما هي السجدة التي يأتي بها المصلي في حالة وجود نسيان في أشياء معينة في الصلاة؟" },
    { id: 4, text: "سؤال 4 : ممن آخر امرأة تزوجها رسول الله صلى الله عليه وسلم؟ " },
    { id: 5, text: "سؤال 5 : ما هي السورة التي تسمى قلب القرأن ؟" },
    { id: 6, text: "سؤال 6 :  نبي لقب بالذبيح؟" },
    { id: 7, text: "سؤال 7 : من هو كليم الله؟" },
    { id: 8, text: "سؤال 8 : اسم أول غزوة قادها المسلمون في رمضان؟" },
    { id: 9, text: "سؤال 9 : من هو النبي المرسل إلى قوم عاد؟ " },
    { id: 10, text: "سؤال 10 : إلى أي قوم أرسل النبي صالح؟" }
  ];


  constructor(private apollo: Apollo,private router: Router) { }

  ngOnInit(): void {
  }

  postAnswer(id: any, answer: any): void {
    const stringId = id.toString(); // Convert numeric ID to string
    this.apollo
      .mutate({
        mutation: CREATE_QUESTION,
        variables: {
          id: stringId, // Send string ID to the backend
          answer: answer
        }
      })
      .subscribe({
        next: result => {
          console.log('Mutation result:', result.data);
        },
        error: error => {
          console.log('Mutation error:', error);
        }
      });
  }
  
  onSubmit() {
   
    this.postAnswer(this.nbr.toString(), this.ansr);
    this.ansr=''
       //this.nbr++;
    this.router.navigate(['/grade']);
    
  }
  
  nextQuestion() {
    if (this.currentQuestionIndex < 9) {
      const questionId = this.questions[this.currentQuestionIndex].id;
      console.log(questionId)
      this.postAnswer(questionId.toString(), this.ansr);
      this.ansr = '';
      this.currentQuestionIndex++;
    }else{
     // this.router.navigate(['/grade']);
    }
  }

  
}
