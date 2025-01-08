import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FeedComponent} from "../../../shared/componets/feed/feed.component";
import {BannerComponent} from "../../../shared/componets/banner/banner.component";
import {PopularTagsComponent} from "../../../shared/componets/popularTags/popularTags.component";
import {FeedTogglerComponent} from "../../../shared/componets/feedToggler/feedToggler.component";

@Component({
  selector: 'app-your-feed',
  templateUrl: './yourFeed.component.html',
  styleUrls: ['./yourFeed.component.css'],
  imports: [
    CommonModule,
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourFeedComponent {
  apiUrl = '/articles/feed';
}
