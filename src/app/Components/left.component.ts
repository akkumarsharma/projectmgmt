import { Component } from '@angular/core';
import{ ProjectComponent} from './LeftBar/project.component'
import{ ResourceComponent} from './LeftBar/resource.component'

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls:['./left.component.css']
})
export class LeftComponent {
  title = 'app';
}
// class="glyphicon glyphicon-minus"