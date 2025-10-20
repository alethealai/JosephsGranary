import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

interface Panel {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'jhi-accordion',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  items: Panel[] = [
    { id: 'panel1', title: '1', content: '第一層內容' },
    { id: 'panel2', title: '2', content: '第二層內容' },
    { id: 'panel3', title: '3', content: '第三層內容' },
    { id: 'panel4', title: '4', content: '第四層內容' },
  ];

  // 用來記錄每個 panel 是否展開
  openPanels: { [key: string]: boolean } = {
    panel1: false,
    panel2: false,
    panel3: false,
    panel4: false,
  };

  togglePanel(panelId: string) {
    if (panelId === 'panel4' && this.openPanels['panel4']) {
      // panel4 收合 → 關閉所有面板
      for (let key in this.openPanels) {
        this.openPanels[key] = false;
      }
    } else {
      // 反轉該 panel 狀態
      this.openPanels[panelId] = !this.openPanels[panelId];
    }
  }

  isOpen(panelId: string): boolean {
    return this.openPanels[panelId];
  }
}
