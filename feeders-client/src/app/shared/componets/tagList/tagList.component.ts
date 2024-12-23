import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PopularTagType} from "../../types/popularTag.type";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tagList.component.html',
  imports: [
    CommonModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent {
  @Input() tags: PopularTagType[] = [];

  constructor() {
  }
}
