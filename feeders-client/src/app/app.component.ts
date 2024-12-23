import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopBarComponent} from "./shared/componets/topBar/topBar.component";
import {Store} from "@ngrx/store";
import {authAuctions} from "./auth/store/action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, TopBarComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(authAuctions.getCurrentUser());
  }
}
