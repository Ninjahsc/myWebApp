import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {

  coordinates = {};
  loginForm;
  topics = ['Cricket', 'Writing', 'Drawing', 'Dance', 'Other'];
  fruits = ['Orange', 'Mango', 'Apple'];
  selectFruits;
  list: any[];
  radioItems: Array<string>;
  model   = {option: 'Male'};
  cookieOne = false;
  constructor() { 
    this.radioItems = ['Male', 'Female', 'Other'];
    this.list = [
      {
        id: 1,
        title: 'Gym',
        checked: true,
      },
      {
        id: 2,
        title: 'Lunch',
        checked: false,
      },
      {
        id: 3,
        title: 'Dinner',
        checked: false,
      },
      {
        id: 4,
        title: 'Sleep',
        checked: false,
      },
    ]
    
  }

  ngOnInit(): void {
    
  }

  get result() {
    // let data = this.list.filter(item => item.checked);
    return this.list.filter(item => item.checked);
  }

  select(item) {
    this.selectFruits = item;
    // console.log(item)
  }

  formData = {
    product: "",
    name: "",
    email: "",
    fruit: "",
    phoneNumber: "",
    queryData: "",
    list:{ }
  }

  onFormSubmit(loginForm) {
    this.formData['fruit'] = this.selectFruits;
    this.formData['list'] =  this.list.filter(item => item.checked);
    this.coordinates = this.formData;
    localStorage.setItem('UserData', JSON.stringify(this.coordinates));
    // console.log(this.formData,"this.formData")
    alert("Data Store In localStorage")
    loginForm.resetForm();
  }

}
