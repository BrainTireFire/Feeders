import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ArticleFormValuesInterface} from "../types/articleFormValues.interface";
import {BackendErrorsInterface} from "../../../types/backendErrors.interface";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {BackendErrorMessagesComponent} from "../../backendErrorMessages/backendErrorMessages.component";

@Component({
  selector: 'app-article-form',
  templateUrl: './articleForm.component.html',
  imports: [
    CommonModule,
    BackendErrorMessagesComponent,
    ReactiveFormsModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFormComponent implements OnInit{
  @Input() initialValues?: ArticleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  form = this.fb.nonNullable.group({
    title: "",
    description: "",
    body: "",
    tagList: "",
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    if(!this.initialValues) {
      throw new Error("Inputs are not provided");
    }

    this.form.patchValue({
      title: this.initialValues?.title,
      description: this.initialValues?.description,
      body: this.initialValues?.body,
      tagList: this.initialValues?.tagList.join(" "),
    });
  }

  onSubmit() {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(" "),
    }
    this.articleSubmit.emit(articleFormValues);
  }
}
