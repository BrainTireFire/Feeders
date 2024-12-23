import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FeedComponents} from "../../../shared/componets/feed/feed.components";
import {BannerComponent} from "../../../shared/componets/banner/banner.component";
import {PopularTagsComponent} from "../../../shared/componets/popularTags/popularTags.component";
import {FeedTogglerComponent} from "../../../shared/componets/feedToggler/feedToggler.component";

@Component({
  selector: 'app-global-feed',
  templateUrl: './globalFeed.component.html',
  styleUrls: ['./globalFeed.component.css'],
  imports: [
    CommonModule,
    FeedComponents,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalFeedComponent {
  apiUrl = '/articles';

  constructor(

  ){
  }

}
