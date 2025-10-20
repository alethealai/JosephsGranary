import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { CollapseBasicComponent } from 'app/shared/collapse-basic/collapse-basic.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from 'app/shared/carousel/carousel.component';
import { TableComponent } from 'app/shared/table/table.component';
import { AccordionComponent } from 'app/shared/accordion/accordion.component';
import { ProgressbarComponent } from 'app/shared/progressbar/progressbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jhi-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    SharedModule,
    RouterModule,
    CollapseBasicComponent,
    NgbNavModule,
    CarouselComponent,
    TableComponent,
    AccordionComponent,
    ProgressbarComponent,
    CommonModule,
  ],
})
export default class HomeComponent implements OnInit, OnDestroy {
  account = signal<Account | null>(null);
  public btnClicked = false;

  private readonly destroy$ = new Subject<void>();

  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);
  active = 1;

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => this.account.set(account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
