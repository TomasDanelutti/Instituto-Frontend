import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';;
import {Select, Store} from '@ngxs/store';
import {ResetUsuarioLogueado, UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {Observable} from 'rxjs';
import {Rol} from '../../model/rol';
import {MenuController, Platform} from "@ionic/angular";
import {Persona} from "../../model/Persona";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
    @Select(UsuarioLogueadoState.getUsuarioLogueado) usuarioState: Observable<Persona>;
    rolSeleccionado: Rol;
    usuario: Persona;
    navigate: any;
    dialogDatosPersonales = false;

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
            else {
                this.usuario = new Persona();
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
        switch (this.rolSeleccionado?.idRol) {
            case 2:
                this.navigate =
                    [
                        {
                            title : 'Home',
                            url   : '/home',
                            icon  : 'home'
                        },
                        {
                            title : 'Datos personales',
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
                            title : 'Datos personales',
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
            case 0:
                this.navigate =
                    [
                        {
                            title : 'Home',
                            url   : '/home',
                            icon  : 'home'
                        },
                        {
                            title : 'Datos personales',
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
        switch (title) {
            case "Datos personales":
                this.dialogDatosPersonales = true;
                break;
            case "Salir":
                this.store.dispatch(new ResetUsuarioLogueado());
                console.log(this.usuario)
                this.router.navigate(['/login'], {replaceUrl: true});
                break;
        }
    }
    cerrarDialogDatosPersonales($event: boolean) {
        this.dialogDatosPersonales = $event;
    }
}
