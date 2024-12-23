import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UtilsService} from "../../services/utils.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  imports: [
    CommonModule,
    RouterLink
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit{
  @Input() total: number = 0;
  @Input() limit: number = 5;
  @Input() currentPage: number = 1;
  @Input() url: string = '';

  pagesCount: number = 1;
  pages: number[] = [];

  constructor(private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
  }
}
