import {ChangeDetectionStrategy, Component, computed, inject, OnChanges, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {userProfileActions} from "../store/actions";
import {combineLatest, filter, map} from "rxjs";
import {selectError, selectIsLoading, selectUserProfileData} from "../store/reducers";
import {selectCurrentUser} from "../../auth/store/reducers";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {UserProfileInterface} from "../types/userProfile.interface";
import {FeedComponent} from "../../shared/componets/feed/feed.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FeedComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store);
  router = inject(Router);

  slug: string = '';
  isCurrentUserProfile$ =  combineLatest({
    currentUser: this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUserInterface | null =>
       currentUser !== undefined),
    ),
    userProfile: this.store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfileInterface =>
        Boolean(userProfile)),
    ),
  }).pipe(
    map(({currentUser, userProfile}) =>  {
      return currentUser?.username === userProfile.username;
    })
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    userProfile: this.store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  // Signals
  // isLoading = this.store.selectSignal(selectIsLoading);
  // foo = computed(() =>
  //   this.isLoading() ? "true" : "false"
  // );

  // constructor(private store: Store, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.slug = params['slug']
      this.fetchUserProfile();
    });
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites ?
      `/articles?favorited=${this.slug}` :
      `/articles?author=${this.slug}`;
  }

  private fetchUserProfile() {
    // if (!this.slug) {
    //   throw new Error('Slug is not defined');
    // }
    this.store.dispatch(userProfileActions.getUserProfile({slug: this.slug}));
  }
}
