import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @Input() categoryId: any = null;
  @Output() categoryIdChange = new EventEmitter<any>();

  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (
    //   changes?.['productId']?.currentValue !== null &&
    //   typeof changes?.['productId']?.currentValue !== 'undefined'
    // ) {
    //   this.categoryService
    //     .getCategory(changes?.['productId']?.currentValue)
    //     .subscribe((product) => {
    //       this.productForm.setValue({
    //         name: product?.name,
    //         description: product?.description,
    //         location: product?.location,
    //         categoryId: product?.categoryId,
    //         catalogPosition: product?.catalogPosition + 1,
    //         requiresApproval: product?.requiresApproval,
    //       });
    //       this.changeOption(product?.categoryId);
    //     });
    // }
    // if (typeof changes?.['maxPos']?.currentValue === 'number') {
    //   this.productForm?.controls['catalogPosition']?.setValidators([
    //     Validators.required,
    //     Validators.min(1),
    //     Validators.max(changes?.['maxPos']?.currentValue),
    //   ]);
    // }
  }

  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      this.Notify('error', 'Please fill in all required fields.');

      return;
    }

    const data: any = {
      name: this.categoryForm.value?.name,
    };

    this.categoryService.createCategory(data).subscribe(
      (response: any) => {
        if (!response.error) {
          this.Notify('success', 'Category created!');
        }
      },
      (err) => {
        this.Notify('error', err.error.message || 'Something went wrong.');
      }
    );
  }

  Notify(status: SweetAlertIcon, message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      title: message,
      icon: status,
    });
  }
}
