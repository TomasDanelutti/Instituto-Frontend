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
import {MessagesService} from "./services/messages.service";
import {InterceptorService} from "./services/interceptor.service";
import {LogoutAction} from "./state/states/auth.state";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private messagesService: MessagesService,
        private interceptorService: InterceptorService,
        private store: Store) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.interceptorService.armarHttpRequest(req);

        // Aca muestro barra de progreso

        // ¿Enviamos peticion? No se que goma hace esto.
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => event),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/login']);
                    this.store.dispatch(new LogoutAction());
                    this.messagesService.showMessage('Atención', 'Su sesión ha caducado, ' +
                        'por favor inicie una nueva', 5000);
                }

                return throwError(error);
            }),
            finalize(() => {
                // Termina la comunicaciónn y ocultamos barra de progreso
            })
        );
    }
}
