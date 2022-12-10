import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';;
import {Select, Store} from '@ngxs/store';
import {ResetUsuarioLogueado, UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {Observable} from 'rxjs';
import {Rol} from '../../model/rol';
import {MenuController, Platform} from "@ionic/angular";
import {Usuario} from "../../model/Usuario";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
    @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioState: Observable<Usuario>;
    rolSeleccionado: Rol;
    usuario: Usuario;
    navigate: any;

    constructor(
        private platform: Platform,
        private router: Router,
        private store: Store,
        private menu: MenuController
    ) {
        this.initializeApp();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.rol.currentValue) {
            this.armarMenu();
        }
    }

    ngOnInit() {
        this.usuarioState.subscribe(value => {
            if (value) {
                this.usuario = value
                this.rolSeleccionado = value.rol;
                this.armarMenu();
            }
        });
    }

    closeMenu() {
        this.menu.close('menu');
        // console.log(this.navigate.isActive())
        this.navigate.closed();
        this.navigate.close
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
                            title : 'Mi Perfil',
                            url   : '/mi-perfil',
                            icon  : 'logo-snapchat'
                        },
                        {
                            title: 'Cursos disponibles',
                            url: '/lista-cursos',
                            icon: 'book',
                        },
                        {
                            title : 'Mis cursos',
                            url   : '/mis-cursos',
                            icon  : 'book'
                        },
                        {
                            title : 'Salir',
                            url   : '/login',
                            icon  : 'exit',

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
                            title : 'Mi Perfil',
                            url   : '/mi-perfil',
                            icon  : 'logo-snapchat'
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
                            title : 'Administrar empleados',
                            url   : '/administrar/empleados',
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
                            title : 'Mi Perfil',
                            url   : '/mi-perfil',
                            icon  : 'logo-snapchat'
                        },
                        {
                            title: 'Cursos disponibles',
                            url: '/lista-cursos',
                            icon: 'book',
                        },
                        {
                            title : 'Mis cursos',
                            url   : '/mis-cursos',
                            icon  : 'book'
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
                            title : 'Administrar empleados',
                            url   : '/administrar/empleados',
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



    salir(title: string | HTMLTitleElement | SVGTitleElement) {
        if (title === "Salir") {
            this.store.dispatch(new ResetUsuarioLogueado());
            this.router.navigate(['/login'], {replaceUrl: true});
        }
    }
}
