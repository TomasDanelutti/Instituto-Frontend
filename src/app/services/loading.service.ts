import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    constructor() {
    }

    add() {
        this.loadingSubject.next(true);
    }

    remove() {
        this.loadingSubject.next(false);
    }

}
