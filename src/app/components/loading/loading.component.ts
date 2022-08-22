import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loading: Observable<boolean> = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() { }

}
