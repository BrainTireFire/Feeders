import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectCurrentUser} from "../../../auth/store/reducers";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feedToggler.component.html',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedTogglerComponent {
  @Input() tagName?: string;

  currentUser$ = this.store.select(selectCurrentUser);

  constructor(private store: Store) {
  }

}
