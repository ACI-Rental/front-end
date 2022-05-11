import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() type: string = 'Create';

  selectOpen: boolean = false;
  currentOption: string = 'Angular';
  options: Array<any> = [
    {
      name: 'Angular',
      abbr: 'angular',
      active: true,
    },
    {
      name: 'Is',
      abbr: 'is',
      active: true,
    },
    {
      name: 'Kak',
      abbr: 'kak',
      active: true,
    },
  ];

  productForm: FormGroup;

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Description', form.value.description);
    console.log('Category', form.value.category);
    console.log('Picture', form.value.picture);
    console.log('Approval', form.value.approval);
  }

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      category: ['angular', [Validators.required]],
      picture: '',
      approval: false
    });
  }

  openSelect() {
    this.selectOpen = !this.selectOpen;
    this.justOpened = true;
    setTimeout(() => (this.justOpened = false), 200);
  }

  changeOption(abbr: any) {
    const updatedOptions = this.options.map((child) => {
      if (abbr === child.abbr) {
        return { ...child, active: true };
      } else {
        return { ...child, active: false };
      }
    });

    this.productForm.get('category')?.patchValue(abbr, { onlySelf: true })

    this.options = updatedOptions;
    this.currentOption = updatedOptions?.find((option) => option.active)?.name;
  }
}
