import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {ArticleRequestInterface} from "../../shared/types/articleRequest.interface";
import {ArticleInterface} from "../../shared/types/article.interface";
import {ArticleResponseInterface} from "../../shared/types/articleResponse.interface";

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {

  }

  createArticle(articleRequest: ArticleRequestInterface): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles`;

    return this.http
      .post<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map( (response) => response.article));
  }
}
