import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // 加入 ReactiveFormsModule
import { AsyncPipe, NgFor } from '@angular/common'; // 如果 HTML 有用 async pipe

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap'; // 引入 NgbHighlight

import { of } from 'rxjs'; // 引入 of 來創建一個簡單的 Observable

interface ChurchReport {
  subregions: string;
  baseline: number;
  target: number;
  attendance: number;
  GrowthRate: number;
  MorningandEveningRevival: number;
  MERRate: number;
  PrayerMeeting: number;
  PMRate: number;
  BaptismCumulative: number;
}

const CHURCH_REPORT93: ChurchReport[] = [
  {
    subregions: '3-2',
    baseline: 17,
    target: 24,
    attendance: 19,
    GrowthRate: -8,
    MorningandEveningRevival: 15,
    MERRate: 88,
    PrayerMeeting: 9,
    PMRate: 53,
    BaptismCumulative: 1,
  },
  {
    subregions: '3-7',
    baseline: 13,
    target: 19,
    attendance: 14,
    GrowthRate: -2,
    MorningandEveningRevival: 12,
    MERRate: 92,
    PrayerMeeting: 7,
    PMRate: 54,
    BaptismCumulative: 2,
  },
];

function searchReport(text: string, pipe: PipeTransform): ChurchReport[] {
  const term = text.toLowerCase();
  return CHURCH_REPORT93.filter(
    report =>
      report.subregions.toLowerCase().includes(term) ||
      pipe.transform(report.baseline).includes(term) ||
      pipe.transform(report.target).includes(term) ||
      pipe.transform(report.attendance).includes(term) ||
      pipe.transform(report.GrowthRate).includes(term) ||
      pipe.transform(report.MorningandEveningRevival).includes(term) ||
      pipe.transform(report.MERRate).includes(term) ||
      pipe.transform(report.PrayerMeeting).includes(term) ||
      pipe.transform(report.PMRate).includes(term) ||
      pipe.transform(report.BaptismCumulative).includes(term),
  );
}
@Component({
  selector: 'jhi-table',
  standalone: true,
  templateUrl: './table.component.html',
  providers: [DecimalPipe],
  imports: [DecimalPipe, ReactiveFormsModule, AsyncPipe, NgbHighlight, NgFor],
})
export class TableComponent {
  lookingfor$: Observable<ChurchReport[]>;
  filter = new FormControl('', { nonNullable: true });

  constructor(pipe: DecimalPipe) {
    //只留下有關鍵字的那行表格
    this.lookingfor$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => searchReport(text, pipe)),
    );

    //讓表格裡的關鍵字粗體
    // this.lookingfor$ = of(CHURCH_REPORT93);
  }
}
