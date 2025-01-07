import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ArticleFormValuesInterface} from "../../shared/componets/articleForm/types/articleFormValues.interface";
import {ArticleFormComponent} from "../../shared/componets/articleForm/components/articleForm.component";
import {select, Store} from "@ngrx/store";
import {combineLatest, filter, map, Observable} from "rxjs";
import {selectIsSubmitting, selectValidationErrors, selectIsLoading, selectArticle} from "../store/reducers";
import {ArticleRequestInterface} from "../../shared/types/articleRequest.interface";
import {editArticleActions} from "../store/actions";
import {LoadingComponent} from "../../shared/componets/loading/loading.component";
import {ActivatedRoute} from "@angular/router";
import {ArticleInterface} from "../../shared/types/article.interface";

@Component({
  selector: 'app-edit-article',
  templateUrl: './editArticle.component.html',
  imports: [
    CommonModule,
    ArticleFormComponent,
    LoadingComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    })
  );
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  data$ = combineLatest({
    article: this.store.select(selectArticle),
    isLoading: this.store.select(selectIsLoading),
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    initialValues: this.initialValues$
  });

  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues
    };
    this.store.dispatch(editArticleActions.updateArticle({request, slug: this.slug}));
  }
}
