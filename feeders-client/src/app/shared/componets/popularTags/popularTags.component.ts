import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {popularTagsActions} from "./store/actions";
import {combineLatest, map} from "rxjs";
import {selectError, selectIsLoading, selectPopularTagsData} from "./store/reducers";
import {LoadingComponent} from "../loading/loading.component";
import {ErrorMessageComponent} from "../errorMessage/errorMessage.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popularTags.component.html',
  imports: [
    CommonModule,
    LoadingComponent,
    ErrorMessageComponent,
    RouterLink
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularTagsComponent implements OnInit {

  data$ = combineLatest([
    this.store.select(selectIsLoading),
    this.store.select(selectError),
    this.store.select(selectPopularTagsData),
  ]).pipe(
    map(([isLoading, error, popularTags]) => ({
      isLoading,
      error,
      popularTags,
    }))
  );

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
