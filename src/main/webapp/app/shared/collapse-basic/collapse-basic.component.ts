import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  selector: 'jhi-collapse-basic',
  imports: [NgbCollapseModule],
  templateUrl: './collapse-basic.component.html',
})
export class CollapseBasicComponent {
  isCollapsed = false;
}
