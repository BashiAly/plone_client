import {Component} from '@angular/core';
import {ObjectService} from '../../services/object.service';
import {Router} from '@angular/router';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Registry} from '../app/registry.ts';
import {Location} from '@angular/common';
import {ObjectUtility} from '../../injectors/object';


@Component({
  selector: 'plone-navigation', // <app></app>
  directives: [
    ...ROUTER_DIRECTIVES,
  ],
  providers: [ObjectService, ObjectUtility],
  template: require('./navigation.component.html')
})
export class Navigation {
  items = [];

  constructor(private router: Router,
              private objectService: ObjectService,
              public utility: ObjectUtility) { }

  ngOnInit() {
    this.objectService.get(this.utility.getCurrentPath() + '/@components/navigation').subscribe(res => {
      var data = res.json();
      if(data instanceof Array){
        data = data[0];
      }
      this.items = data.data.items;
    });
  }

}

Registry.registerComponent('plone.navigation', Navigation);
