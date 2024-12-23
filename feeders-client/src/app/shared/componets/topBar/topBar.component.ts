import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Store} from "@ngrx/store";
import {selectCurrentUser} from "../../../auth/store/reducers";
import {combineLatest} from "rxjs";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser)
  });

  constructor(private store: Store) {
  }
}
