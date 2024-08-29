import { Component } from '@angular/core';
import { ArticleListComponent } from '../../article-list/article-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [ArticleListComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {


  constructor(private fb: FormBuilder, private articleService: ArticleService){}

  articleForm: FormGroup = this.fb.group({
    title: ['', Validators.required, Validators.minLength(3)],
    description:['', Validators.required, Validators.minLength(3)]
  })

  submitted: boolean = false

  message: boolean = false

  private addArticle(): void
  {
    this.articleService.createArticle(this.articleForm.value).subscribe(
      error: err => {
        if (!err) {
          this.message = true
        } 
      }
    )
    this.articleForm.reset()
    this.submitted = false
  }

  public onSubmit(): void
  {
    this.submitted = true
    if (this.articleForm.valid) {
      
      this.addArticle()

    }
  }

  public get form() {
    return this.articleForm.controls
  }

}
