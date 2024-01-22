import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category/category.service'; 
import { Category } from '../../../../shared/models/Category';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../../components/dialog/add-category/add-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryIdActive: number = 0;
  
  @Output() categoryChange = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.handleFetchCategories();
  }

  handleCategoryChange(category: Category) {
    this.categoryIdActive = category.id;
    this.categoryChange.emit(category);
  }

  handleFetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = [{ id: 0, name: 'All' }, ...categories],
      error: (error) => console.log(error),
      complete: () => console.info("")
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      data: null});

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result) {        
        this.handleFetchCategories()
      }
    });
  }
}
