import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Settings } from 'src/app/models/settings';
import { NotifyService } from 'src/app/services/notify.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  settings : Settings;
  settingsForm : FormGroup;
  selectedPiece : any = "Продукти";
  selectedGr : any = "Денови за фактура";
  selectedFirst : any = "Прва";
  selectedSecond : any = "Втора";

  constructor(  private router: Router,
    private fb: FormBuilder, 
    private notify : NotifyService,
    private settingsService: SettingsService) { 
      this.settingsForm = fb.group({
        'name': ['', Validators.required],
        'surname': ['', Validators.required],
        'email': ['', Validators.required],
        'mobile': ['', Validators.required],
        'firstShiftStart': ['', Validators.required],
        'secondShiftStart': ['', Validators.required],
        'limitPiece': ['', Validators.required],
        'limitDays': ['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.getSettingsInfo();
    this.getPersonalInfo();
  }

  savePersonalInfo(){
    this.settings = new Settings();

    this.settingsService.savePersonalInfo(this.settings).subscribe(data =>{
      if(data){
        this.notify.showSuccess("", "")
      }else{
        this.notify.showError("Настана грешка!", "")
      }
    });
  }

  saveLimit(){
    this.settings = new Settings();

    this.settings.limitDays = this.settingsForm.controls['limitDays'].value;
    this.settings.limitPiece = this.settingsForm.controls['limitPiece'].value;
    this.settings.companyId = this.companyId;
    console.log(this.settings);
    this.settingsService.saveLimitInfo(this.settings).subscribe(data =>{
      if(data){
        this.notify.showSuccess("Лимитот е успешно зачуван!", "")
        this.getSettingsInfo()
      }else{
        this.notify.showError("Настана грешка!", "")
      }
    });
  }

  saveShift(){
    this.settings = new Settings();
    
    this.settings.firstShiftStart = this.settingsForm.controls['firstShiftStart'].value
    this.settings.secondShiftStart = this.settingsForm.controls['secondShiftStart'].value
    this.settings.companyId = this.companyId;

    this.settingsService.saveShiftInfo(this.settings).subscribe(data =>{
      if(data){
        this.notify.showSuccess("Времето за смени е успешно зачувано!", "")
        this.getSettingsInfo()
      }else{
        this.notify.showError("Настана грешка!", "")
      }
    });
  }

  getSettingsInfo(){
    this.settingsService.getSettingsInfo(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
          console.log(data);
          this.settingsForm.controls['limitPiece'].setValue(data[0].limitPiece);
          this.settingsForm.controls['limitDays'].setValue(data[0].limitDays);
          this.settingsForm.controls['firstShiftStart'].setValue(data[0].firstShiftStart);
          this.settingsForm.controls['secondShiftStart'].setValue(data[0].secondShiftStart);
      }
    });
  }


  getPersonalInfo(){
    this.settingsService.getManager(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
          console.log(data);
          this.settingsForm.controls['name'].setValue(data[0].name);
          this.settingsForm.controls['surname'].setValue(data[0].surname);
          this.settingsForm.controls['email'].setValue(data[0].email);
      }
    });
  }
}
