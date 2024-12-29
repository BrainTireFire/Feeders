import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ArticleFormValuesInterface} from "../../shared/componets/articleForm/types/articleFormValues.interface";
import {ArticleFormComponent} from "../../shared/componets/articleForm/components/articleForm.component";
import {Store} from "@ngrx/store";
import {combineLatest} from "rxjs";
import {selectIsSubmitting, selectValidationErrors} from "../store/reducers";
import {ArticleRequestInterface} from "../../shared/types/articleRequest.interface";
import {createArticleActions} from "../store/actions";

@Component({
  selector: 'app-create-article',
  templateUrl: './createArticle.component.html',
  imports: [
    CommonModule,
    ArticleFormComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticleComponent {
  initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(private store: Store) {
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    };
    this.store.dispatch(createArticleActions.createArticle({request}));
  }
}
