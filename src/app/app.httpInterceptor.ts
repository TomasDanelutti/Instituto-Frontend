import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Store} from '@ngxs/store';
import {catchError, finalize, map} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private store: Store) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
                url: environment.url + req.url,
            }
        );

        return next.handle(req).pipe(map((event: HttpEvent<any>) => event),
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                switch (error.status) {
                    case 401: {
                        this.router.navigate(['/login']);
                        break;
                    }
                    case 403: {
                        this.router.navigate(['/login']);
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return throwError(error);
            }), finalize(() => {
            }));
    }
}
