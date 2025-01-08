import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FeedComponent} from "../../../shared/componets/feed/feed.component";
import {BannerComponent} from "../../../shared/componets/banner/banner.component";
import {PopularTagsComponent} from "../../../shared/componets/popularTags/popularTags.component";
import {FeedTogglerComponent} from "../../../shared/componets/feedToggler/feedToggler.component";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tagFeed.component.html',
  styleUrls: ['./tagFeed.component.css'],
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
export class TagFeedComponent implements OnInit{
  apiUrl: string = '';
  tagName: string = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params["slug"];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }
}
