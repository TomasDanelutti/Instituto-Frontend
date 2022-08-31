import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Select, Store} from '@ngxs/store';
import {ResetUsuarioLogueado, UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {Observable} from 'rxjs';
import {Rol} from '../../model/rol';
import {Platform} from "@ionic/angular";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
    @Select(UsuarioLogueadoState.getRol) rol: Observable<Rol>;
    rolSeleccionado: Rol;
    navigate: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private store: Store
    ) {
        this.initializeApp();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.rol.currentValue) {
            this.armarMenu();
        }
    }

    ngOnInit() {
        this.rol.subscribe(value => {
            this.rolSeleccionado = value;
            this.armarMenu();
        });
    }

    armarMenu() {
        switch (this.rolSeleccionado.idRol) {
            case 0:
                this.navigate =
                    [
                        {
                            title : 'Home',
                            url   : '/home',
                            icon  : 'home'
                        },
                        {
                            title: 'Cursos disponibles',
                            url: '/lista-cursos',
                            icon: 'book',
                        },
                        {
                            title : 'Mis cursos',
                            url   : '/lista-cursos',
                            icon  : 'book'
                        },
                        {
                            title : 'Salir',
                            url   : '/login',
                            icon  : 'exit'
                        },
                    ];
                break;
            case 1:
                this.navigate =
                    [
                        {
                            title : 'Home',
                            url   : '/home',
                            icon  : 'home'
                        },
                        {
                            title: 'Cursos disponibles',
                            url: '/lista-cursos',
                            icon: 'book',
                        },
                        {
                            title : 'Mis cursos',
                            url   : '/lista-cursos',
                            icon  : 'book'
                        },
                        {
                            title : 'Administrar programas',
                            url   : '/administrar/programas',
                            icon  : 'build'
                        },
                        {
                            title : 'Administrar cursos',
                            url   : '/administrar/cursos',
                            icon  : 'build'
                        },
                        {
                            title : 'Administrar alumnos',
                            url   : '/administrar/alumnos',
                            icon  : 'build'
                        },
                        {
                            title : 'Salir',
                            url   : '/login',
                            icon  : 'exit'
                        },
                    ];
                break;
            case 2:
                this.navigate =
                    [
                        {
                            title : 'Home',
                            url   : '/home',
                            icon  : 'home'
                        },
                        {
                            title: 'Cursos disponibles',
                            url: '/lista-cursos',
                            icon: 'book',
                        },
                        {
                            title : 'Mis cursos',
                            url   : '/lista-cursos',
                            icon  : 'book'
                        },
                        {
                            title : 'Administrar programas',
                            url   : '/administrar/programas',
                            icon  : 'build'
                        },
                        {
                            title : 'Administrar cursos',
                            url   : '/administrar/cursos',
                            icon  : 'build'
                        },
                        {
                            title : 'Administrar alumnos',
                            url   : '/administrar/alumnos',
                            icon  : 'build'
                        },
                        {
                            title : 'Administrar administrativos',
                            url   : '/administrar/administrativos',
                            icon  : 'build'
                        },
                        {
                            title : 'Salir',
                            url   : '/login',
                            icon  : 'exit'
                        },
                    ];
                break;
        }
    }

    initializeApp() {
        this.platform.ready().then(() => {
        });
    }

}
