/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2016 CERN.
 *
 * ng2-json-editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * ng2-json-editor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ng2-json-editor; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
*/

import { Pipe, PipeTransform } from '@angular/core';
import { Set } from 'immutable';

import { AppGlobalsService } from '../services';
import { JSONSchema } from '../interfaces';

@Pipe({
  name: 'filterHiddenFields',
})
export class FilterHiddenFieldsPipe implements PipeTransform {

  constructor(public appGlobalsService: AppGlobalsService) { }

  /**
   * It filters out `hidden` fields
   *
   * @param keys
   * @param schema - the `schema` that has object schema which contains each key in `keys`
   * @return - filtered keys
   */
  transform(keys: Set<string>, schema: JSONSchema): Set<string> {
    let schemaProps = schema.properties;
    if (!keys) { return undefined; }
    return keys
      .filter(key => {
        if (!schemaProps[key]) {
          throw new Error(`"${key}" is not specified as property in \n${JSON.stringify(schemaProps, undefined, 2)}`);
        }
        return !schemaProps[key].hidden || this.appGlobalsService.adminMode;
      }) as Set<string>;
  }
}