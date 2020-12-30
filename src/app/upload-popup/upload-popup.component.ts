import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DogsService } from '../services/all-dogs/dogs.service';



@Component({
  selector: 'app-upload-popup',
  templateUrl: './upload-popup.component.html',
  styleUrls: ['./upload-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadPopupComponent implements OnInit {

  url = '';
  dogForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private dogsService: DogsService) { }

  ngOnInit() {
    this.dogForm = new FormGroup({
      'dogPhoto': new FormControl(null),
      'dogTitle': new FormControl(null),
      'dogDescription': new FormControl(null),
      'dogPassword': new FormControl(null),
    })
  }
  dog: {
    title: string,
    description: string,
    src: string,
    pawFive: number 
  }
  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.url = event.target.result as string;
      }
    }
  }

  onSubmit() {

    var value = this.dogForm.value.dogPassword,
    sum = 0, num = 0;
    while (value) {
        sum += value % 10;
        value = Math.floor(value / 10);
    }
    while (sum >= 10) {
      value = sum;
      while (value) {
        sum += value % 10;
        value = Math.floor(value / 10);
        console.log(sum);
      }
    }

    // if (num < 10 && sum !== 0) {
    //   value = sum;
    //   sum = 0;
    //   while (value) {
    //       sum = sum + value % 10;
    //       value = Math.floor(value / 10);
    //   }
    //   var num = sum;

    // }

console.log(sum);





    console.log(this.dogForm.value);
    this.dog = {
      title: this.dogForm.value.dogTitle,
      description: this.dogForm.value.dogDescription,
      src: this.url,
      pawFive: 0,
    }
    this.dogsService.setDogs(this.dog);
  }




}