import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ANSWERS } from '../graphql.operations';


interface Answer {
  id: string;
  answer: string;
  score: number;
}

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})

export class GradeComponent implements OnInit {
  answers : Answer[]=[];
  loading = true;
  error: any;
  grade=0;

  questions: string[] = ["سؤال 1 : من النبي الذي طلب منه قومه أن ينزل لهم مائدة من السماء ؟",
  "سؤال 2 : من الذي كفل السيدة مريم؟",
  "سؤال 3 : ما هي السجدة التي يأتي بها المصلي في حالة وجود نسيان في أشياء معينة في الصلاة؟",
  "سؤال 4 : ممن آخر امرأة تزوجها رسول الله صلى الله عليه وسلم؟ ",
  "سؤال 5 : ما هي السورة التي تسمى قلب القرأن ؟",
  "سؤال 6 :  نبي لقب بالذبيح؟",
  "سؤال 7 : من هو كليم الله؟",
  "سؤال 8 : اسم أول غزوة قادها المسلمون في رمضان؟",
  "سؤال 9 : من هو النبي المرسل إلى قوم عاد؟ ",
  "سؤال 10  : إلى أي قوم أرسل النبي صالح؟  "
];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: GET_ANSWERS
    }).valueChanges.subscribe(({ data, loading, errors }) => {
      if (data && data.questions) {
        this.answers = data.questions;
        this.loading = loading;
        this.error = errors;

        this.grade = 0;
        for (const answer of this.answers) {
          this.grade += answer.score;
        }
      }
    });
  }
}

