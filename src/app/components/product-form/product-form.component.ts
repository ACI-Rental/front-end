import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageService } from 'src/app/services/image/image.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() productId: any = null;
  @Output() productIdChange = new EventEmitter<any>();

  selectOpen: boolean = false;
  currentOption: string = 'Select a category...';
  options: Array<any> = [];

  imgFile: any;

  productForm: FormGroup;

  private justOpened = false;

  private optionsRef: any;
  @ViewChild('optionsBx', { static: false }) set optionsBx(elRef: ElementRef) {
    this.optionsRef = elRef;
  }

  @HostListener('document:click', ['$event'])
  onClick(ev: any) {
    ev.stopPropagation();

    if (
      this.selectOpen &&
      ev.target !== this.optionsRef?.current &&
      !this.optionsRef?.current?.contains(ev.target) &&
      !this.justOpened
    ) {
      this.selectOpen = false;
    }
  }

  constructor(private fb: FormBuilder, private productService: ProductService, private categoryService: CategoryService, private imageService: ImageService) { }

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe((response) => {
      this.options = response.map((category: any) => ({
        name: category?.name,
        key: category?.id,
        active: false
      }))
    })


    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      categoryId: [-1, [Validators.required]],
      requiresApproval: [false, [Validators.required]],
      image: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['productId']?.currentValue !== null) {
      this.productService.getProduct(this.productId).subscribe((product) => {
        this.productForm.setValue({
          name: product?.name,
          description: product?.description,
          categoryId: product?.categoryId,
          requiresApproval: product?.requiresApproval,
          image: `http://127.0.0.1:10000/devstoreaccount1/productimages/${this.productId}.png`
        })

        this.changeOption(product?.categoryId)
      })
    }
  }

  openSelect() {
    this.selectOpen = !this.selectOpen;
    this.justOpened = true;
    setTimeout(() => (this.justOpened = false), 200);
  }

  autoScaleTextarea(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  changeOption(key: any) {
    const updatedOptions = this.options.map((child) => {
      if (key === child.key) {
        return { ...child, active: true };
      } else {
        return { ...child, active: false };
      }
    });

    this.productForm.patchValue({ categoryId: key });

    this.options = updatedOptions;
    this.currentOption = updatedOptions?.find((option) => option.active)?.name;
  }


  onSubmit(form: FormGroup): void {
    if (!form.valid) {
      this.Notify('error', 'Please fill in all required fields.')

      return;
    }

    if (this.productId === null) {
      const data: any = {
        ...this.productForm.value,
        description: this.productForm.value?.description || "",
        isDeleted: false,
      }

      this.productService.createProduct(data).subscribe((response: any) => {
        if (!response.error) {
          this.Notify('success', 'Product created!')

          this.productIdChange.emit(null);
        }
      },
        (err) => {
          this.Notify('error', err.error.message || 'Something went wrong.')
        })
    } else {
      const data: any = {
        ...this.productForm.value,
        id: this.productId,
      }

      console.log(data.image)
      if (data.image !== null) {


        const formData = new FormData();
        console.log(this.imgFile)
        formData.append('image', this.imgFile, this.imgFile.name);
        formData.append('productId', data.id);

        // const imageData: any = {
        //   productId: this.productId,
        //   image: data.image
        // }
        this.imageService.postImage(formData).subscribe((response: any) => {
          if (!response.error) {
            console.log("yessss")
          }

        },
          (err) => {
            console.log(err)
          })
      }

      this.productService.editProduct(data).subscribe((response: any) => {
        if (!response.error) {
          this.Notify('success', 'Product updated!')

          this.productIdChange.emit(null);
        }
      },
        (err) => {
          this.Notify('error', err.error.message || 'Something went wrong.')
        })
    }
  }

  onImageChange(e: any) {

    this.imgFile = e.target.files[0];
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
