import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service'; 
import { Category } from '../../../../shared/models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  idCategoryIncrement: number = 2;
  
  @Input() categoryIdActive: number = 0;
  @Input() isOpenCreateCategoryState: boolean = false;
  @Output() isOpenCreateCategoryPopupChange = new EventEmitter<boolean>();
  @Output() categoryChange = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = [{ id: 0, name: 'All' }, ...categories],
      error: (error) => console.log(error),
      complete: () => console.info("Fetch categories")
    })
  }

  handleCategoryChange(category: Category) {
    this.categoryChange.emit(category);
  }

  handleClickCreateCategory() {
    this.isOpenCreateCategoryPopupChange.emit(!this.isOpenCreateCategoryState);
  }
}
