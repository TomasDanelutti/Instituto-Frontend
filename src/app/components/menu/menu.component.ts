import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Select, Store} from '@ngxs/store';
import {ResetUsuarioLogueado, UsuarioLogueadoState} from '../../state/states/usuarioLogueado.state';
import {Observable} from 'rxjs';
import {Rol} from '../../model/rol';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
    @Select(UsuarioLogueadoState.getRol) rol: Observable<Rol>;
    rutasMenu: MenuItem[];
    rolSeleccionado: Rol;
    constructor(private router: Router,
                private store: Store) {
    }

    ngOnInit() {
        this.rol.subscribe(value => this.rolSeleccionado = value);
        switch (this.rolSeleccionado.idRol) {
            case 0:
                this.rutasMenu = [
                    {label: 'Home', icon: 'pi pi-home', routerLink: '/home'},
                    {label: 'Mi perfil', icon: 'pi pi-book', routerLink: '/mi-perfil'},
                    {label: 'Cursos', icon: 'pi pi-book', routerLink: '/cursos'},
                    {label: 'Salir', icon: 'pi pi-sign-out', command: () => {
                            this.store.dispatch(new ResetUsuarioLogueado());
                            this.router.navigate(['/login'], {replaceUrl: true});
                        } },
                ];
                break;
            case 1:
                this.rutasMenu = [
                    {label: 'Home', icon: 'pi pi-home', routerLink: '/home'},
                    {label: 'Mi perfil', icon: 'pi pi-book', routerLink: '/mi-perfil'},
                    {
                        label: 'Administrar',
                        icon: 'pi pi-cog',
                        items: [{
                            label: 'cursos',
                            icon: 'pi pi-plus',
                            routerLink: '/administrar/cursos'
                        },
                            {
                                label: 'Programas',
                                icon: 'pi pi-plus',
                                routerLink: '/administrar/programas'
                            },
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-plus',
                                items: [{
                                    label: 'Administrativos',
                                    icon: 'pi pi-plus',
                                    routerLink: '/administrar/administrativos'
                                },
                                    {
                                        label: 'Alumnos',
                                        icon: 'pi pi-plus',
                                        routerLink: '/administrar/alumnos'
                                    }]
                            }]
                    },
                    {label: 'Salir', icon: 'pi pi-sign-out', command: () => {
                            this.store.dispatch(new ResetUsuarioLogueado());
                            this.router.navigate(['/login'], {replaceUrl: true});
                        } },
                ];
                break;
            case 2:
                this.rutasMenu = [
                    {label: 'Home', icon: 'pi pi-home', routerLink: '/home'},
                    {label: 'Mi perfil', icon: 'pi pi-book', routerLink: '/mi-perfil'},
                    {label: 'Cursos', icon: 'pi pi-book', routerLink: '/cursos'},
                    {
                        label: 'Administrar',
                        icon: 'pi pi-cog',
                        items: [{
                            label: 'cursos',
                            icon: 'pi pi-plus',
                            routerLink: '/administrar/cursos'
                        },
                            {
                                label: 'Programas',
                                icon: 'pi pi-plus',
                                routerLink: '/administrar/programas'
                            },
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-plus',
                                items: [{
                                    label: 'Administrativos',
                                    icon: 'pi pi-plus',
                                    routerLink: '/administrar/administrativos'
                                },
                                    {
                                        label: 'Alumnos',
                                        icon: 'pi pi-plus',
                                        routerLink: '/administrar/alumnos'
                                    }]
                            }]
                    },
                    {label: 'Salir', icon: 'pi pi-sign-out', command: () => {
                            this.store.dispatch(new ResetUsuarioLogueado());
                            this.router.navigate(['/login'], {replaceUrl: true});
                        } },
                ];
                break;
        }
    }
}
