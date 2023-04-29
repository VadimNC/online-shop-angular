import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? '', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    year: new FormControl(this.data?.year ?? ''),
    diameter: new FormControl(this.data?.diameter ?? ''),
    material: new FormControl(this.data?.material ?? ''),
    weight: new FormControl(this.data?.weight ?? '')
  });
  isNew: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (this.data) this.isNew = false;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      year: this.myForm.value.year,
      image: "assets/images/bicycle.jpg",
      configure: {
        diameter: this.myForm.value.diameter,
        material: this.myForm.value.material,
        weight: this.myForm.value.weight
      }
    };
    this.dialogRef.close(this.data);
  }
}
