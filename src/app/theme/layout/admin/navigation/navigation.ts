import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'shopfloor',
    title: 'Shop Floor',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        icon: 'feather icon-users',
        url: '/users'
      },
      {
        id: 'schedule',
        title: 'Schedule',
        type: 'item',
        icon: 'feather icon-server',
        url: '/schedule'
      },
      {
        id: 'part',
        title: 'Part',
        type: 'collapse',
        icon: 'feather icon-mail',
        children: [
          {
            id: 'partlist',
            title: 'Part List',
            type: 'item',
            url: '/part'
          }
        ]
      },
      {
        id: 'operation',
        title: 'Operation',
        type: 'collapse',
        icon: 'feather icon-server',
        children: [
          {
            id: 'operationentry',
            title: 'Operation Entry',
            type: 'item',
            url: '/operationentry'
          }
        ]
      },
      {
        id: 'technician',
        title: 'Technician',
        type: 'collapse',
        icon: 'feather icon-server',
        children: [
          {
            id: 'technicianentry',
            title: 'Technician Entry',
            type: 'item',
            url: '/technicianentry'
          }
        ]
      }
    ]
  },
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
