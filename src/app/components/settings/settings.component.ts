import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private notifyService : NotifyService) { }

  ngOnInit(): void {

  }

  succ(){
      this.notifyService.showSuccess("Успешно снимено", "Успешно снимено")
  }
}
