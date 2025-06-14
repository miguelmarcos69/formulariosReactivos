import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { reacveRoutes } from '../../../reactive/reactive.routes';

interface MenuItem {
  title: string;
  route: string;
}
//para comprobar que siempre hay rutas y  no caer un undefined
const reactiveItems = reacveRoutes[0].children ?? [];
@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter((item) => item.path !== '**')
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Registro',
      route: './auth',
    },
  ];
  country: MenuItem[] = [
    {
      title: 'Países',
      route: './country',
    },
  ];
}
