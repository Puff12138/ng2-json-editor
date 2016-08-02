/*
 * This file is part of record-editor.
 * Copyright (C) 2016 CERN.
 *
 * record-editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * record-editor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with record-editor; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
*/

import { Component, Input, ViewEncapsulation} from '@angular/core';

import { AbstractTrackerComponent } from './abstract-tracker';
import { ArrayInArrayFieldComponent } from './array-in-array-field';
import { ObjectArrayFieldComponent } from './object-array-field';
import { ObjectFieldComponent } from './object-field';
import { PrimitiveArrayFieldComponent } from './primitive-array-field';
import { PrimitiveFieldComponent } from './primitive-field';


import { MapToIterablePipe, UnderscoreToSpacePipe } from './shared/pipes';

import {
  JsonUtilService,
  RecordFixerService,
} from './shared/services';

@Component({
  selector: 'editor',
  encapsulation: ViewEncapsulation.None,
  directives: [
    ArrayInArrayFieldComponent,
    PrimitiveArrayFieldComponent,
    PrimitiveFieldComponent,
    ObjectArrayFieldComponent,
    ObjectFieldComponent
  ],
  pipes: [MapToIterablePipe, UnderscoreToSpacePipe],
  providers: [
    JsonUtilService,
    RecordFixerService,
  ],
  styles: [
    require('./editor.component.scss')
  ],
  template: require('./editor.component.html'),
})
export class EditorComponent extends AbstractTrackerComponent {
  // TODO: remove dummy
  @Input() record: Object;
  @Input() schema: Object;

  constructor(private jsonUtilService: JsonUtilService, private recordFixerService: RecordFixerService) {
    super();
  }

  onValueChange(event: any, key: string) {
    this.record[key] = event;
  }

  getType(value: any): string {
    return this.jsonUtilService.getType(value);
  }

  ngOnChanges() {
    this.recordFixerService.fixRecord(this.record, this.schema);
    this.record = this.jsonUtilService.flattenMARCJson(this.record);
  }
}