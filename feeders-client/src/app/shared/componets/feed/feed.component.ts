import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {feedActions} from "./store/actions";
import {combineLatest, map} from "rxjs";
import {selectError, selectFeedData, selectIsLoading} from "./store/reducers";
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {ErrorMessageComponent} from "../errorMessage/errorMessage.component";
import {LoadingComponent} from "../loading/loading.component";
import {environment} from "../../../../environments/environment.development";
import {PaginationComponent} from "../pagination/pagination.component";
import queryString from 'query-string';
import {TagListComponent} from "../tagList/tagList.component";
import {AddToFavoritesComponent} from "../addToFavorites/addToFavorites.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';

  //temp because backend has not correct images
  urlImage: string = "https://img.freepik.com/free-vector/abstract-grunge-halftone-circles-textured-background-design_84443-21954.jpg?t=st=1734884951~exp=1734888551~hmac=2c7a7744cf1b17a3ffe1dd0f8f42b06d87aba4893bd1c9a287389db231370482&w=826";

  data$ = combineLatest([
    this.store.select(selectIsLoading),
    this.store.select(selectError),
    this.store.select(selectFeedData),
  ]).pipe(
    map(([isLoading, error, feed]) => ({
      isLoading,
      error,
      feed,
    }))
  );
  limit: number = environment.limit;
  baseUrl = this.router.url.split("?")[0];
  currentPage: number = 0;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params["page"] || 1);
      this.fetchFeed();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged: boolean = !changes['apiUrl'].firstChange
      && changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if(isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
  }
}
