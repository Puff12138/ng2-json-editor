webpackJsonp(["main"],{

/***/ "../../../../../dist/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__("../../../../../dist/src/index.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["a"]; });
/**
 * @module
 * @description
 * Entry point for all public APIs of ng2-json-editor module.
 */



/***/ }),

/***/ "../../../../../dist/src/abstract-field/abstract-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_subscriber__ = __webpack_require__("../../../../../dist/src/abstract-subscriber/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * This is the base class for fields
 * WARNING:
 *  XFieldComponent which extends this class should have all services in this constructor, in their constructor!
 *  EX: constructor(...public appGlobalService: AppGlobalService, ...) {...}
 *
 * It provides trackByFunction from AbstractTrackerComponent, and handles errors for the component.
 */
var AbstractFieldComponent = (function (_super) {
    __extends(AbstractFieldComponent, _super);
    function AbstractFieldComponent(appGlobalsService, problemsService, pathUtilService, changeDetectorRef, jsonStoreService) {
        var _this = _super.call(this) || this;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.pathUtilService = pathUtilService;
        _this.changeDetectorRef = changeDetectorRef;
        _this.jsonStoreService = jsonStoreService;
        _this.pathCache = {};
        _this.externalErrors = [];
        _this.jsonPatches = [];
        return _this;
    }
    AbstractFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.problemsService.externalCategorizedProblems$
            .takeUntil(this.isDestroyed)
            .subscribe(function (externalCategorizedProblemMap) {
            _this.externalErrors = externalCategorizedProblemMap.errors[_this.pathString] || [];
            _this.changeDetectorRef.markForCheck();
        });
        this.jsonStoreService.patchesByPath$
            .map(function (patchesByPath) { return patchesByPath[_this.pathString]; })
            .takeUntil(this.isDestroyed)
            .subscribe(function (patches) {
            _this.jsonPatches = patches || [];
            _this.removeJsonPatch = _this.jsonPatches
                .find(function (patch) { return patch.op === 'remove'; });
            _this.changeDetectorRef.markForCheck();
        });
    };
    AbstractFieldComponent.prototype.ngOnChanges = function (changes) {
        if (changes['path']) {
            this.pathString = this.pathUtilService.toPathString(this.path);
        }
    };
    /**
     * Gets path for child, returns from `pathCache` if it is a hit
     * in order not to re-render child component due to reference change its path.
     *
     * @param key - index or field name for child
     */
    AbstractFieldComponent.prototype.getPathForChild = function (key) {
        if (!this.pathCache[key] || this.pathCache[key][this.path.length - 1] !== this.path[this.path.length - 1]) {
            this.pathCache[key] = this.path.concat(key);
        }
        return this.pathCache[key];
    };
    AbstractFieldComponent.prototype.hasErrors = function () {
        return this.externalErrors.length > 0;
    };
    Object.defineProperty(AbstractFieldComponent.prototype, "disabled", {
        get: function () {
            return this.schema.disabled && !this.appGlobalsService.adminMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractFieldComponent.prototype, "redLeftBorderClass", {
        get: function () {
            return this.removeJsonPatch ? 'red-left-border' : '';
        },
        enumerable: true,
        configurable: true
    });
    AbstractFieldComponent.prototype.trackByElement = function (index, element) {
        return element;
    };
    AbstractFieldComponent.prototype.trackByIndex = function (index, element) {
        return index;
    };
    return AbstractFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_0__abstract_subscriber__["a" /* AbstractSubscriberComponent */]));



/***/ }),

/***/ "../../../../../dist/src/abstract-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_field_component__ = __webpack_require__("../../../../../dist/src/abstract-field/abstract-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__abstract_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/abstract-list-field/abstract-list-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractListFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_field__ = __webpack_require__("../../../../../dist/src/abstract-field/index.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Abstract component to share code of common operations of all array fields
 *
 * Instance properties declared here only to resolve syntax errors.
 * Hence they need to be declared in children extending components (with decarators if necessary)
 */
var AbstractListFieldComponent = (function (_super) {
    __extends(AbstractListFieldComponent, _super);
    function AbstractListFieldComponent(appGlobalsService, problemsService, jsonStoreService, pathUtilService, changeDetectorRef) {
        var _this = _super.call(this, appGlobalsService, problemsService, pathUtilService, changeDetectorRef, jsonStoreService) || this;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.jsonStoreService = jsonStoreService;
        _this.pathUtilService = pathUtilService;
        _this.changeDetectorRef = changeDetectorRef;
        return _this;
    }
    /**
     * @param index - Index of the element that is moved
     * @param  direction - Movement direction. -1 for UP, +1 for DOWN
     */
    AbstractListFieldComponent.prototype.moveElement = function (index, direction) {
        this.jsonStoreService.moveIn(this.path, index, direction);
    };
    /**
     * @param index - Index of the element to be deleted
     */
    AbstractListFieldComponent.prototype.deleteElement = function (index) {
        var elementPath = this.path.concat(index);
        this.jsonStoreService.removeIn(elementPath);
        this.values = this.jsonStoreService.getIn(this.path);
    };
    AbstractListFieldComponent.prototype.getPathStringForChild = function (index) {
        return "" + this.pathString + this.pathUtilService.separator + index;
    };
    Object.defineProperty(AbstractListFieldComponent.prototype, "addJsonPatches", {
        get: function () {
            return this.jsonPatches
                .filter(function (patch) { return patch.op === 'add'; });
        },
        enumerable: true,
        configurable: true
    });
    return AbstractListFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_0__abstract_field__["a" /* AbstractFieldComponent */]));



/***/ }),

/***/ "../../../../../dist/src/abstract-list-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_list_field_component__ = __webpack_require__("../../../../../dist/src/abstract-list-field/abstract-list-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__abstract_list_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/abstract-subscriber/abstract-subscriber.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractSubscriberComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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

var AbstractSubscriberComponent = (function () {
    function AbstractSubscriberComponent() {
        this.isDestroyed = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
    }
    AbstractSubscriberComponent.prototype.ngOnDestroy = function () {
        this.isDestroyed.next();
        this.isDestroyed.complete();
    };
    return AbstractSubscriberComponent;
}());



/***/ }),

/***/ "../../../../../dist/src/abstract-subscriber/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__abstract_subscriber_component__ = __webpack_require__("../../../../../dist/src/abstract-subscriber/abstract-subscriber.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__abstract_subscriber_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/add-field-dropdown/add-field-dropdown.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFieldDropdownComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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


var AddFieldDropdownComponent = (function () {
    function AddFieldDropdownComponent(elementRef, domUtilService, keysStoreService) {
        this.elementRef = elementRef;
        this.domUtilService = domUtilService;
        this.keysStoreService = keysStoreService;
        this.expression = '';
        this.hidden = false;
    }
    AddFieldDropdownComponent.prototype.ngOnChanges = function (changes) {
        if (changes['schema'] || changes['fields']) {
            this.hidden = Object.keys(this.schema.properties).length === this.fields.size;
        }
    };
    AddFieldDropdownComponent.prototype.onDropdownShown = function () {
        var _this = this;
        setTimeout(function () {
            return _this.domUtilService.focusFirstInputChildByElement(_this.elementRef.nativeElement);
        });
    };
    AddFieldDropdownComponent.prototype.onFieldSelect = function (field) {
        var newFieldPathString = this.keysStoreService.addKey(this.pathString, field, this.schema);
        this.domUtilService.focusAndSelectFirstEditableChildById(newFieldPathString);
        this.expression = '';
    };
    return AddFieldDropdownComponent;
}());

AddFieldDropdownComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'add-field-dropdown',
                styles: [".btn-add-field-dropdown { padding: 0 3px; font-size: 11px; opacity: 0.4; border: 0; background: transparent; font-weight: bold; line-height: 1; text-shadow: 0 1px 0 #fff; color: darkslategray; margin-bottom: 2px; float: left; } .btn-add-field-dropdown:hover { color: blue; opacity: 0.6; } .dropdown-filter-container { padding: 0 3px; } .dropdown-filter-container input { width: 100%; } "],
                template: "<div *ngIf=\"!hidden\" class=\"btn-group add-field-dropdown-container\" dropdown keyboardNav=\"true\" [isDisabled]=\"isDisabled\" (onShown)=\"onDropdownShown()\"> <button type=\"button\" class=\"btn btn-add-field-dropdown\" dropdownToggle> <ng-content></ng-content> <i class=\"fa fa-caret-down\"></i> </button> <ul class=\"dropdown-menu\" *dropdownMenu> <li class=\"dropdown-filter-container\"> <input [(ngModel)]=\"expression\" placeholder=\"filter\" (click)=\"$event.stopPropagation()\"> </li> <li class=\"divider dropdown-divider\"></li> <li *ngFor=\"let key of schema.properties | differentKeys:fields | filterByExpression:expression\"> <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"onFieldSelect(key)\">{{key}}</a> </li> </ul> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
AddFieldDropdownComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["j" /* KeysStoreService */], },
]; };
AddFieldDropdownComponent.propDecorators = {
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'fields': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'pathString': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'isDisabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/add-field-dropdown/add-nested-field-dropdown.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddNestedFieldDropdownComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("../../../../immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_subscriber__ = __webpack_require__("../../../../../dist/src/abstract-subscriber/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var AddNestedFieldDropdownComponent = (function (_super) {
    __extends(AddNestedFieldDropdownComponent, _super);
    function AddNestedFieldDropdownComponent(keysStoreService, jsonSchemaService, pathUtilService, domUtilService) {
        var _this = _super.call(this) || this;
        _this.keysStoreService = keysStoreService;
        _this.jsonSchemaService = jsonSchemaService;
        _this.pathUtilService = pathUtilService;
        _this.domUtilService = domUtilService;
        return _this;
    }
    AddNestedFieldDropdownComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var pathStringChange = changes['pathString'];
        if (pathStringChange) {
            this.nestedKeysMap = {};
            this.nestedKeysMap[this.pathString] = this.keysStoreService.keysMap[this.pathString];
            var nestedPathPrefix_1 = this.pathString + this.pathUtilService.separator;
            Object.keys(this.keysStoreService.keysMap)
                .filter(function (path) { return path.startsWith(nestedPathPrefix_1); })
                .forEach(function (path) {
                _this.nestedKeysMap[path] = _this.keysStoreService.keysMap[path];
            });
            if (this.keysChangeSubscription) {
                this.keysChangeSubscription.unsubscribe();
            }
            this.keysChangeSubscription = this.keysStoreService.onKeysChange
                .filter(function (change) { return change.path.startsWith(_this.pathString); })
                .takeUntil(this.isDestroyed)
                .subscribe(function (change) { _this.nestedKeysMap[change.path] = change.keys; });
        }
    };
    /**
     * Return keys that could be added for the given path.
     *
     * @return schema key - hidden keys - existing keys
     */
    AddNestedFieldDropdownComponent.prototype.addableKeysForPath = function (path) {
        var keys = this.nestedKeysMap[path];
        var schema = this.jsonSchemaService.forPathString(path);
        // || schema.items.properties is to handle the keys when the path belongs to table-list.
        var schemaProps = schema.properties || schema.items.properties;
        var schemaKeys = Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["Set"])(Object.keys(schemaProps)
            .filter(function (key) { return !schemaProps[key].hidden; }));
        var addableKeys = schemaKeys.subtract(keys);
        return addableKeys.size > 0 ? addableKeys : undefined;
    };
    AddNestedFieldDropdownComponent.prototype.onFieldSelect = function (path, key) {
        var schema = this.jsonSchemaService.forPathString(path);
        if (schema.componentType === 'table-list') {
            schema = schema.items;
        }
        var newKeyPath = this.keysStoreService.addKey(path, key, schema);
        if (this.keysStoreService.keysMap[newKeyPath]) {
            this.nestedKeysMap[newKeyPath] = this.keysStoreService.keysMap[newKeyPath];
        }
        this.domUtilService.focusAndSelectFirstEditableChildById(newKeyPath);
    };
    return AddNestedFieldDropdownComponent;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_subscriber__["a" /* AbstractSubscriberComponent */]));

AddNestedFieldDropdownComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'add-nested-field-dropdown',
                styles: [".btn-add-field-dropdown { padding: 0 3px; font-size: 11px; opacity: 0.4; border: 0; background: transparent; font-weight: bold; line-height: 1; text-shadow: 0 1px 0 #fff; color: darkslategray; margin-bottom: 2px; float: left; } .btn-add-field-dropdown:hover { color: blue; opacity: 0.6; } .dropdown-filter-container { padding: 0 3px; } .dropdown-filter-container input { width: 100%; } ",
                    ".dropdown-header.title { font-size: 13.5px; font-weight: bold; padding-left: 10px; } .dropdown-divider { margin: 4px 0; } .dropdown-menu li > .dropdown-item { display: block; padding: 3px 20px; clear: both; font-weight: normal; line-height: 1.42857; color: #333333; white-space: nowrap; } .dropdown-menu li > .dropdown-item:hover { text-decoration: none; color: #262626; background-color: #f5f5f5; } "],
                template: "<div class=\"btn-group add-field-dropdown-container\" dropdown keyboardNav=\"true\" [isDisabled]=\"isDisabled\"> <button type=\"button\" class=\"btn btn-add-field-dropdown\" dropdownToggle> <i class=\"fa fa-plus\"></i> <i class=\"fa fa-caret-down\"></i> </button> <ul class=\"dropdown-menu\" *dropdownMenu> <div *ngFor=\"let path of nestedKeysMap | keys; first as isFirst\"> <div *ngIf=\"addableKeysForPath(path); let addableKeys\"> <li *ngIf=\"!isFirst\" class=\"divider dropdown-divider\"></li> <li *ngIf=\"!isFirst\" class=\"dropdown-header title\">{{path | lastPathElement}}</li> <li *ngFor=\"let key of addableKeys\"> <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"onFieldSelect(path, key)\">{{key}}</a> </li> </div> </div> </ul> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
AddNestedFieldDropdownComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["j" /* KeysStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["f" /* JsonSchemaService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["c" /* DomUtilService */], },
]; };
AddNestedFieldDropdownComponent.propDecorators = {
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'pathString': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'isDisabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/add-field-dropdown/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_field_dropdown_component__ = __webpack_require__("../../../../../dist/src/add-field-dropdown/add-field-dropdown.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__add_field_dropdown_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__add_nested_field_dropdown_component__ = __webpack_require__("../../../../../dist/src/add-field-dropdown/add-nested-field-dropdown.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__add_nested_field_dropdown_component__["a"]; });




/***/ }),

/***/ "../../../../../dist/src/add-new-element-button/add-new-element-button.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddNewElementButtonComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");


var AddNewElementButtonComponent = (function () {
    function AddNewElementButtonComponent(domUtilService, emptyValueService, jsonStoreService, pathUtilService, keyStoreService) {
        this.domUtilService = domUtilService;
        this.emptyValueService = emptyValueService;
        this.jsonStoreService = jsonStoreService;
        this.pathUtilService = pathUtilService;
        this.keyStoreService = keyStoreService;
    }
    AddNewElementButtonComponent.prototype.addNewElement = function () {
        var _this = this;
        var itemSchema = this.schema.items;
        var emptyValue = this.emptyValueService.generateEmptyValue(itemSchema);
        var values = this.jsonStoreService.getIn(this.path);
        var insertIndex = values ? values.size : 0;
        var insertPath = this.path.concat(insertIndex);
        this.jsonStoreService.addIn(insertPath, emptyValue);
        // focus on the new added element
        var insertPathString = this.pathUtilService.toPathString(insertPath);
        setTimeout(function () {
            _this.domUtilService.focusAndSelectFirstEditableChildById(insertPathString);
        });
    };
    return AddNewElementButtonComponent;
}());

AddNewElementButtonComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'add-new-element-button',
                styles: ["div.button-container { display: inline-block; width: 100%; } .btn-new-field { font-size: 13px; font-weight: bold; text-shadow: 0 1px 0 #fff; opacity: 0.5; background: transparent; border: 0; bottom: -5px; left: -5px; padding: 0px; } .btn-new-field:hover { color: green !important; opacity: 0.6; } "],
                template: "<div [class.disabled]=\"schema.disabled\"  class=\"button-container\"> <button type=\"button\" class=\"btn-new-field\" (click)=\"addNewElement()\">Add new</button> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
AddNewElementButtonComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["d" /* EmptyValueService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["j" /* KeysStoreService */], },
]; };
AddNewElementButtonComponent.propDecorators = {
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/add-new-element-button/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_new_element_button_component__ = __webpack_require__("../../../../../dist/src/add-new-element-button/add-new-element-button.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__add_new_element_button_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/add-patch-view/add-patch-view.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPatchViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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

var AddPatchViewComponent = (function () {
    function AddPatchViewComponent() {
    }
    return AddPatchViewComponent;
}());

AddPatchViewComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'add-patch-view',
                styles: ["td { vertical-align: top; padding-right: 10px !important; } .align-self-end { align-self: flex-end; } .patch-container { display: flex; padding-left: 4px; } .green-left-border { border-left: 9px solid #2ecc71; } .grow { flex-grow: 1; } "],
                template: "<div class=\"patch-container green-left-border\" [id]=\"patch.path\" tabindex=\"-1\"> <div class=\"grow\"> <ng-template [ngTemplateOutlet]=\"anyTypeTemplate\" [ngTemplateOutletContext]=\"{value: patch.value}\"></ng-template> </div> <patch-actions class=\"align-self-end\" [patch]=\"patch\"></patch-actions> </div> <ng-template #anyTypeTemplate let-value=\"value\"> <ng-container [ngSwitch]=\"value | typeOf\"> <ng-container *ngSwitchCase=\"'object'\"> <ng-template [ngTemplateOutlet]=\"objectTemplate\" [ngTemplateOutletContext]=\"{object: value}\"></ng-template> </ng-container> <ng-container *ngSwitchCase=\"'array'\"> <ng-template [ngTemplateOutlet]=\"arrayTemplate\" [ngTemplateOutletContext]=\"{array: value}\"></ng-template> </ng-container> <ng-container *ngSwitchDefault> <ng-template [ngTemplateOutlet]=\"primitiveTemplate\" [ngTemplateOutletContext]=\"{primitive: value}\"></ng-template> </ng-container> </ng-container> </ng-template> <ng-template #objectTemplate let-object=\"object\"> <table> <tr *ngFor=\"let key of object | keys\"> <td> <label>{{key}}</label> </td> <td> <ng-template [ngTemplateOutlet]=\"anyTypeTemplate\" [ngTemplateOutletContext]=\"{value: object[key]}\"></ng-template> </td> </tr> </table> </ng-template> <ng-template #arrayTemplate let-array=\"array\"> <table> <tr *ngFor=\"let item of array\"> <td> <ng-template [ngTemplateOutlet]=\"anyTypeTemplate\" [ngTemplateOutletContext]=\"{value: item}\"></ng-template> </td> </tr> </table> </ng-template> <ng-template #primitiveTemplate let-primitive=\"primitive\"> <span>{{primitive}}</span> </ng-template>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
AddPatchViewComponent.ctorParameters = function () { return []; };
AddPatchViewComponent.propDecorators = {
    'patch': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/add-patch-view/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_patch_view_component__ = __webpack_require__("../../../../../dist/src/add-patch-view/add-patch-view.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__add_patch_view_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/any-type-field/any-type-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnyTypeFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

/**
 * AnyFieldComponent
 *
 * This is a dummy component that has no logic, just passes @Input to its child and
 * propagates its child's output to its parent.
 *
 * IMPORTANT:
 * On the other hand it has smart template which has logic to decide which type of
 * component to use according to schema.
 */
var AnyTypeFieldComponent = (function () {
    function AnyTypeFieldComponent() {
    }
    return AnyTypeFieldComponent;
}());

AnyTypeFieldComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'any-type-field',
                styles: [""],
                template: "<div [ngSwitch]=\"schema.componentType\"> <div *ngSwitchCase=\"'table-list'\"> <table-list-field [values]=\"value\" [schema]=\"schema\" [path]=\"path\"></table-list-field> </div> <div *ngSwitchCase=\"'complex-list'\"> <complex-list-field [values]=\"value\" [schema]=\"schema\" [path]=\"path\"></complex-list-field> </div> <div *ngSwitchCase=\"'primitive-list'\"> <primitive-list-field [values]=\"value\" [schema]=\"schema\" [path]=\"path\"></primitive-list-field> </div> <div *ngSwitchCase=\"'object'\"> <object-field [value]=\"value\" [schema]=\"schema\" [path]=\"path\"></object-field> </div> <div *ngSwitchCase=\"'ref'\"> <ref-field [value]=\"value\" [schema]=\"schema\" [path]=\"path\"></ref-field> </div> <div *ngSwitchDefault> <primitive-field [value]=\"value\" [schema]=\"schema\" [path]=\"path\"></primitive-field> </div> </div> ",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
AnyTypeFieldComponent.ctorParameters = function () { return []; };
AnyTypeFieldComponent.propDecorators = {
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/any-type-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__any_type_field_component__ = __webpack_require__("../../../../../dist/src/any-type-field/any-type-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__any_type_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/autocomplete-input/autocomplete-input.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutocompleteInputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/*
 * This file is part of INSPIRE.
 * Copyright (C) 2016 CERN.
 *
 * INSPIRE is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * INSPIRE is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with INSPIRE; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
*/



var AutocompleteInputComponent = (function () {
    function AutocompleteInputComponent(remoteAutocompletionService, jsonStoreService, keysStoreService, appGlobalsService) {
        this.remoteAutocompletionService = remoteAutocompletionService;
        this.jsonStoreService = jsonStoreService;
        this.keysStoreService = keysStoreService;
        this.appGlobalsService = appGlobalsService;
        this.onValueChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.onKeypress = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.onBlur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    AutocompleteInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.autocompletionConfig.url) {
            // remote
            this.typeaheadOptionField = this.autocompletionConfig.optionField || 'text';
            this.dataSource = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                if (_this.value && _this.value.length > 0) {
                    observer.next(_this.value);
                }
            }).mergeMap(function (token) {
                return _this.remoteAutocompletionService.getAutocompletionResults(_this.autocompletionConfig, token);
            });
        }
        else {
            // local
            this.typeaheadOptionField = this.autocompletionConfig.optionField || '';
            this.dataSource = this.autocompletionConfig.source;
        }
    };
    Object.defineProperty(AutocompleteInputComponent.prototype, "customItemTemplate", {
        get: function () {
            return this.appGlobalsService.templates[this.autocompletionConfig.itemTemplateName];
        },
        enumerable: true,
        configurable: true
    });
    AutocompleteInputComponent.prototype.onModelChange = function (value) {
        this.value = value;
        this.onValueChange.emit(value);
    };
    AutocompleteInputComponent.prototype.onCompletionSelect = function (selection) {
        var onCompletionSelect = this.autocompletionConfig.onCompletionSelect;
        if (onCompletionSelect) {
            // .slice() is used to pass by value instead of reference
            onCompletionSelect(this.path.slice(), selection, this.jsonStoreService, this.keysStoreService);
        }
    };
    return AutocompleteInputComponent;
}());

AutocompleteInputComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'autocomplete-input',
                styles: [""],
                template: "<div class=\"autocomplete-container\"> <input attr.data-path=\"{{pathString}}\" [ngModel]=\"value\" (ngModelChange)=\"onModelChange($event)\" (keypress)=\"onKeypress.emit($event)\" (blur)=\"onBlur.emit()\" [typeahead]=\"dataSource\" [typeaheadOptionsLimit]=\"autocompletionConfig.size\" [typeaheadOptionField]=\"typeaheadOptionField\" [typeaheadItemTemplate]=\"customItemTemplate\" (typeaheadOnSelect)=\"onCompletionSelect($event.item)\" [typeaheadWaitMs]=\"200\" [tabindex]=\"tabIndex\" placeholder=\"{{placeholder}}\"> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
AutocompleteInputComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["p" /* RemoteAutocompletionService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["j" /* KeysStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* AppGlobalsService */], },
]; };
AutocompleteInputComponent.propDecorators = {
    'autocompletionConfig': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'pathString': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'tabIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'placeholder': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'onValueChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'onKeypress': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'onBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
};


/***/ }),

/***/ "../../../../../dist/src/autocomplete-input/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__autocomplete_input_component__ = __webpack_require__("../../../../../dist/src/autocomplete-input/autocomplete-input.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__autocomplete_input_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/bottom-console-badges/bottom-console-badges.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BottomConsoleBadgesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_subscriber__ = __webpack_require__("../../../../../dist/src/abstract-subscriber/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var BottomConsoleBadgesComponent = (function (_super) {
    __extends(BottomConsoleBadgesComponent, _super);
    function BottomConsoleBadgesComponent(problemsService, changeDetectorRef, jsonStoreService) {
        var _this = _super.call(this) || this;
        _this.problemsService = problemsService;
        _this.changeDetectorRef = changeDetectorRef;
        _this.jsonStoreService = jsonStoreService;
        _this.badgeClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        _this.errorCount = 0;
        _this.warningCount = 0;
        _this.patchCount = 0;
        return _this;
    }
    BottomConsoleBadgesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.problemsService.errorCount$
            .takeUntil(this.isDestroyed)
            .subscribe(function (count) {
            _this.errorCount = count;
            // FIXME: use markForCheck() instead
            // markForCheck() wasn't working for mysterious reasons for initial update
            _this.changeDetectorRef.detectChanges();
        });
        this.problemsService.warningCount$
            .takeUntil(this.isDestroyed)
            .subscribe(function (count) {
            _this.warningCount = count;
            // FIXME: use markForCheck() instead
            // markForCheck() wasn't working for mysterious reasons for initial update
            _this.changeDetectorRef.detectChanges();
        });
        this.jsonStoreService.patchesByPath$
            .map(function (patchesByPath) {
            return Object.keys(patchesByPath)
                .map(function (path) { return patchesByPath[path].length; })
                .reduce(function (sum, patchCountPerPath) { return sum + patchCountPerPath; }, 0);
        })
            .takeUntil(this.isDestroyed)
            .subscribe(function (patchCount) {
            _this.patchCount = patchCount;
            _this.changeDetectorRef.markForCheck();
        });
    };
    BottomConsoleBadgesComponent.prototype.onBadgeClick = function (event, badgeName) {
        event.preventDefault();
        this.badgeClick.emit(badgeName);
    };
    return BottomConsoleBadgesComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_subscriber__["a" /* AbstractSubscriberComponent */]));

BottomConsoleBadgesComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'bottom-console-badges',
                styles: [".error { color: #D14024; } .error .badge { background-color: #D14024; } .error .badge:hover { background-color: #e06148; } .error:hover { color: #e06148; } .warning { color: #f1c40f; } .warning .badge { background-color: #f1c40f; } .warning .badge:hover { background-color: #f4d03f; } .warning:hover { color: #f4d03f; } .patch { color: #e67e22; } .patch .badge { background-color: #e67e22; } .patch .badge:hover { background-color: #eb9950; } .patch:hover { color: #eb9950; } a { text-decoration: none; padding-right: 7px; padding-top: 7px; } a:hover { cursor: pointer; } .badges-container { display: flex; } @media screen and (max-width: 1440px) { .badges-container { flex-direction: column; } } "],
                template: "<div class=\"badges-container\"> <a *ngIf=\"errorCount > 0\" class=\"error\" (click)=\"onBadgeClick($event, 'Errors')\"> <span class=\"\">Errors</span> <span class=\"badge\">{{errorCount}}</span> </a> <a *ngIf=\"warningCount > 0\" class=\"warning\" (click)=\"onBadgeClick($event, 'Warnings')\"> <span>Warnings</span> <span class=\"badge\">{{warningCount}}</span> </a> <a *ngIf=\"patchCount > 0\" class=\"patch\" (click)=\"onBadgeClick($event, 'Patches')\"> <span>Conflicts</span> <span class=\"badge\">{{patchCount}}</span> </a> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
BottomConsoleBadgesComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
]; };
BottomConsoleBadgesComponent.propDecorators = {
    'badgeClick': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
};


/***/ }),

/***/ "../../../../../dist/src/bottom-console-badges/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bottom_console_badges_component__ = __webpack_require__("../../../../../dist/src/bottom-console-badges/bottom-console-badges.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__bottom_console_badges_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/bottom-console/bottom-console.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BottomConsoleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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

var BottomConsoleComponent = (function () {
    function BottomConsoleComponent() {
        this.isOpen = false;
        this.activeTab = '';
        this.onCollapse = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    BottomConsoleComponent.prototype.closePanel = function () {
        this.onCollapse.emit(false);
    };
    BottomConsoleComponent.prototype.isActive = function (tabName) {
        return tabName === this.activeTab;
    };
    return BottomConsoleComponent;
}());

BottomConsoleComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'bottom-console',
                styles: [""],
                template: "<div *ngIf=\"isOpen\" class=\"bottom-console-container\"> <tabset> <tab [active]=\"isActive('Errors')\"> <problems-console-tab [problemType]=\"'errors'\"></problems-console-tab> </tab> <tab [active]=\"isActive('Warnings')\"> <problems-console-tab [problemType]=\"'warnings'\"></problems-console-tab> </tab> <tab [active]=\"isActive('Patches')\"> <patches-console-tab></patches-console-tab> </tab> <tab (select)=\"closePanel()\" [customClass]=\"'pull-right'\"> <ng-template tabHeading> <i class=\"fa fa-window-close\"></i> </ng-template> </tab> </tabset> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
BottomConsoleComponent.ctorParameters = function () { return []; };
BottomConsoleComponent.propDecorators = {
    'isOpen': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'activeTab': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'onCollapse': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
};


/***/ }),

/***/ "../../../../../dist/src/bottom-console/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bottom_console_component__ = __webpack_require__("../../../../../dist/src/bottom-console/bottom-console.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__bottom_console_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patches_console_tab__ = __webpack_require__("../../../../../dist/src/bottom-console/patches-console-tab/index.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__patches_console_tab__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__problems_console_tab__ = __webpack_require__("../../../../../dist/src/bottom-console/problems-console-tab/index.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__problems_console_tab__["a"]; });





/***/ }),

/***/ "../../../../../dist/src/bottom-console/patches-console-tab/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__patches_console_tab_component__ = __webpack_require__("../../../../../dist/src/bottom-console/patches-console-tab/patches-console-tab.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__patches_console_tab_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/bottom-console/patches-console-tab/patches-console-tab.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatchesConsoleTabComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_subscriber__ = __webpack_require__("../../../../../dist/src/abstract-subscriber/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PatchesConsoleTabComponent = (function (_super) {
    __extends(PatchesConsoleTabComponent, _super);
    function PatchesConsoleTabComponent(domUtilService, pathUtilService, jsonStoreService, changeDetectorRef) {
        var _this = _super.call(this) || this;
        _this.domUtilService = domUtilService;
        _this.pathUtilService = pathUtilService;
        _this.jsonStoreService = jsonStoreService;
        _this.changeDetectorRef = changeDetectorRef;
        _this.patches = [];
        return _this;
    }
    PatchesConsoleTabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.jsonStoreService.patchesByPath$
            .map(function (patchesByPath) {
            return Object.keys(patchesByPath)
                .map(function (path) { return patchesByPath[path]; })
                .reduce(function (pre, cur) { return pre.concat(cur); }, []);
        })
            .takeUntil(this.isDestroyed)
            .subscribe(function (patches) {
            _this.patches = patches;
            _this.changeDetectorRef.markForCheck();
        });
    };
    PatchesConsoleTabComponent.prototype.focusPatchForPath = function (path) {
        this.domUtilService.focusPatchElementById(path);
    };
    PatchesConsoleTabComponent.prototype.acceptAll = function () {
        var _this = this;
        this.patches
            .forEach(function (patch) { return _this.jsonStoreService.applyPatch(patch); });
    };
    PatchesConsoleTabComponent.prototype.rejectAll = function () {
        var _this = this;
        this.patches
            .forEach(function (patch) { return _this.jsonStoreService.rejectPatch(patch); });
    };
    return PatchesConsoleTabComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_subscriber__["a" /* AbstractSubscriberComponent */]));

PatchesConsoleTabComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'patches-console-tab',
                styles: [".list-group-item { cursor: pointer; color: #0074D9; } .list-group-item:hover { background-color: #faebcc; text-decoration: underline; } ",
                    ".fa-bolt { color: #e67e22; } .icon-padding-left { padding-left: 8px; } .all-actions-container { padding: 8px; } .all-actions-container > button { margin-right: 4px; margin-left: 4px; } "],
                template: "<ng-template tabHeading> <i class=\"fa fa-bolt\"></i> Conflicts <span class=\"badge\">{{patches.length}}</span> </ng-template> <div class=\"all-actions-container\"> <button class=\"btn btn-success\" (click)=\"acceptAll()\">Accept All<i class=\"fa fa-check icon-padding-left\"></i></button> <button class=\"btn btn-danger\" (click)=\"rejectAll()\">Reject All<i class=\"fa fa-times icon-padding-left\"></i></button> </div> <ul class=\"list-group\"> <li *ngFor=\"let patch of patches\" class=\"list-group-item\" (click)=\"focusPatchForPath(patch.path)\"> <i class=\"fa fa-bolt\"></i> {{patch.path}} - {{patch.op}} </li> </ul>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
PatchesConsoleTabComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/bottom-console/problems-console-tab/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__problems_console_tab_component__ = __webpack_require__("../../../../../dist/src/bottom-console/problems-console-tab/problems-console-tab.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__problems_console_tab_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/bottom-console/problems-console-tab/problems-console-tab.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProblemsConsoleTabComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_subscriber__ = __webpack_require__("../../../../../dist/src/abstract-subscriber/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ProblemsConsoleTabComponent = (function (_super) {
    __extends(ProblemsConsoleTabComponent, _super);
    function ProblemsConsoleTabComponent(domUtilService, pathUtilService, problemsService, changeDetectorRef) {
        var _this = _super.call(this) || this;
        _this.domUtilService = domUtilService;
        _this.pathUtilService = pathUtilService;
        _this.problemsService = problemsService;
        _this.changeDetectorRef = changeDetectorRef;
        _this.problemCount = 0;
        return _this;
    }
    ProblemsConsoleTabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.problemsService.externalCategorizedProblems$
            .map(function (categorizedProblemMap) { return categorizedProblemMap[_this.problemType]; })
            .takeUntil(this.isDestroyed)
            .subscribe(function (problemMap) {
            _this.externalProblemMap = problemMap;
            _this.changeDetectorRef.markForCheck();
        });
        this.problemsService.internalCategorizedProblems$
            .map(function (categorizedProblemMap) { return categorizedProblemMap[_this.problemType]; })
            .takeUntil(this.isDestroyed)
            .subscribe(function (problemMap) {
            _this.internalProblemMap = problemMap;
            _this.changeDetectorRef.markForCheck();
        });
        // TODO: create WarningsConsoleTabComponent with same template to avoid `if`
        var problemCount$ = this.problemType === 'errors' ? this.problemsService.errorCount$ : this.problemsService.warningCount$;
        problemCount$
            .takeUntil(this.isDestroyed)
            .subscribe(function (problemCount) {
            _this.problemCount = problemCount;
        });
        this.iconClassName = this.problemType === 'errors' ? 'fa fa-times' : 'fa fa-exclamation-triangle';
    };
    ProblemsConsoleTabComponent.prototype.focusAndSelectPath = function (path) {
        this.domUtilService.focusAndSelectFirstEditableChildById(path, true);
    };
    return ProblemsConsoleTabComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_subscriber__["a" /* AbstractSubscriberComponent */]));

ProblemsConsoleTabComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'problems-console-tab',
                styles: [".list-group-item { cursor: pointer; color: #0074D9; } .list-group-item:hover { background-color: #faebcc; text-decoration: underline; } ",
                    ".fa-exclamation-triangle { color: #f1c40f; } .fa-times { color: #D14024; } "],
                template: "<ng-template tabHeading> <i [ngClass]=\"iconClassName\"></i> {{problemType | titlecase}} <span class=\"badge\">{{problemCount}}</span> </ng-template> <ul class=\"list-group\"> <ng-container *ngFor=\"let key of internalProblemMap | keys\"> <li *ngFor=\"let problem of internalProblemMap[key]\" class=\"list-group-item\" (click)=\"focusAndSelectPath(key)\"> <i [ngClass]=\"iconClassName\"></i> {{ problem.message }} </li> </ng-container> <ng-container *ngFor=\"let key of externalProblemMap | keys\"> <li *ngFor=\"let problem of externalProblemMap[key]\" class=\"list-group-item\" (click)=\"focusAndSelectPath(key)\"> <i [ngClass]=\"iconClassName\"></i> {{ problem.message }} </li> </ng-container> </ul>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
ProblemsConsoleTabComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
]; };
ProblemsConsoleTabComponent.propDecorators = {
    'problemType': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/complex-list-field/complex-list-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComplexListFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_list_field__ = __webpack_require__("../../../../../dist/src/abstract-list-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ComplexListFieldComponent = (function (_super) {
    __extends(ComplexListFieldComponent, _super);
    function ComplexListFieldComponent(appGlobalsService, problemsService, jsonStoreService, domUtilService, pathUtilService, changeDetectorRef, listPageChangerService) {
        var _this = _super.call(this, appGlobalsService, problemsService, jsonStoreService, pathUtilService, changeDetectorRef) || this;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.jsonStoreService = jsonStoreService;
        _this.domUtilService = domUtilService;
        _this.pathUtilService = pathUtilService;
        _this.changeDetectorRef = changeDetectorRef;
        _this.listPageChangerService = listPageChangerService;
        _this.currentFound = 0;
        _this.currentPage = 1;
        _this._shouldDisplayOnlyEditFormItems = false;
        return _this;
    }
    ComplexListFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.navigator = this.schema.longListNavigatorConfig;
        this.paginatableItems = this.getPaginatableItems();
        this.paginatedItems = this.getPaginatableItemsForPage(this.currentPage);
        if (this.navigator) {
            this.listPageChangerService
                .registerPaginatedList(this.pathString, this.navigator.itemsPerPage)
                .skipWhile(function (page) { return page === _this.currentPage; })
                .takeUntil(this.isDestroyed)
                .subscribe(function (page) { return _this.onPageChange(page); });
        }
    };
    ComplexListFieldComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        var valuesChange = changes['values'];
        if (valuesChange && !valuesChange.isFirstChange()) {
            var preSize = valuesChange.previousValue.size;
            var curSize = valuesChange.currentValue.size;
            if (curSize !== preSize) {
                if (this.navigator) {
                    // check if element added in the end by comparing the last elements
                    var elementAddedToEnd = valuesChange.previousValue.equals(valuesChange.currentValue.pop());
                    var lastPage = this.getPageForIndex(curSize - 1);
                    // change the page if a new element is added in the end and it's not on the last page
                    if (curSize > preSize && this.currentPage !== lastPage && elementAddedToEnd) {
                        this.currentPage = lastPage;
                    }
                }
                this.paginatableItems = this.getPaginatableItems();
                this.paginatedItems = this.getPaginatableItemsForPage(this.currentPage);
            }
        }
    };
    ComplexListFieldComponent.prototype.hasProblemOrPatch = function (index) {
        var itemPath = this.getPathStringForChild(index);
        return this.problemsService.hasProblem(itemPath) || this.jsonStoreService.hasPatch(itemPath);
    };
    Object.defineProperty(ComplexListFieldComponent.prototype, "headerItemTemplate", {
        get: function () {
            return this.appGlobalsService.templates[this.navigator.headerItemTemplateName];
        },
        enumerable: true,
        configurable: true
    });
    ComplexListFieldComponent.prototype.onFindClick = function () {
        var _this = this;
        // clear for new search
        this.foundIndices = [];
        this.currentFound = 0;
        // search to look for the first match
        if (this.navigator.findSingle) {
            var foundIndex = this.values
                .findIndex(function (value) { return _this.navigator.findSingle(value, _this.findExpression); });
            if (foundIndex > -1) {
                this.foundIndices.push(foundIndex);
            }
        }
        // search to look for all matches
        if (this.foundIndices.length === 0 && this.navigator.findMultiple) {
            this.values
                .forEach(function (value, index) {
                if (_this.navigator.findMultiple(value, _this.findExpression)) {
                    _this.foundIndices.push(index);
                }
            });
        }
        // navigate to first search result if found any
        if (this.foundIndices.length > 0) {
            this.navigateToItem(this.foundIndices[0]);
            this.shouldDisplayFoundNavigation = true;
        }
        else {
            this.shouldDisplayFoundNavigation = false;
        }
    };
    ComplexListFieldComponent.prototype.onFindInputKeypress = function (key) {
        if (key === 'Enter') {
            this.onFindClick();
        }
    };
    ComplexListFieldComponent.prototype.onFoundNavigate = function (direction) {
        // No bound checks, since the buttons are disabled in these cases.
        this.currentFound += direction;
        this.navigateToItem(this.foundIndices[this.currentFound]);
    };
    ComplexListFieldComponent.prototype.navigateToItem = function (index) {
        var _this = this;
        this.currentPage = this.getPageForIndex(index);
        var itemPath = this.path.concat(index);
        var itemId = this.pathUtilService.toPathString(itemPath);
        setTimeout(function () { return _this.domUtilService.focusAndSelectFirstEditableChildById(itemId); });
    };
    ComplexListFieldComponent.prototype.onPageChange = function (page) {
        this.currentPage = page;
        this.paginatedItems = this.getPaginatableItemsForPage(page);
    };
    ComplexListFieldComponent.prototype.getPaginatableItemsForPage = function (page) {
        if (this.navigator) {
            var begin = (page - 1) * this.navigator.itemsPerPage;
            var end = (page * this.navigator.itemsPerPage);
            return this.paginatableItems.slice(begin, end);
        }
        else {
            return this.paginatableItems;
        }
    };
    ComplexListFieldComponent.prototype.getPaginatableItems = function () {
        var _this = this;
        return this.values
            .map(function (value, index) {
            var viewTemplateConfig = _this.schema.viewTemplateConfig;
            var isEditFormVisible = viewTemplateConfig ? viewTemplateConfig.showEditForm(value) : true;
            return { index: index, isEditFormVisible: isEditFormVisible };
        }).filter(function (item) {
            if (_this.shouldDisplayOnlyEditFormItems) {
                return item.isEditFormVisible;
            }
            else {
                return true;
            }
        });
    };
    ComplexListFieldComponent.prototype.getPageForIndex = function (index) {
        return Math.floor((index / this.navigator.itemsPerPage) + 1);
    };
    Object.defineProperty(ComplexListFieldComponent.prototype, "customTemplate", {
        get: function () {
            return this.appGlobalsService.templates[this.schema.viewTemplateConfig.itemTemplateName];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComplexListFieldComponent.prototype, "shouldDisplayViewTemplate", {
        get: function () {
            return this.schema.viewTemplateConfig !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComplexListFieldComponent.prototype, "sortable", {
        get: function () {
            return this.schema.sortable && !this.shouldDisplayOnlyEditFormItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComplexListFieldComponent.prototype, "shouldDisplayOnlyEditFormItems", {
        get: function () {
            return this._shouldDisplayOnlyEditFormItems;
        },
        set: function (value) {
            this.currentPage = 1;
            this._shouldDisplayOnlyEditFormItems = value;
            this.paginatableItems = this.getPaginatableItems();
            this.paginatedItems = this.getPaginatableItemsForPage(this.currentPage);
        },
        enumerable: true,
        configurable: true
    });
    return ComplexListFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_list_field__["a" /* AbstractListFieldComponent */]));

ComplexListFieldComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'complex-list-field',
                styles: [".complex-list-field-wrapper { margin: 10px 15px 15px 10px; padding: 5px; box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25); } .top-bar-container { width: 100%; position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; padding: 0 15px; background-color: white; box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #B3B3B3; } .item-count-label { position: relative; top: -19px; } .transparent { background: transparent; } .borderless { border: none; } .find-button { color: darkslategray; } .find-button .fa-search { opacity: 0.83; } .element-button-container { padding-top: 8px; } .element-button-container .left, .element-button-container .right { padding: 0px; } .element-button-container .right { text-align: right; } label.btn { color: white !important; } "],
                template: "<div [id]=\"pathString\" [ngClass]=\"redLeftBorderClass\"> <!-- Top Bar: Navigator, ToEdit/All switch, custom header item etc. --> <div *ngIf=\"navigator || shouldDisplayViewTemplate\" class=\"top-bar-container\"> <div *ngIf=\"navigator\"> <div class=\"input-group input-group-sm\"> <span class=\"input-group-btn\"> <button type=\"button\" class=\"btn btn-default find-button\" (click)=\"onFindClick()\"> <i class=\"fa fa-search\" aria-hidden=\"true\"></i> </button> </span> <input type=\"search\" class=\"form-control\" [(ngModel)]=\"findExpression\" (keypress)=\"onFindInputKeypress($event.key)\" placeholder=\"Find\" /> <span class=\"input-group-btn\" *ngIf=\"shouldDisplayFoundNavigation\"> <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentFound <= 0\" (click)=\"onFoundNavigate(-1)\">❮</button> </span> <span class=\"input-group-btn\" *ngIf=\"shouldDisplayFoundNavigation\"> <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentFound >= foundIndices.length - 1\" (click)=\"onFoundNavigate(1)\">❯</button> </span> <span *ngIf=\"foundIndices\" [ngSwitch]=\"foundIndices.length\" class=\"input-group-addon transparent borderless\"> <span *ngSwitchCase=\"0\"> Nothing found </span> <span *ngSwitchDefault> {{currentFound + 1}} of {{foundIndices.length}} </span> </span> </div> </div> <div *ngIf=\"shouldDisplayViewTemplate\" class=\"btn-group\"> <label class=\"btn btn-switch\" [class.active]=\"!shouldDisplayOnlyEditFormItems\" (click)=\"shouldDisplayOnlyEditFormItems = false\">All</label> <label class=\"btn btn-switch\" [class.active]=\"shouldDisplayOnlyEditFormItems\" (click)=\"shouldDisplayOnlyEditFormItems = true\">To Edit</label> </div> <div *ngIf=\"headerItemTemplate\"> <ng-template [ngTemplateOutlet]=\"headerItemTemplate\"></ng-template> </div> <div *ngIf=\"navigator\"> <label class=\"item-count-label\"> {{paginatableItems.size}} {{path[path.length - 1]}} </label> <br> <pagination [totalItems]=\"paginatableItems.size\" [ngModel]=\"currentPage\" [maxSize]=\"navigator.maxVisiblePageCount\" [itemsPerPage]=\"navigator.itemsPerPage\" class=\"pagination-sm pagination-top\" [boundaryLinks]=\"true\" [rotate]=\"false\" [firstText]=\"'❮❮'\" [previousText]=\"'❮'\" [nextText]=\"'❯'\" [lastText]=\"'❯❯'\" (pageChanged)=\"onPageChange($event.page)\"></pagination> </div> </div> <!-- Elements --> <div *ngFor=\"let item of paginatedItems; trackBy:trackByElement\"> <div class=\"complex-list-field-wrapper\"> <span *ngIf=\"shouldDisplayViewTemplate && values.get(item.index).keySeq().size != 0\"> <ng-template [ngTemplateOutlet]=\"customTemplate\" [ngTemplateOutletContext]=\"{item: values.get(item.index)}\"></ng-template> <a href=\"javascript:void(0)\" (click)=\"item.isEditFormVisible = !item.isEditFormVisible\"> {{item.isEditFormVisible ? 'Hide Fields' : 'Show Fields'}} </a> </span> <span *ngIf=\"item.isEditFormVisible || hasProblemOrPatch(item.index)\"> <object-field [value]=\"values.get(item.index)\" [schema]=\"schema.items\" [path]=\"getPathForChild(item.index)\"> </object-field> <div class=\"row element-button-container\"> <div class=\"col-md-6 left\"> <add-nested-field-dropdown [pathString]=\"pathString + '/' + item.index\" [schema]=\"schema.items\" [isDisabled]=\"disabled\"></add-nested-field-dropdown> </div> <div class=\"col-md-6 right\"> <list-action-group (onMove)=\"moveElement(item.index, $event)\" (onDelete)=\"deleteElement(item.index)\" [canMove]=\"sortable\" [isDisabled]=\"disabled\"> </list-action-group> </div> </div> </span> </div> </div> <div *ngFor=\"let patch of addJsonPatches\" class=\"complex-list-field-wrapper\"> <add-patch-view [patch]=\"patch\"></add-patch-view> </div> <div *ngIf=\"removeJsonPatch\"> <patch-actions [patch]=\"removeJsonPatch\"></patch-actions> </div> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
ComplexListFieldComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["k" /* ListPageChangerService */], },
]; };
ComplexListFieldComponent.propDecorators = {
    'values': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/complex-list-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__complex_list_field_component__ = __webpack_require__("../../../../../dist/src/complex-list-field/complex-list-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__complex_list_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/editor-previewer/editor-previewer.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditorPreviewerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var EditorPreviewerComponent = (function () {
    function EditorPreviewerComponent() {
    }
    EditorPreviewerComponent.prototype.openUrlInNewWindow = function (url) {
        window.open(url, 'Preview', 'left=20,top=20,width=750,height=750');
    };
    EditorPreviewerComponent.prototype.trackByIndex = function (index, element) {
        return index;
    };
    return EditorPreviewerComponent;
}());

EditorPreviewerComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'editor-previewer',
                styles: ["div.preview-container { width: 100%; height: 95vh; } span.preview-link { color: #337ab7; cursor: pointer; } span.preview-link:hover { color: cornflowerblue; } "],
                template: "<div> <tabset> <tab *ngFor=\"let preview of previews; trackBy:trackByIndex\" [heading]=\"preview.name\"> <div [ngSwitch]=\"preview.type\"> <div *ngSwitchCase=\"'html'\" class=\"preview-container\"> <ng-template tabHeading> <span class=\"preview-link\" (click)=\"openUrlInNewWindow(preview.url)\"> <i class=\"fa fa-external-link\"></i> </span> </ng-template> <html-view [url]=\"preview.url\"></html-view> </div> </div> </tab> </tabset> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
EditorPreviewerComponent.ctorParameters = function () { return []; };
EditorPreviewerComponent.propDecorators = {
    'previews': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/editor-previewer/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__editor_previewer_component__ = __webpack_require__("../../../../../dist/src/editor-previewer/editor-previewer.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__editor_previewer_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/find-replace/find-replace.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindReplaceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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



var FindReplaceComponent = (function () {
    function FindReplaceComponent(changeDetectionRef, domSanitizer, findReplaceAllService, jsonStoreService, modalService) {
        this.changeDetectionRef = changeDetectionRef;
        this.domSanitizer = domSanitizer;
        this.findReplaceAllService = findReplaceAllService;
        this.jsonStoreService = jsonStoreService;
        this.modalService = modalService;
    }
    FindReplaceComponent.prototype.onKeypress = function (key) {
        if (key === 'Enter') {
            this.findAndReplace();
        }
    };
    FindReplaceComponent.prototype.findAndReplace = function () {
        var _this = this;
        if (!(this.find && this.replace)) {
            return;
        }
        var value = this.jsonStoreService.getIn(this.path);
        var result = this.findReplaceAllService
            .findReplaceInImmutable(value, this.schema, this.find, this.replace, this.exactPhrase);
        this.replaced = result.replaced;
        var stringyfiedDiffHtml = JSON.stringify(result.diffHtml, undefined, 2);
        this.modalService.displayModal({
            title: 'After Replace',
            bodyHtml: this.domSanitizer.bypassSecurityTrustHtml("<pre class=\"max-height-70-vh\"><code>" + stringyfiedDiffHtml + "</code></pre>"),
            type: 'confirm',
            onConfirm: function () {
                _this.modalService.closeCurrentModal();
                _this.jsonStoreService.setIn(_this.path, _this.replaced);
                _this.cleanParameters();
            }
        });
    };
    FindReplaceComponent.prototype.cleanParameters = function () {
        this.find = '';
        this.replace = '';
        this.exactPhrase = false;
        this.changeDetectionRef.markForCheck();
    };
    return FindReplaceComponent;
}());

FindReplaceComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'find-replace',
                styles: [".find-replace-container { margin: 4px 3px 3px 2px; } .find-replace-container input { font-size: 13px; } .top-container-item { margin-bottom: 3px; } .bottom-container-item { margin-top: 5px; } .bottom-container-item i { font-size: 20px; float: right; padding-right: 2px; } label { font-size: 12px; font-weight: 400; color: #7e7e7e; } .horizontal-padding, .find-replace-container div { padding-right: 20px; padding-left: 20px; } "],
                template: "<div class=\"find-replace-container\"> <div class=\"top-container-item\"> <input placeholder=\"Find\" [(ngModel)]=\"find\" (keypress)=\"onKeypress($event.key)\" /> </div> <div> <input placeholder=\"Replace\" [(ngModel)]=\"replace\" (keypress)=\"onKeypress($event.key)\" /> </div> <div class=\"bottom-container-item\"> <label> Exact phrase <input type=\"checkbox\" [(ngModel)]=\"exactPhrase\" (keypress)=\"onKeypress($event.key)\"/> </label> <i class=\"fa fa-arrow-circle-right\" (click)=\"findAndReplace()\"></i> </div> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
FindReplaceComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["e" /* FindReplaceAllService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["l" /* ModalService */], },
]; };
FindReplaceComponent.propDecorators = {
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/find-replace/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__find_replace_component__ = __webpack_require__("../../../../../dist/src/find-replace/find-replace.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__find_replace_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/html-view/html-view.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HtmlViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var HtmlViewComponent = (function () {
    function HtmlViewComponent() {
    }
    return HtmlViewComponent;
}());

HtmlViewComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'html-view',
                styles: [".fit-parent { height: 100%; width: 100%; } "],
                template: "<object class=\"fit-parent\" [data]=\"url | sanitizeUrl\"></object>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
HtmlViewComponent.ctorParameters = function () { return []; };
HtmlViewComponent.propDecorators = {
    'url': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/html-view/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_view_component__ = __webpack_require__("../../../../../dist/src/html-view/html-view.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__html_view_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__json_editor_module__ = __webpack_require__("../../../../../dist/src/json-editor.module.js");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__json_editor_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_pipes__ = __webpack_require__("../../../../../dist/src/shared/pipes/index.js");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_classes__ = __webpack_require__("../../../../../dist/src/shared/classes/index.js");
/* unused harmony namespace reexport */
// export everything in order to be AoT compatible






/***/ }),

/***/ "../../../../../dist/src/json-editor.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JsonEditorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("../../../../immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_subscriber__ = __webpack_require__("../../../../../dist/src/abstract-subscriber/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var JsonEditorComponent = (function (_super) {
    __extends(JsonEditorComponent, _super);
    function JsonEditorComponent(appGlobalsService, problemsService, jsonStoreService, jsonUtilService, jsonSchemaService, keysStoreService, recordFixerService, schemaFixerService, tabsUtilService, pathUtilService) {
        var _this = _super.call(this) || this;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.jsonStoreService = jsonStoreService;
        _this.jsonUtilService = jsonUtilService;
        _this.jsonSchemaService = jsonSchemaService;
        _this.keysStoreService = keysStoreService;
        _this.recordFixerService = recordFixerService;
        _this.schemaFixerService = schemaFixerService;
        _this.tabsUtilService = tabsUtilService;
        _this.pathUtilService = pathUtilService;
        _this.recordChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        _this.jsonPatchesChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        _this.validationProblems = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        _this.pathString = '';
        _this.isBottomConsoleOpen = false;
        _this.bottomConsoleActiveTab = '';
        return _this;
    }
    JsonEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appGlobalsService.adminMode$
            .takeUntil(this.isDestroyed)
            .subscribe(function (adminMode) {
            _this.keysStoreService.buildKeysMap(_this._record, _this.fixedSchema);
        });
        // listen for all changes on json
        this.jsonStoreService.json$
            .skipWhile(function (json) { return json === _this._record; })
            .takeUntil(this.isDestroyed)
            .subscribe(function (json) {
            _this._record = json;
            // emit the change as plain JS object
            _this.lastEmittedRecord = json.toJS();
            _this.recordChange.emit(_this.lastEmittedRecord);
        });
        // list for all changes on jsonPatches
        this.jsonStoreService.jsonPatches$
            .takeUntil(this.isDestroyed)
            .subscribe(function (patches) {
            _this.jsonPatchesChange.emit(patches);
        });
        this.problemsService.internalProblemMap$
            .takeUntil(this.isDestroyed)
            .subscribe(function (internalProblemMap) {
            _this.validationProblems.emit(internalProblemMap);
        });
    };
    JsonEditorComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        // throw error if a required input is undefined
        if (changes['schema'] && !this.schema) {
            this.throwInputUndefined('schema');
        }
        if (changes['record'] && !this.record) {
            this.throwInputUndefined('record');
        }
        // warn if an important input is undefined
        if (changes['config'] && !this.config) {
            this.config = {};
            console.warn("[config] is undefined, make sure that is intended.");
        }
        var recordChanged = changes['record'] && this.record !== this.lastEmittedRecord;
        var schemaChanged = changes['schema'] || changes['config'];
        if (schemaChanged) {
            this.fixedSchema = this.schemaFixerService.fixSchema(this.schema, this.config.schemaOptions);
            this.jsonSchemaService.setSchema(this.fixedSchema);
        }
        if (schemaChanged || recordChanged) {
            this.record = this.recordFixerService.fixRecord(this.record, this.fixedSchema);
            this._record = Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["fromJS"])(this.record);
            this.jsonStoreService.setJson(this._record);
            this.keysStoreService.buildKeysMap(this._record, this.fixedSchema);
        }
        if (changes['config']) {
            this.appGlobalsService.config = this.config;
            if (this.config.tabsConfig) {
                this.tabNames = this.tabsUtilService.getTabNames(this.config.tabsConfig);
                this.tabsUtilService.activeTabName$.subscribe(function (tabName) { _this.appGlobalsService.activeTabName = tabName; });
                this.appGlobalsService.activeTabName = this.config.tabsConfig.defaultTabName;
            }
            this.customShortcutKeys = this.config.shortcuts;
        }
        if (recordChanged || changes['config']) {
            this.extractPreviews();
        }
        if (changes['jsonPatches']) {
            if (this.jsonPatches) {
                this.jsonStoreService.setJsonPatches(this.jsonPatches);
            }
        }
        if (changes['problemMap']) {
            this.problemsService.externalProblems = this.problemMap;
        }
        if (changes['templates']) {
            this.appGlobalsService.templates = this.templates || {};
        }
    };
    JsonEditorComponent.prototype.throwInputUndefined = function (inputName) {
        throw new Error("[" + inputName + "] is undefined!\n      if you are fetching " + inputName + " async then please consider using:\n        <json-editor *ngIf=\"" + inputName + "\" [" + inputName + "]=\"" + inputName + "\" ...> </json-editor>\n      in order to wait for it to be fetched before initializing json-editor");
    };
    /**
     * Converts PreviewConfig instances to Preview instances and appends to `previews` array.
     */
    JsonEditorComponent.prototype.extractPreviews = function () {
        var _this = this;
        if (!this.isPreviewerDisabled) {
            // if url is not set directly, populate it
            this.previews = [];
            this.config.previews
                .forEach(function (previewConfig) {
                var url;
                if (previewConfig.url) {
                    url = previewConfig.url;
                }
                else if (previewConfig.getUrl) {
                    url = previewConfig.getUrl(_this.record);
                }
                else if (previewConfig.urlPath) {
                    try {
                        url = _this.jsonUtilService.getValueInPath(_this.record, previewConfig.urlPath);
                    }
                    catch (error) {
                        console.warn("Path " + previewConfig.urlPath + " in preview config is not present in the input record");
                    }
                }
                else {
                    throw new Error('Either url, urlPath or getUrl should be set for a preview');
                }
                if (url) {
                    _this.previews.push({
                        name: previewConfig.name,
                        type: previewConfig.type,
                        url: url
                    });
                }
            });
        }
    };
    Object.defineProperty(JsonEditorComponent.prototype, "keys$", {
        get: function () {
            return this.keysStoreService.forPath(this.pathString);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonEditorComponent.prototype, "isPreviewerDisabled", {
        get: function () {
            return this.config.previews === undefined || this.config.previews.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonEditorComponent.prototype, "rightContainerColMdClass", {
        get: function () {
            return this.isPreviewerHidden ? 'col-md-1' : 'col-md-4';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonEditorComponent.prototype, "middleContainerColMdClass", {
        get: function () {
            if (this.config.compact) {
                return 'col-md-12';
            }
            if (this.isPreviewerDisabled) {
                return 'col-md-10';
            }
            return this.isPreviewerHidden ? 'col-md-9' : 'col-md-6';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonEditorComponent.prototype, "activeTabName", {
        set: function (tabName) {
            this.appGlobalsService.activeTabName = tabName;
        },
        enumerable: true,
        configurable: true
    });
    JsonEditorComponent.prototype.isActiveTab = function (tabName) {
        return this.appGlobalsService.activeTabName === tabName;
    };
    Object.defineProperty(JsonEditorComponent.prototype, "shorterEditorContainerClass", {
        get: function () {
            return this.isBottomConsoleOpen ? 'shorter-editor-container' : '';
        },
        enumerable: true,
        configurable: true
    });
    JsonEditorComponent.prototype.openBottomConsole = function (tabName) {
        this.isBottomConsoleOpen = true;
        this.bottomConsoleActiveTab = tabName;
    };
    JsonEditorComponent.prototype.trackByElement = function (index, element) {
        return element;
    };
    return JsonEditorComponent;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_subscriber__["a" /* AbstractSubscriberComponent */]));

JsonEditorComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'json-editor',
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewEncapsulation */].None,
                styles: ["body, html { height: 100%; background-color: #ecf0f1; } .editor-container { height: 100%; margin-right: 0px; margin-left: 0px; } .editor-container .row { margin-left: 0px; margin-right: 0px; } .shorter-editor-container { height: 75%; } #ng2-json-editor { /* Styles for tabset */ } #ng2-json-editor .dropdown-menu { max-height: 400px; overflow-y: auto; } #ng2-json-editor .hidden { display: none; } #ng2-json-editor th { font-weight: 400; padding: 1px 0px 1px 6px; background-color: #ecf0f1; color: #8e8e8e; font-weight: bold; } #ng2-json-editor th .dropdown-filter-container { font-weight: initial; } #ng2-json-editor td { background-color: #f9f9f9; border: none; padding: 0; } #ng2-json-editor td > * { vertical-align: middle; } #ng2-json-editor td.label-holder { width: 1%; white-space: nowrap; padding: 3px; background-color: #dae8ef; border-top: 1px solid #bdc3c7; } #ng2-json-editor td.label-holder button { color: #595959; } #ng2-json-editor tr.error td, #ng2-json-editor td.error { color: white; background-color: #e74c3c !important; transition: all .4s; } #ng2-json-editor tbody { border: none; } #ng2-json-editor table { margin-bottom: 0px !important; } #ng2-json-editor .main-container.compact { border-left: none; } #ng2-json-editor .main-container { font-size: 13px; border-left: 1px solid #a5adb5; height: 100%; overflow: auto; } #ng2-json-editor .main-container .tab-container > .nav-tabs { font-size: 14px; } #ng2-json-editor .main-container > add-field-dropdown div.dropdown { width: 100%; } #ng2-json-editor .main-container > add-field-dropdown ul.dropdown-menu { right: 0px; padding-bottom: 15px; } #ng2-json-editor .main-container > add-field-dropdown button.btn-add-field-dropdown { background: white; padding: 5px; opacity: 0.9; line-height: normal; font-size: 16px; width: 100%; } #ng2-json-editor .main-container > add-field-dropdown button.btn-add-field-dropdown:hover { opacity: 1; color: black; } #ng2-json-editor .add-field-dropdown-container { width: 100%; } #ng2-json-editor .middle.main-container { padding: 0px; } #ng2-json-editor .menu-container { background-color: #1D2D3D; height: 100%; overflow: auto; } #ng2-json-editor .menu-container div.dropdown { width: 100%; } #ng2-json-editor .menu-container ul.dropdown-menu { right: 0px; padding-bottom: 15px; } #ng2-json-editor .menu-container button.btn-add-field-dropdown { background: white; padding: 5px; opacity: 0.9; line-height: normal; font-size: 16px; width: 100%; } #ng2-json-editor .menu-container button.btn-add-field-dropdown:hover { opacity: 1; color: black; } #ng2-json-editor .editor-btn-delete { font-weight: bold; line-height: 1; text-shadow: 0 1px 0 #fff; opacity: 0.2; background: transparent; border: 0; padding: 0 0 3px 3px; } #ng2-json-editor .editor-btn-delete:hover { color: red; opacity: 0.6; } #ng2-json-editor .editor-btn-delete.editor-btn-delete-text { font-size: 13px; opacity: 0.5; padding: 0px; } #ng2-json-editor .custom-title-dropdown-item button { font-weight: bold; line-height: 1; text-shadow: 0 1px 0 #fff; opacity: 0.2; background: transparent; border: 0; padding: 0 0 3px 3px; font-size: 13px; opacity: 0.5; padding: 0px; } #ng2-json-editor .custom-title-dropdown-item button:hover { color: #337ab7; opacity: 0.6; } #ng2-json-editor .editor-btn-move-down { padding-bottom: 0; } #ng2-json-editor .editor-btn-move-up, #ng2-json-editor .editor-btn-move-down { padding: 0; font-size: 11px; border: 0; background: transparent; opacity: 0.2; } #ng2-json-editor .editor-btn-move-up:hover, #ng2-json-editor .editor-btn-move-down:hover { opacity: 0.6; } #ng2-json-editor ul.pagination-top { margin: -16px 0px 0px 0px; } #ng2-json-editor td.button-holder, #ng2-json-editor th.button-holder { width: 40.33px; text-align: center; vertical-align: middle; } #ng2-json-editor td.button-holder.sortable, #ng2-json-editor th.button-holder.sortable { width: 46px; } #ng2-json-editor th.button-holder .add-field-dropdown-container { width: 100%; } #ng2-json-editor th.button-holder .btn-add-field-dropdown { float: right; } #ng2-json-editor label { color: #c1c1c1; } #ng2-json-editor .highlight { border: 2px solid yellow !important; } #ng2-json-editor table.editable-inner-table { table-layout: fixed; } #ng2-json-editor table.editable-inner-table > tbody > tr { border-bottom: 1px solid white !important; } #ng2-json-editor table.editable-inner-table add-new-element-button .button-container { padding-left: 6px; } #ng2-json-editor table.editable-inner-table label { display: inline; font-weight: initial; padding-left: 5px; } #ng2-json-editor table.editable-inner-table .dropdown-menu { left: inherit; right: 0px; min-width: 100px; } #ng2-json-editor .title-dropdown-item button { width: 100%; text-align: left; padding-left: 20px !important; padding-right: 20px !important; } #ng2-json-editor .title-dropdown-item:hover { background: #f5f5f5; } #ng2-json-editor .tooltip.top .tooltip-arrow { border-top-color: transparent; } #ng2-json-editor .tooltip { width: 90%; } #ng2-json-editor button.btn-toggle { float: right; margin-top: 5px; margin-right: 5px; } #ng2-json-editor .autocomplete-container .dropdown { position: relative !important; top: 0px !important; left: 0px !important; } #ng2-json-editor div.admin-mode { padding-top: 8px; width: 100%; } #ng2-json-editor label.admin-mode { color: #e0dfdf; font-size: 13px; font-weight: normal; width: 90%; padding-left: 4px; } #ng2-json-editor hr { margin-top: 5px; margin-bottom: 5px; border-top: 1px solid #757575; } #ng2-json-editor .btn.btn-success { background-color: #16a085; border-color: #16a085; color: white; } #ng2-json-editor .btn.btn-success:hover, #ng2-json-editor .btn.btn-success:active, #ng2-json-editor .btn.btn-success:focus { background-color: #19b698 !important; color: white; } #ng2-json-editor .btn .fa { margin-right: 2px; } #ng2-json-editor .nav { margin-bottom: 3px; } #ng2-json-editor .nav-tabs > li.active > a, #ng2-json-editor .nav-tabs > li.active > a:hover, #ng2-json-editor .nav-tabs > li.active > a:focus { border-top: 1px solid #2c3e50; background-color: white; } #ng2-json-editor .nav-tabs > li > a:hover { border-top: 1px solid #2c3e50; border-bottom: 1px solid transparent; border-left: 1px solid transparent; border-right: 1px solid transparent; transition: all .4s; } #ng2-json-editor .nav.nav-tabs { border-bottom: 5px solid white; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.24); } #ng2-json-editor .nav-tabs > li > a { margin-right: 0px; border-radius: 0px; border-right: 1px solid #e0e2e2; } #ng2-json-editor .disabled { cursor: not-allowed; } #ng2-json-editor .disabled div { pointer-events: none; } #ng2-json-editor .disabled div input, #ng2-json-editor .disabled div button, #ng2-json-editor .disabled div a, #ng2-json-editor .disabled div i, #ng2-json-editor .disabled div string-input > div { opacity: .5; } #ng2-json-editor .disabled button { pointer-events: none; } #ng2-json-editor .pagination > .active > a { background-color: #31617B; border-color: #31617B; } #ng2-json-editor .btn.btn-switch { background-color: #7DA0B3; } #ng2-json-editor .btn.btn-switch.active { background-color: #31617B; } .bottom-console-container { height: 25%; overflow: hidden; } .bottom-console-container .tab-content { height: 90%; overflow: scroll; } .red-left-border { border-left: 9px solid #e74c3c !important; } .max-height-90-vh { max-height: 90vh; } .max-height-70-vh { max-height: 70vh; } complex-list-field add-field-dropdown { display: none; } "],
                template: "<div id=\"ng2-json-editor\" class=\"row editor-container\" [ngClass]=\"shorterEditorContainerClass\"> <div *ngIf=\"!config.compact\" class=\"col-md-2 menu-container\"> <tree-menu [record]=\"_record\" [schema]=\"fixedSchema\"></tree-menu> <add-field-dropdown [fields]=\"keys$ | async\" [pathString]=\"pathString\" [schema]=\"fixedSchema\">Add field</add-field-dropdown> <hr> <div *ngIf=\"config.enableAdminModeSwitch\" class=\"admin-mode\" tooltip=\"Allows editing all fields (use with care)\"> <input id=\"admin-mode-checkbox\" type=\"checkbox\" [(ngModel)]=\"appGlobalsService.adminMode\" /> <label class=\"admin-mode\" for=\"admin-mode-checkbox\">Enable Admin Mode</label> </div> <hr> <bottom-console-badges (badgeClick)=\"openBottomConsole($event)\"></bottom-console-badges> </div> <div id=\"middle-main-container\" class=\"middle main-container\" [class.compact]=\"config.compact\" [ngClass]=\"middleContainerColMdClass\" [shortcuts]=\"customShortcutKeys\"> <add-field-dropdown *ngIf=\"config.compact\" [fields]=\"keys$ | async\" [pathString]=\"pathString\" [schema]=\"fixedSchema\">Add field</add-field-dropdown>     <tabset *ngIf=\"config.tabsConfig\"> <tab *ngFor=\"let tabName of tabNames; trackBy:trackByElement\" [heading]=\"tabName\" (select)=\"activeTabName = tabName\" [active]=\"isActiveTab(tabName)\"> <sub-record [value]=\"_record\" [tabName]=\"tabName\" [schema]=\"fixedSchema\" [keys]=\"keys$ | async\" [pathString]=\"pathString\"></sub-record> </tab> </tabset> <sub-record *ngIf=\"!config.tabsConfig\" [value]=\"_record\" [schema]=\"fixedSchema\" [keys]=\"keys$ | async\" [pathString]=\"pathString\"></sub-record> </div> <div id=\"right-main-container\" *ngIf=\"!isPreviewerDisabled\" [ngClass]=\"rightContainerColMdClass\" class=\"main-container\"> <button id=\"btn-preview-toggle\" type=\"button\" class=\"btn btn-default btn-toggle\" (click)=\"isPreviewerHidden = !isPreviewerHidden\">{{isPreviewerHidden ? \"Show Preview\" : \"Hide Preview\"}}</button> <editor-previewer [hidden]=\"isPreviewerHidden\" [previews]=\"previews\"> </editor-previewer> </div> </div> <bottom-console *ngIf=\"!config.compact\" [activeTab]=\"bottomConsoleActiveTab\" [isOpen]=\"isBottomConsoleOpen\" (onCollapse)=\"isBottomConsoleOpen = $event\"></bottom-console> <!-- Modal View controlled by ModalService --> <modal-view> </modal-view>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
JsonEditorComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["h" /* JsonUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["f" /* JsonSchemaService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["j" /* KeysStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["o" /* RecordFixerService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["r" /* SchemaFixerService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["u" /* TabsUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["m" /* PathUtilService */], },
]; };
JsonEditorComponent.propDecorators = {
    'config': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'record': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'problemMap': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'jsonPatches': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'templates': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'recordChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'jsonPatchesChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'validationProblems': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
};


/***/ }),

/***/ "../../../../../dist/src/json-editor.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JsonEditorModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rxjs_operators__ = __webpack_require__("../../../../../dist/src/rxjs-operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_tooltip__ = __webpack_require__("../../../../ngx-bootstrap/tooltip/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_popover__ = __webpack_require__("../../../../ngx-bootstrap/popover/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_pagination__ = __webpack_require__("../../../../ngx-bootstrap/pagination/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_typeahead__ = __webpack_require__("../../../../ngx-bootstrap/typeahead/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_slide_toggle__ = __webpack_require__("../../../../ng2-slide-toggle/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__add_field_dropdown__ = __webpack_require__("../../../../../dist/src/add-field-dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__add_new_element_button__ = __webpack_require__("../../../../../dist/src/add-new-element-button/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__any_type_field__ = __webpack_require__("../../../../../dist/src/any-type-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__autocomplete_input__ = __webpack_require__("../../../../../dist/src/autocomplete-input/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__complex_list_field__ = __webpack_require__("../../../../../dist/src/complex-list-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__editor_previewer__ = __webpack_require__("../../../../../dist/src/editor-previewer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__sub_record__ = __webpack_require__("../../../../../dist/src/sub-record/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__bottom_console_badges__ = __webpack_require__("../../../../../dist/src/bottom-console-badges/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__find_replace__ = __webpack_require__("../../../../../dist/src/find-replace/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__html_view__ = __webpack_require__("../../../../../dist/src/html-view/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__json_editor_component__ = __webpack_require__("../../../../../dist/src/json-editor.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__modal_view__ = __webpack_require__("../../../../../dist/src/modal-view/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__object_field__ = __webpack_require__("../../../../../dist/src/object-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__primitive_list_field__ = __webpack_require__("../../../../../dist/src/primitive-list-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__primitive_field__ = __webpack_require__("../../../../../dist/src/primitive-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ref_field__ = __webpack_require__("../../../../../dist/src/ref-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__table_list_field__ = __webpack_require__("../../../../../dist/src/table-list-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__table_item_field__ = __webpack_require__("../../../../../dist/src/table-item-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__title_dropdown__ = __webpack_require__("../../../../../dist/src/title-dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__string_input__ = __webpack_require__("../../../../../dist/src/string-input/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__tree_menu__ = __webpack_require__("../../../../../dist/src/tree-menu/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__searchable_dropdown__ = __webpack_require__("../../../../../dist/src/searchable-dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__list_action_group__ = __webpack_require__("../../../../../dist/src/list-action-group/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__shared__ = __webpack_require__("../../../../../dist/src/shared/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__bottom_console__ = __webpack_require__("../../../../../dist/src/bottom-console/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__text_diff__ = __webpack_require__("../../../../../dist/src/text-diff/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__patch_actions__ = __webpack_require__("../../../../../dist/src/patch-actions/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__add_patch_view__ = __webpack_require__("../../../../../dist/src/add-patch-view/index.js");
/* unused harmony reexport AddFieldDropdownComponent */
/* unused harmony reexport AddNestedFieldDropdownComponent */
/* unused harmony reexport AddNewElementButtonComponent */
/* unused harmony reexport AnyTypeFieldComponent */
/* unused harmony reexport AutocompleteInputComponent */
/* unused harmony reexport ComplexListFieldComponent */
/* unused harmony reexport ObjectFieldComponent */
/* unused harmony reexport EditorPreviewerComponent */
/* unused harmony reexport BottomConsoleComponent */
/* unused harmony reexport FindReplaceComponent */
/* unused harmony reexport ModalViewComponent */
/* unused harmony reexport PrimitiveListFieldComponent */
/* unused harmony reexport PrimitiveFieldComponent */
/* unused harmony reexport RefFieldComponent */
/* unused harmony reexport SearchableDropdownComponent */
/* unused harmony reexport ListActionGroupComponent */
/* unused harmony reexport TableListFieldComponent */
/* unused harmony reexport TableItemFieldComponent */
/* unused harmony reexport TitleDropdownComponent */
/* unused harmony reexport TreeMenuItemComponent */
/* unused harmony reexport TreeMenuComponent */
/* unused harmony reexport JsonEditorComponent */
/* unused harmony reexport SubRecordComponent */
/* unused harmony reexport HtmlViewComponent */
/* unused harmony reexport BottomConsoleBadgesComponent */
/* unused harmony reexport StringInputComponent */
/* unused harmony reexport TextDiffComponent */
/* unused harmony reexport PatchActionsComponent */
/* unused harmony reexport PatchesConsoleTabComponent */
/* unused harmony reexport ProblemsConsoleTabComponent */
/* unused harmony reexport AddPatchViewComponent */
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









































var JsonEditorModule = (function () {
    function JsonEditorModule() {
    }
    return JsonEditorModule;
}());

JsonEditorModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */], args: [{
                declarations: __WEBPACK_IMPORTED_MODULE_36__shared__["b" /* SHARED_PIPES */].concat(__WEBPACK_IMPORTED_MODULE_36__shared__["a" /* SHARED_DIRECTIVES */], [
                    __WEBPACK_IMPORTED_MODULE_13__add_field_dropdown__["a" /* AddFieldDropdownComponent */],
                    __WEBPACK_IMPORTED_MODULE_13__add_field_dropdown__["b" /* AddNestedFieldDropdownComponent */],
                    __WEBPACK_IMPORTED_MODULE_14__add_new_element_button__["a" /* AddNewElementButtonComponent */],
                    __WEBPACK_IMPORTED_MODULE_15__any_type_field__["a" /* AnyTypeFieldComponent */],
                    __WEBPACK_IMPORTED_MODULE_16__autocomplete_input__["a" /* AutocompleteInputComponent */],
                    __WEBPACK_IMPORTED_MODULE_17__complex_list_field__["a" /* ComplexListFieldComponent */],
                    __WEBPACK_IMPORTED_MODULE_25__object_field__["a" /* ObjectFieldComponent */],
                    __WEBPACK_IMPORTED_MODULE_18__editor_previewer__["a" /* EditorPreviewerComponent */],
                    __WEBPACK_IMPORTED_MODULE_21__find_replace__["a" /* FindReplaceComponent */],
                    __WEBPACK_IMPORTED_MODULE_24__modal_view__["a" /* ModalViewComponent */],
                    __WEBPACK_IMPORTED_MODULE_26__primitive_list_field__["a" /* PrimitiveListFieldComponent */],
                    __WEBPACK_IMPORTED_MODULE_27__primitive_field__["a" /* PrimitiveFieldComponent */],
                    __WEBPACK_IMPORTED_MODULE_28__ref_field__["a" /* RefFieldComponent */],
                    __WEBPACK_IMPORTED_MODULE_34__searchable_dropdown__["a" /* SearchableDropdownComponent */],
                    __WEBPACK_IMPORTED_MODULE_35__list_action_group__["a" /* ListActionGroupComponent */],
                    __WEBPACK_IMPORTED_MODULE_29__table_list_field__["a" /* TableListFieldComponent */],
                    __WEBPACK_IMPORTED_MODULE_30__table_item_field__["a" /* TableItemFieldComponent */],
                    __WEBPACK_IMPORTED_MODULE_31__title_dropdown__["a" /* TitleDropdownComponent */],
                    __WEBPACK_IMPORTED_MODULE_33__tree_menu__["b" /* TreeMenuItemComponent */],
                    __WEBPACK_IMPORTED_MODULE_33__tree_menu__["a" /* TreeMenuComponent */],
                    __WEBPACK_IMPORTED_MODULE_23__json_editor_component__["a" /* JsonEditorComponent */],
                    __WEBPACK_IMPORTED_MODULE_19__sub_record__["a" /* SubRecordComponent */],
                    __WEBPACK_IMPORTED_MODULE_22__html_view__["a" /* HtmlViewComponent */],
                    __WEBPACK_IMPORTED_MODULE_20__bottom_console_badges__["a" /* BottomConsoleBadgesComponent */],
                    __WEBPACK_IMPORTED_MODULE_37__bottom_console__["a" /* BottomConsoleComponent */],
                    __WEBPACK_IMPORTED_MODULE_32__string_input__["a" /* StringInputComponent */],
                    __WEBPACK_IMPORTED_MODULE_38__text_diff__["a" /* TextDiffComponent */],
                    __WEBPACK_IMPORTED_MODULE_39__patch_actions__["a" /* PatchActionsComponent */],
                    __WEBPACK_IMPORTED_MODULE_37__bottom_console__["b" /* PatchesConsoleTabComponent */],
                    __WEBPACK_IMPORTED_MODULE_37__bottom_console__["c" /* ProblemsConsoleTabComponent */],
                    __WEBPACK_IMPORTED_MODULE_40__add_patch_view__["a" /* AddPatchViewComponent */]
                ]),
                exports: [__WEBPACK_IMPORTED_MODULE_23__json_editor_component__["a" /* JsonEditorComponent */]],
                imports: [
                    __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_tooltip__["a" /* TooltipModule */].forRoot(),
                    __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_popover__["a" /* PopoverModule */].forRoot(),
                    __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */].forRoot(),
                    __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_pagination__["a" /* PaginationModule */].forRoot(),
                    __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_modal__["a" /* ModalModule */].forRoot(),
                    __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_tabs__["a" /* TabsModule */].forRoot(),
                    __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_typeahead__["a" /* TypeaheadModule */].forRoot(),
                    __WEBPACK_IMPORTED_MODULE_12_ng2_slide_toggle__["a" /* SlideToggleModule */],
                    __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* CommonModule */],
                    __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                    __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */]
                ],
                providers: __WEBPACK_IMPORTED_MODULE_36__shared__["c" /* SHARED_SERVICES */]
            },] },
];
/** @nocollapse */
JsonEditorModule.ctorParameters = function () { return []; };



/***/ }),

/***/ "../../../../../dist/src/list-action-group/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_action_group_component__ = __webpack_require__("../../../../../dist/src/list-action-group/list-action-group.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__list_action_group_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/list-action-group/list-action-group.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListActionGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var ListActionGroupComponent = (function () {
    function ListActionGroupComponent() {
        this.onDelete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.onMove = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    return ListActionGroupComponent;
}());

ListActionGroupComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'list-action-group',
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewEncapsulation */].None,
                styles: [""],
                template: "<div [class.disabled]=\"isDisabled\"> <button type=\"button\" class=\"editor-btn-delete\" (click)=\"onDelete.emit()\"> <i class=\"fa fa-times\"></i> </button> <button *ngIf=\"canMove\" type=\"button\" class=\"editor-btn-move-up\" (click)=\"onMove.emit(-1)\"> <i class=\"fa fa-chevron-up\"></i> </button> <button *ngIf=\"canMove\" type=\"button\" class=\"editor-btn-move-down\" (click)=\"onMove.emit(1)\"> <i class=\"fa fa-chevron-down\"></i> </button> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
ListActionGroupComponent.ctorParameters = function () { return []; };
ListActionGroupComponent.propDecorators = {
    'canMove': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'isDisabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'onDelete': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'onMove': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
};


/***/ }),

/***/ "../../../../../dist/src/modal-view/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modal_view_component__ = __webpack_require__("../../../../../dist/src/modal-view/modal-view.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__modal_view_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/modal-view/modal-view.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_subscriber__ = __webpack_require__("../../../../../dist/src/abstract-subscriber/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ModalViewComponent = (function (_super) {
    __extends(ModalViewComponent, _super);
    // TODO: unsubcribe on destroy
    function ModalViewComponent(modalService, changeDetectorRef) {
        var _this = _super.call(this) || this;
        _this.modalService = modalService;
        _this.changeDetectorRef = changeDetectorRef;
        return _this;
    }
    ModalViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modalService
            .display$
            .takeUntil(this.isDestroyed)
            .subscribe(function (display) {
            display ? _this.modal.show() : _this.modal.hide();
        });
        this.modalService
            .options$
            .takeUntil(this.isDestroyed)
            .subscribe(function (options) {
            _this.options = options;
            _this.changeDetectorRef.markForCheck();
        });
    };
    ModalViewComponent.prototype.onShow = function () {
        if (this.options && this.options.onShow) {
            this.options.onShow();
        }
    };
    return ModalViewComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_subscriber__["a" /* AbstractSubscriberComponent */]));

ModalViewComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'modal-view',
                styles: [""],
                template: "<div class=\"modal fade\" (onShown)=\"onShow()\" bsModal #modal=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" [config]=\"{ backdrop: false }\"> <div class=\"modal-dialog modal-lg\"> <div *ngIf=\"options\" class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" (click)=\"modal.hide()\">&times;</button> <h4 class=\"modal-title\">{{options.title}}</h4> </div> <div class=\"modal-body\"> <div [innerHTML]=\"options.bodyHtml\"></div> <div [ngSwitch]=\"options.type\"> <div *ngSwitchCase=\"'confirm'\"> <button class=\"btn btn-success\" (click)=\"options.onConfirm();\"> <i class=\"fa fa-check\"></i> Confirm </button> </div> </div> </div> </div> </div> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
ModalViewComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["l" /* ModalService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
]; };
ModalViewComponent.propDecorators = {
    'modal': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */], args: ['modal',] },],
};


/***/ }),

/***/ "../../../../../dist/src/object-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__object_field_component__ = __webpack_require__("../../../../../dist/src/object-field/object-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__object_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/object-field/object-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObjectFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_field__ = __webpack_require__("../../../../../dist/src/abstract-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ObjectFieldComponent = (function (_super) {
    __extends(ObjectFieldComponent, _super);
    function ObjectFieldComponent(appGlobalsService, problemsService, jsonStoreService, pathUtilService, changeDetectorRef, keysStoreService) {
        var _this = _super.call(this, appGlobalsService, problemsService, pathUtilService, changeDetectorRef, jsonStoreService) || this;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.jsonStoreService = jsonStoreService;
        _this.pathUtilService = pathUtilService;
        _this.changeDetectorRef = changeDetectorRef;
        _this.keysStoreService = keysStoreService;
        return _this;
    }
    Object.defineProperty(ObjectFieldComponent.prototype, "keys$", {
        get: function () {
            return this.keysStoreService.forPath(this.pathString);
        },
        enumerable: true,
        configurable: true
    });
    ObjectFieldComponent.prototype.deleteField = function (name) {
        var fieldPath = this.path.concat(name);
        this.jsonStoreService.removeIn(fieldPath);
    };
    ObjectFieldComponent.prototype.isPropertyDisabled = function (name) {
        return this.schema.properties[name].disabled && !this.appGlobalsService.adminMode;
    };
    ObjectFieldComponent.prototype.getTitleDropdownItemTemplateNamesForChild = function (key) {
        return this.schema.properties[key].titleDropdownItemTemplateNames;
    };
    return ObjectFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_field__["a" /* AbstractFieldComponent */]));

ObjectFieldComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'object-field',
                styles: ["table.table { background-color: #f9f9f9; } "],
                template: "<table [id]=\"pathString\" class=\"table\" [ngClass]=\"redLeftBorderClass\"> <tr *ngFor=\"let key of keys$ | async; trackBy:trackByElement\"> <!-- SUB FIELD TITLE MENU --> <td class=\"label-holder\"> <div> <title-dropdown [title]=\"key | underscoreToSpace\" [isDisabled]=\"isPropertyDisabled(key)\"> <li *ngIf=\"schema.properties[key].type === 'array'\" class=\"title-dropdown-item\"> <add-new-element-button [path]=\"getPathForChild(key)\" [schema]=\"schema.properties[key]\"></add-new-element-button> </li> <li class=\"title-dropdown-item\"> <button type=\"button\" class=\"editor-btn-delete editor-btn-delete-text\" (click)=\"deleteField(key)\">Delete</button> </li> <ng-container *ngIf=\"getTitleDropdownItemTemplateNamesForChild(key)\"> <li *ngFor=\"let templateName of getTitleDropdownItemTemplateNamesForChild(key)\" class=\"title-dropdown-item custom-title-dropdown-item\"> <ng-template [ngTemplateOutlet]=\"appGlobalsService.templates[templateName]\"></ng-template> </li> </ng-container> </title-dropdown> </div> </td> <!-- SUB FIELD COMPONENT --> <td> <any-type-field [value]=\"value.get(key) | selfOrEmpty:schema.properties[key]\" [schema]=schema.properties[key] [path]=\"getPathForChild(key)\"></any-type-field> </td> </tr> <tr *ngIf=\"removeJsonPatch\"> <patch-actions [patch]=\"removeJsonPatch\"></patch-actions> </tr> <!-- ADD SUB FIELD FROM SCHEMA DROPDOWN --> <tr> <td class=\"button-holder\"> <add-field-dropdown [fields]=\"keys$ | async\" [pathString]=\"pathString\" [schema]=\"schema\" [isDisabled]=\"disabled\"> <i class=\"fa fa-plus\"></i> </add-field-dropdown> </td> </tr> </table>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
ObjectFieldComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["j" /* KeysStoreService */], },
]; };
ObjectFieldComponent.propDecorators = {
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/patch-actions/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__patch_actions_component__ = __webpack_require__("../../../../../dist/src/patch-actions/patch-actions.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__patch_actions_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/patch-actions/patch-actions.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PatchActionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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


var PatchActionsComponent = (function () {
    function PatchActionsComponent(jsonStoreService) {
        this.jsonStoreService = jsonStoreService;
    }
    PatchActionsComponent.prototype.onAcceptClick = function () {
        this.jsonStoreService.applyPatch(this.patch);
    };
    PatchActionsComponent.prototype.onRejectClick = function () {
        this.jsonStoreService.rejectPatch(this.patch);
    };
    PatchActionsComponent.prototype.onAddNewClick = function () {
        this.patch.op = 'add-as-new';
        this.jsonStoreService.applyPatch(this.patch);
    };
    return PatchActionsComponent;
}());

PatchActionsComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'patch-actions',
                styles: [".patch-actions-container { display: inline-block; padding-left: 2px; } .patch-actions-container > button { border: none; background-color: transparent; padding: 1px 3px 1.5px; } .patch-actions-container > button .fa { font-size: 18px; } .patch-actions-container > button .fa-check-circle { color: #27ae60; } .patch-actions-container > button .fa-times-circle { color: #e74c3c; } .patch-actions-container > button .fa-plus-circle { color: #f1c40f; } "],
                template: "<div class=\"patch-actions-container\" tabindex=\"-1\"> <button><i class=\"fa fa-check-circle\" (click)=\"onAcceptClick()\"></i></button> <button><i class=\"fa fa-times-circle\" (click)=\"onRejectClick()\"></i></button> <button  *ngIf=\"addActionEnabled\"><i class=\"fa fa-plus-circle\" (click)=\"onAddNewClick()\"></i></button> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
PatchActionsComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["g" /* JsonStoreService */], },
]; };
PatchActionsComponent.propDecorators = {
    'patch': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'addActionEnabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/primitive-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__primitive_field_component__ = __webpack_require__("../../../../../dist/src/primitive-field/primitive-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__primitive_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/primitive-field/primitive-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrimitiveFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_field__ = __webpack_require__("../../../../../dist/src/abstract-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PrimitiveFieldComponent = (function (_super) {
    __extends(PrimitiveFieldComponent, _super);
    function PrimitiveFieldComponent(schemaValidationService, componentTypeService, appGlobalsService, problemsService, jsonStoreService, keysStoreService, pathUtilService, domUtilService, changeDetectorRef) {
        var _this = _super.call(this, appGlobalsService, problemsService, pathUtilService, changeDetectorRef, jsonStoreService) || this;
        _this.schemaValidationService = schemaValidationService;
        _this.componentTypeService = componentTypeService;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.jsonStoreService = jsonStoreService;
        _this.keysStoreService = keysStoreService;
        _this.pathUtilService = pathUtilService;
        _this.domUtilService = domUtilService;
        _this.changeDetectorRef = changeDetectorRef;
        _this.internalErrors = [];
        return _this;
    }
    PrimitiveFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        if (this.value !== this.schema.default) {
            this.lastCommitedValue = this.value;
        }
        this.problemsService
            .internalCategorizedProblems$
            .takeUntil(this.isDestroyed)
            .subscribe(function (internalCategorizedErrorMap) {
            _this.internalErrors = internalCategorizedErrorMap.errors[_this.pathString] || [];
        });
        this.appGlobalsService
            .adminMode$
            .takeUntil(this.isDestroyed)
            .subscribe(function (adminMode) {
            _this.changeDetectorRef.markForCheck();
        });
        this.validate();
    };
    PrimitiveFieldComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this.internalErrors.length > 0) {
            this.problemsService.setInternalProblemsForPath(this.pathString, []);
        }
    };
    PrimitiveFieldComponent.prototype.commitValueChange = function () {
        var _this = this;
        this.validate();
        this.lastCommitedValue = this.value;
        this.jsonStoreService.setIn(this.path, this.value);
        if (this.schema.onValueChange) {
            // setTimeout to workaround the case when the value is changed back to previous value inside onValuChange callback
            setTimeout(function () {
                return _this.schema.onValueChange(_this.path, _this.value, _this.jsonStoreService, _this.keysStoreService);
            });
        }
    };
    PrimitiveFieldComponent.prototype.onBlur = function () {
        this.domUtilService.clearHighlight();
        if (this.value !== this.lastCommitedValue) {
            this.commitValueChange();
        }
    };
    PrimitiveFieldComponent.prototype.onKeypress = function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            document.activeElement.blur();
        }
    };
    PrimitiveFieldComponent.prototype.onValueChange = function (value) {
        this.value = value;
    };
    PrimitiveFieldComponent.prototype.onSearchableDropdownSelect = function (value) {
        this.value = value;
        this.commitValueChange();
    };
    Object.defineProperty(PrimitiveFieldComponent.prototype, "tabIndex", {
        get: function () {
            return this.disabled ? -1 : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveFieldComponent.prototype, "tooltipPosition", {
        get: function () {
            if (this.pathString.startsWith(this.appGlobalsService.firstElementPathForCurrentTab)) {
                return 'bottom';
            }
            else {
                return 'top';
            }
        },
        enumerable: true,
        configurable: true
    });
    PrimitiveFieldComponent.prototype.hasErrors = function () {
        return _super.prototype.hasErrors.call(this) || this.internalErrors.length > 0;
    };
    Object.defineProperty(PrimitiveFieldComponent.prototype, "errorClass", {
        get: function () {
            return !this.jsonPatches[0] && this.hasErrors() ? 'error' : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrimitiveFieldComponent.prototype, "isPathToAnIndex", {
        get: function () {
            return typeof this.path[this.path.length - 1] === 'number';
        },
        enumerable: true,
        configurable: true
    });
    PrimitiveFieldComponent.prototype.validate = function () {
        // don't validate if value is empty
        if (this.value) {
            this.internalErrors = this.schemaValidationService.validateValue(this.value, this.schema);
            this.problemsService.setInternalProblemsForPath(this.pathString, this.internalErrors);
        }
    };
    return PrimitiveFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_field__["a" /* AbstractFieldComponent */]));

PrimitiveFieldComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'primitive-field',
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewEncapsulation */].None,
                styles: ["td.value-container div[contenteditable=true], td.value-container input { vertical-align: middle; transition: all 0.5s ease; border: none; background-color: transparent; display: inline-block; width: 100%; } table.primitive-field-container { width: 100%; } td.link-button-container { width: 22px; } td.value-container { width: 100%; padding: 3px 3px 3px 6px !important; } td.value-container:hover { background-color: #ffa !important; } a.no-decoration { text-decoration: none; } [contenteditable=true] { min-height: 18px; word-break: break-word; } [contenteditable=true]:empty:before { content: attr(placeholder); color: darkgray; display: block; /* For Firefox */ } .tooltip-left-align { margin-left: 12px; padding: 0px; } .btn-merge { border: none; background: transparent; width: 100%; text-align: left; white-space: normal; } .orange-left-border { border-left: 9px solid #e67e22; border-radius: 0; } .fa-bolt { color: #e67e22; } "],
                template: "<div [id]=\"pathString\"> <table class=\"primitive-field-container\" [ngSwitch]=\"schema.componentType\"> <tr [ngClass]=\"errorClass\"> <ng-template #errorsTooltipTemplate> <ul class=\"tooltip-left-align\"> <li *ngFor=\"let error of internalErrors\"> {{error.message}} </li> <li *ngFor=\"let error of externalErrors\"> {{error.message}} </li> </ul> </ng-template> <td *ngIf=\"!jsonPatches[0]; else patchTemplate\" class=\"value-container\" [class.disabled]=\"disabled\" [tooltip]=\"errorsTooltipTemplate\" [isDisabled]=\"!hasErrors()\" placement=\"{{tooltipPosition}}\" container=\"body\"> <div *ngSwitchCase=\"'string'\"> <string-input [pathString]=\"pathString\" [value]=\"value\" (valueChange)=\"onValueChange($event)\" [disabled]=\"disabled\" [tabIndex]=\"tabIndex\" [latexPreviewEnabled]=\"schema.latexPreviewEnabled\" [placeholder]=\"schema.title\" (blur)=\"onBlur()\" (onKeypress)=\"onKeypress($event)\"> </string-input> </div> <div *ngSwitchCase=\"'enum'\"> <searchable-dropdown [pathString]=\"pathString\" [value]=\"value\" [placeholder]=\"schema.title\" [items]=\"schema.enum\" [shortcutMap]=\"schema.enumShorcutMap\" (onSelect)=\"onSearchableDropdownSelect($event)\" [displayValueMap]=\"schema.enumDisplayValueMap\" [tabIndex]=\"tabIndex\" (onBlur)=\"onBlur()\"></searchable-dropdown> </div> <div *ngSwitchCase=\"'autocomplete'\"> <autocomplete-input [pathString]=\"pathString\" [value]=\"value\" [path]=\"path\" [autocompletionConfig]=\"schema.autocompletionConfig\" (onBlur)=\"onBlur()\" (onKeypress)=\"onKeypress($event)\" (onValueChange)=\"onValueChange($event)\" [placeholder]=\"schema.title\" [tabIndex]=\"tabIndex\"></autocomplete-input> </div> <div *ngSwitchCase=\"'integer'\"> <input type=\"number\" [(ngModel)]=\"value\" [tabindex]=\"tabIndex\" [attr.data-path]=\"pathString\" (blur)=\"onBlur()\" (keypress)=\"onKeypress($event)\" [placeholder]=\"schema.title\"> </div> <div *ngSwitchCase=\"'boolean'\"> <input type=\"checkbox\" [(ngModel)]=\"value\" (ngModelChange)=\"onBlur()\" [placeholder]=\"schema.title\"> </div> <div *ngSwitchDefault> ## Not recognized type: {{valueType}} </div> </td> <td class=\"link-button-container\"> <a *ngIf=\"schema.linkBuilder\" class=\"no-decoration\" target=\"_blank\" [href]=\"schema.linkBuilder(value)\"> <i class=\"fa fa-link\" aria-hidden=\"true\"></i> </a> <a *ngIf=\"!schema.linkBuilder && schema.format === 'url'\" class=\"no-decoration\" target=\"_blank\" [href]=\"value\"> <i class=\"fa fa-link\" aria-hidden=\"true\"></i> </a> </td> </tr> </table> </div> <ng-template #patchTemplate> <button class=\"btn btn-default btn-merge orange-left-border\" type=\"button\" [popover]=\"mergePopover\" [popoverContext]=\"{currentValue: value, patchValue: jsonPatches[0].value}\" popoverTitle=\"Merge\" container=\"body\"> {{value}} <i class=\"fa fa-bolt\"></i> </button> </ng-template> <ng-template let-currentValue=\"currentValue\" let-patchValue=\"patchValue\" #mergePopover > <text-diff [currentText]=\"currentValue\" [newText]=\"patchValue\"></text-diff> <patch-actions [patch]=\"jsonPatches[0]\" [addActionEnabled]=\"isPathToAnIndex\"></patch-actions> </ng-template>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
PrimitiveFieldComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["s" /* SchemaValidationService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["b" /* ComponentTypeService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["j" /* KeysStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
]; };
PrimitiveFieldComponent.propDecorators = {
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/primitive-list-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__primitive_list_field_component__ = __webpack_require__("../../../../../dist/src/primitive-list-field/primitive-list-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__primitive_list_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/primitive-list-field/primitive-list-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrimitiveListFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_list_field__ = __webpack_require__("../../../../../dist/src/abstract-list-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PrimitiveListFieldComponent = (function (_super) {
    __extends(PrimitiveListFieldComponent, _super);
    function PrimitiveListFieldComponent(appGlobalsService, problemsService, jsonStoreService, pathUtilService, changeDetectorRef) {
        var _this = _super.call(this, appGlobalsService, problemsService, jsonStoreService, pathUtilService, changeDetectorRef) || this;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.jsonStoreService = jsonStoreService;
        _this.pathUtilService = pathUtilService;
        _this.changeDetectorRef = changeDetectorRef;
        return _this;
    }
    return PrimitiveListFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_list_field__["a" /* AbstractListFieldComponent */]));

PrimitiveListFieldComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'primitive-list-field',
                styles: ["td { padding: 0px !important; } "],
                template: "<div [id]=\"pathString\" [ngClass]=\"redLeftBorderClass\"> <div class=\"wide\"> <table class=\"table\"> <tr *ngFor=\"let value of values | selfOrEmpty:schema; let i = index; trackBy:trackByIndex\"> <td> <any-type-field [value]=\"value\" [schema]=\"schema.items\" [path]=\"getPathForChild(i)\"></any-type-field> </td> <td *ngIf=\"values.size > 0\" class=\"button-holder\" [class.sortable]=\"schema.sortable\"> <list-action-group (onMove)=\"moveElement(i, $event)\" (onDelete)=\"deleteElement(i)\" [canMove]=\"schema.sortable\" [isDisabled]=\"disabled\"></list-action-group> </td> </tr> <tr *ngIf=\"removeJsonPatch\"> <patch-actions [patch]=\"removeJsonPatch\"></patch-actions> </tr> </table> <table class=\"table\"> <tr *ngFor=\"let patch of addJsonPatches\"> <add-patch-view [patch]=\"patch\"></add-patch-view> </tr> </table> </div> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
PrimitiveListFieldComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
]; };
PrimitiveListFieldComponent.propDecorators = {
    'values': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/ref-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ref_field_component__ = __webpack_require__("../../../../../dist/src/ref-field/ref-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ref_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/ref-field/ref-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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




var RefFieldComponent = (function () {
    function RefFieldComponent(http, changeDetectorRef, appGlobalsService, pathUtilService) {
        this.http = http;
        this.changeDetectorRef = changeDetectorRef;
        this.appGlobalsService = appGlobalsService;
        this.pathUtilService = pathUtilService;
        this.isPreviewButtonHidden = false;
    }
    RefFieldComponent.prototype.ngOnChanges = function (changes) {
        if (this.refConfig) {
            var valueChange = changes['value'];
            var schemaChange = changes['schema'];
            if (valueChange && this.refConfig && this.refConfig.anchorBuilder && this.ref) {
                this.anchorAttributes = this.refConfig.anchorBuilder(this.ref);
            }
            // instead of ngOnInit because requestOptions has to be set before fetching
            if (schemaChange && schemaChange.isFirstChange()) {
                this.requestOptions = this.createRequestOptionsWithConfig();
            }
            if (valueChange && this.isTemplateEnabled) {
                if (this.refConfig.lazy) {
                    this.isPreviewButtonHidden = false;
                }
                else {
                    this.fetchRef();
                }
            }
        }
        if (changes['path']) {
            this.pathString = this.pathUtilService.toPathString(this.path);
        }
    };
    RefFieldComponent.prototype.onPreviewClick = function () {
        this.isPreviewButtonHidden = true;
        this.fetchRef();
    };
    Object.defineProperty(RefFieldComponent.prototype, "customTemplate", {
        get: function () {
            return this.appGlobalsService.templates[this.refConfig.templateName];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RefFieldComponent.prototype, "refConfig", {
        get: function () {
            return this.schema.refFieldConfig;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RefFieldComponent.prototype, "ref", {
        get: function () {
            return this.value.get('$ref');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RefFieldComponent.prototype, "anchorHref", {
        get: function () {
            return this.anchorAttributes ? this.anchorAttributes.href : this.ref;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RefFieldComponent.prototype, "anchorDisplay", {
        get: function () {
            return this.anchorAttributes ? this.anchorAttributes.display : this.ref;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RefFieldComponent.prototype, "isTemplateEnabled", {
        get: function () {
            return this.refConfig !== undefined && this.refConfig.templateName !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RefFieldComponent.prototype, "shouldDisplayTemplate", {
        get: function () {
            return this.isPreviewButtonHidden || !this.refConfig.lazy;
        },
        enumerable: true,
        configurable: true
    });
    RefFieldComponent.prototype.fetchRef = function () {
        var _this = this;
        this.refData = undefined;
        this.http
            .get(this.ref, this.requestOptions)
            .map(function (res) { return res.json(); })
            .catch(function (error) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of({ $error: error });
        }).subscribe(function (data) {
            _this.refData = data;
            _this.changeDetectorRef.markForCheck();
        });
    };
    RefFieldComponent.prototype.createRequestOptionsWithConfig = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        if (this.refConfig.headers) {
            this.refConfig.headers
                .forEach(function (header) { return headers.append(header.name, header.value); });
        }
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
    };
    return RefFieldComponent;
}());

RefFieldComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'ref-field',
                styles: ["button.btn-preview-template { background: transparent; border: 0; width: 100%; height: 100%; } .align-center { width: 100%; text-align: center; } .break-word { word-break: break-word; } "],
                template: "<div [id]=\"pathString\"> <div *ngIf=\"ref\"> <div *ngIf=\"isTemplateEnabled\"> <button class=\"btn-preview-template\" *ngIf=\"!shouldDisplayTemplate\" (click)=\"onPreviewClick($event)\"><i class=\"fa fa-eye\"></i></button> <div *ngIf=\"shouldDisplayTemplate\"> <ng-template *ngIf=\"refData\" [ngTemplateOutlet]=\"customTemplate\" [ngTemplateOutletContext]=\"{response: refData}\"></ng-template> <i *ngIf=\"!refData\" class=\"fa fa-spinner fa-spin align-center\"></i> </div> </div> <div *ngIf=\"!isTemplateEnabled\"> <a target=\"_blank\" class=\"break-word\" [href]=\"anchorHref\">{{anchorDisplay}}</a> </div> </div> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
RefFieldComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__shared_services__["m" /* PathUtilService */], },
]; };
RefFieldComponent.propDecorators = {
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/rxjs-operators.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_distinctUntilChanged___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_distinctUntilChanged__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_skipWhile__ = __webpack_require__("../../../../rxjs/add/operator/skipWhile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_skipWhile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_skipWhile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil__);
// All rxjs operators used in the codebase









/***/ }),

/***/ "../../../../../dist/src/searchable-dropdown/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__searchable_dropdown_component__ = __webpack_require__("../../../../../dist/src/searchable-dropdown/searchable-dropdown.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__searchable_dropdown_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/searchable-dropdown/searchable-dropdown.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchableDropdownComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_bi_directional_map_dist__ = __webpack_require__("../../../../bi-directional-map/dist/index.js");
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


var SearchableDropdownComponent = (function () {
    function SearchableDropdownComponent() {
        this.onSelect = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.onBlur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    SearchableDropdownComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['value']) {
            this.placeholder = this.value || this.placeholder || '';
        }
        if (changes['displayValueMap'] || changes['items']) {
            this.displayValueMap = this.displayValueMap || Object.create(null);
            this.biDisplayValueMap = new __WEBPACK_IMPORTED_MODULE_1_bi_directional_map_dist__["a" /* BiDirectionalMap */](this.displayValueMap);
            // set original value as display value for not configured items.
            this.items
                .filter(function (item) { return !_this.displayValueMap[item]; })
                .forEach(function (item) {
                _this.biDisplayValueMap.set(item, item);
            });
            this.displayValues = Array.from(this.biDisplayValueMap.values());
        }
    };
    SearchableDropdownComponent.prototype.onItemClick = function (displayValue) {
        var originalValue = this.biDisplayValueMap.getKey(displayValue);
        this.onSelect.emit(originalValue);
        // only necessary to force closing when selected is item equals to value
        // in which case dropdown doesn't close automatically for some reason
        this.dropdown.hide();
    };
    SearchableDropdownComponent.prototype.onEnterKeyUp = function () {
        if (this.shortcutMap && this.shortcutMap[this.expression]) {
            this.onItemClick(this.shortcutMap[this.expression]);
        }
        this.dropdown.hide();
    };
    SearchableDropdownComponent.prototype.showDropdown = function () {
        var _this = this;
        this.dropdown.show();
        this.expression = '';
        setTimeout(function () {
            _this.filterInputElRef.nativeElement.focus();
        });
    };
    SearchableDropdownComponent.prototype.onInputBlur = function (event) {
        // this avoids closing dropdown when an item is selected
        // so that onItemClick() can be executed properly before closing.
        var relatedTarget = event.relatedTarget;
        if (!relatedTarget || relatedTarget.className !== 'dropdown-item') {
            this.dropdown.hide();
        }
        this.onBlur.emit();
    };
    return SearchableDropdownComponent;
}());

SearchableDropdownComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'searchable-dropdown',
                styles: ["div.btn-group { width: 100%; } .dropdown-menu { left: 0px !important; } .toggle-container { width: 100%; display: inline-flex; } .toggle-container .value { flex-grow: 1; } .dropdown-toggle { box-shadow: none !important; } "],
                template: "<div class=\"btn-group\" #dropdown=\"bs-dropdown\" dropdown keyboardNav=\"true\"> <!-- there is no dropdownToggle since it is handled manually see: onInputFocus and onInputBlur in ts --> <div class=\"toggle-container\"> <input *ngIf=\"dropdown.isOpen; else valueDisplayTemplate\" #filterInput class=\"value\" attr.data-path=\"{{pathString}}\" [placeholder]=\"placeholder\" [(ngModel)]=\"expression\" (keyup.enter)=\"onEnterKeyUp()\" (blur)=\"onInputBlur($event)\"> <i class=\"fa fa-caret-down\" (click)=\"showDropdown()\"></i> </div> <ul class=\"dropdown-menu\" *dropdownMenu role=\"menu\"> <li *ngFor=\"let displayValue of displayValues | filterByExpression:expression\" role=\"menuitem\"> <!-- href is needed for keyboard navigation --> <a class=\"dropdown-item\" href=\"javascript:void(0)\" (click)=\"onItemClick(displayValue)\">{{displayValue}}</a> </li> </ul> </div> <ng-template #valueDisplayTemplate> <span class=\"value\" [tabindex]=\"tabIndex\" (focus)=\"showDropdown()\">{{biDisplayValueMap.getValue(value)}}</span> </ng-template>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
SearchableDropdownComponent.ctorParameters = function () { return []; };
SearchableDropdownComponent.propDecorators = {
    'items': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'shortcutMap': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'displayValueMap': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'pathString': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'tabIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'placeholder': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'onSelect': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'onBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'filterInputElRef': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */], args: ['filterInput',] },],
    'dropdown': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */], args: ['dropdown',] },],
};


/***/ }),

/***/ "../../../../../dist/src/shared/classes/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sized_stack__ = __webpack_require__("../../../../../dist/src/shared/classes/sized-stack.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__sized_stack__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/shared/classes/sized-stack.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SizedStack; });
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
var SizedStack = (function () {
    function SizedStack(size) {
        this.values = new Array();
        this.size = size;
    }
    SizedStack.prototype.push = function (value) {
        this.values.push(value);
        if (this.values.length > this.size) {
            this.values.shift();
        }
    };
    SizedStack.prototype.pop = function () {
        return this.values.pop();
    };
    return SizedStack;
}());



/***/ }),

/***/ "../../../../../dist/src/shared/directives/content-model.directive.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentModelDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");

var ContentModelDirective = (function () {
    function ContentModelDirective(elementRef) {
        this.elementRef = elementRef;
        this.contentModelChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    ContentModelDirective.prototype.ngOnChanges = function (changes) {
        if (changes['contentModel']) {
            this.refresh();
        }
    };
    ContentModelDirective.prototype.onBlur = function () {
        this.emitContentModelChange();
    };
    ContentModelDirective.prototype.onKeypress = function (event) {
        if (event.key === 'Enter') {
            this.emitContentModelChange();
        }
    };
    ContentModelDirective.prototype.emitContentModelChange = function () {
        var value = this.elementRef.nativeElement.innerText;
        this.contentModelChange.emit(value);
    };
    ContentModelDirective.prototype.refresh = function () {
        this.elementRef.nativeElement.innerText = this.contentModel;
    };
    return ContentModelDirective;
}());

ContentModelDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */], args: [{
                selector: '[contentModel]'
            },] },
];
/** @nocollapse */
ContentModelDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], },
]; };
ContentModelDirective.propDecorators = {
    'contentModel': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'contentModelChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'onBlur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */], args: ['blur',] },],
    'onKeypress': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* HostListener */], args: ['keypress', ['$event'],] },],
};


/***/ }),

/***/ "../../../../../dist/src/shared/directives/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SHARED_DIRECTIVES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shortcuts_directive__ = __webpack_require__("../../../../../dist/src/shared/directives/shortcuts.directive.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_model_directive__ = __webpack_require__("../../../../../dist/src/shared/directives/content-model.directive.js");
/* unused harmony reexport ShortcutsDirective */
/* unused harmony reexport ContentModelDirective */



var SHARED_DIRECTIVES = [
    __WEBPACK_IMPORTED_MODULE_0__shortcuts_directive__["a" /* ShortcutsDirective */],
    __WEBPACK_IMPORTED_MODULE_1__content_model_directive__["a" /* ContentModelDirective */]
];


/***/ }),

/***/ "../../../../../dist/src/shared/directives/shortcuts.directive.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShortcutsDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mousetrap__ = __webpack_require__("../../../../mousetrap/mousetrap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mousetrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mousetrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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



var ShortcutsDirective = (function () {
    function ShortcutsDirective(el, shortcutActionService) {
        this.el = el;
        this.shortcutActionService = shortcutActionService;
        // actions with default shortcut keys, update with the custom keys later
        this.actionNameToShortcut = {
            add: {
                key: 'alt+a',
                action: this.shortcutActionService.generateShortcutAction('addAction')
            },
            addToRoot: {
                key: 'mod+shift+a',
                action: this.shortcutActionService.generateShortcutAction('addToRootAction')
            },
            addBelowToRoot: {
                key: 'mod+shift+b',
                action: this.shortcutActionService.generateShortcutAction('addBelowToRootAction')
            },
            moveUp: {
                key: 'mod+shift+up',
                action: this.shortcutActionService.generateShortcutAction('moveUpAction')
            },
            moveDown: {
                key: 'mod+shift+down',
                action: this.shortcutActionService.generateShortcutAction('moveDownAction')
            },
            moveUpRoot: {
                key: 'mod+alt+up',
                action: this.shortcutActionService.generateShortcutAction('moveUpRootAction')
            },
            moveDownRoot: {
                key: 'mod+alt+down',
                action: this.shortcutActionService.generateShortcutAction('moveDownRootAction')
            },
            delete: {
                key: 'mod+backspace',
                action: this.shortcutActionService.generateShortcutAction('deleteAction')
            },
            navigateUp: {
                key: 'mod+up',
                action: this.shortcutActionService.generateShortcutAction('navigateUpAction')
            },
            navigateDown: {
                key: 'mod+down',
                action: this.shortcutActionService.generateShortcutAction('navigateDownAction')
            },
            navigateLeft: {
                key: 'mod+left',
                action: this.shortcutActionService.generateShortcutAction('navigateLeftAction')
            },
            navigateRight: {
                key: 'mod+right',
                action: this.shortcutActionService.generateShortcutAction('navigateRightAction')
            },
            copy: {
                key: 'alt+c',
                action: this.shortcutActionService.generateShortcutAction('copyAction')
            },
            copyFromRoot: {
                key: 'mod+alt+r',
                action: this.shortcutActionService.generateShortcutAction('copyFromRootAction')
            },
            undo: {
                key: 'mod+alt+z',
                action: this.shortcutActionService.generateShortcutAction('undoAction')
            }
        };
        this.mousetrap = new Mousetrap(this.el.nativeElement);
    }
    ShortcutsDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var customShortcutKeysChange = changes['shortcuts'];
        if (customShortcutKeysChange) {
            var actionNames = Object.keys(this.actionNameToShortcut);
            // if custom shortcut keys are set
            if (this.shortcuts) {
                actionNames.forEach(function (actionName) {
                    var shortcut = _this.actionNameToShortcut[actionName];
                    if (_this.shortcuts[actionName]) {
                        // override shortcut key
                        shortcut.key = _this.shortcuts[actionName];
                    }
                    _this.mousetrap.bind(shortcut.key, shortcut.action);
                });
            }
            else {
                actionNames.forEach(function (actionName) {
                    var shortcut = _this.actionNameToShortcut[actionName];
                    _this.mousetrap.bind(shortcut.key, shortcut.action);
                });
            }
        }
    };
    ShortcutsDirective.prototype.ngOnDestroy = function () {
        var _this = this;
        Object.keys(this.actionNameToShortcut)
            .forEach(function (actionName) {
            _this.mousetrap.unbind(_this.actionNameToShortcut[actionName].key);
        });
    };
    return ShortcutsDirective;
}());

ShortcutsDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */], args: [{
                selector: '[shortcuts]'
            },] },
];
/** @nocollapse */
ShortcutsDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__services__["t" /* ShortcutActionService */], },
]; };
ShortcutsDirective.propDecorators = {
    'shortcuts': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/shared/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes__ = __webpack_require__("../../../../../dist/src/shared/pipes/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives__ = __webpack_require__("../../../../../dist/src/shared/directives/index.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__pipes__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__services__["q"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__directives__["a"]; });






/***/ }),

/***/ "../../../../../dist/src/shared/pipes/add-always-show-fields.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddAlwaysShowFieldsPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var AddAlwaysShowFieldsPipe = (function () {
    function AddAlwaysShowFieldsPipe() {
    }
    AddAlwaysShowFieldsPipe.prototype.transform = function (fields, schema) {
        var alwaysShowFields = schema.alwaysShow || [];
        return fields.union(alwaysShowFields);
    };
    return AddAlwaysShowFieldsPipe;
}());

AddAlwaysShowFieldsPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'addAlwaysShowFields'
            },] },
];
/** @nocollapse */
AddAlwaysShowFieldsPipe.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/different-keys.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DifferentKeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("../../../../immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
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


/**
 * It returns array of keys which aren't present in given object
 */
var DifferentKeysPipe = (function () {
    function DifferentKeysPipe() {
    }
    DifferentKeysPipe.prototype.transform = function (object, keys) {
        return __WEBPACK_IMPORTED_MODULE_1_immutable__["Set"].fromKeys(object).subtract(keys);
    };
    return DifferentKeysPipe;
}());

DifferentKeysPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'differentKeys'
            },] },
];
/** @nocollapse */
DifferentKeysPipe.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/filter-by-expression.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterByExpressionPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var FilterByExpressionPipe = (function () {
    function FilterByExpressionPipe() {
    }
    FilterByExpressionPipe.prototype.transform = function (array, prefix) {
        var pattern = new RegExp(prefix, 'i');
        return array.filter(function (value) { return value.match(pattern); });
    };
    return FilterByExpressionPipe;
}());

FilterByExpressionPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'filterByExpression',
            },] },
];
/** @nocollapse */
FilterByExpressionPipe.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/filter-hidden-fields.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterHiddenFieldsPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var FilterHiddenFieldsPipe = (function () {
    function FilterHiddenFieldsPipe() {
    }
    /**
     * It filters out `hidden` fields
     *
     * @param keys
     * @param schema - the `schema` that has object schema which contains each key in `keys`
     * @return - filtered keys
     */
    FilterHiddenFieldsPipe.prototype.transform = function (keys, schema, adminMode) {
        var schemaProps = schema.properties;
        if (!keys) {
            return undefined;
        }
        return keys
            .filter(function (key) {
            if (!schemaProps[key]) {
                throw new Error("\"" + key + "\" is not specified as property in \n" + JSON.stringify(schemaProps, undefined, 2));
            }
            return !schemaProps[key].hidden || adminMode;
        });
    };
    return FilterHiddenFieldsPipe;
}());

FilterHiddenFieldsPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'filterHiddenFields',
            },] },
];
/** @nocollapse */
FilterHiddenFieldsPipe.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SHARED_PIPES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_always_show_fields_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/add-always-show-fields.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__different_keys_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/different-keys.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter_by_expression_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/filter-by-expression.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__filter_hidden_fields_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/filter-hidden-fields.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sanitize_url_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/sanitize-url.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__self_or_empty_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/self-or-empty.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__underscore_to_space_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/underscore-to-space.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__set_first_element_path_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/set-first-element-path.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sort_alphabetically_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/sort-alphabetically.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__keys_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/keys-pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__last_path_element_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/last-path-element.pipe.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__type_of_pipe__ = __webpack_require__("../../../../../dist/src/shared/pipes/type-of.pipe.js");
/* unused harmony reexport AddAlwaysShowFieldsPipe */
/* unused harmony reexport DifferentKeysPipe */
/* unused harmony reexport FilterByExpressionPipe */
/* unused harmony reexport FilterHiddenFieldsPipe */
/* unused harmony reexport SanitizeUrlPipe */
/* unused harmony reexport SelfOrEmptyPipe */
/* unused harmony reexport UnderscoreToSpacePipe */
/* unused harmony reexport SetFirstElementPathPipe */
/* unused harmony reexport SortAlphabeticallyPipe */
/* unused harmony reexport KeysPipe */
/* unused harmony reexport LastPathElementPipe */
/* unused harmony reexport TypeOfPipe */













var SHARED_PIPES = [
    __WEBPACK_IMPORTED_MODULE_0__add_always_show_fields_pipe__["a" /* AddAlwaysShowFieldsPipe */],
    __WEBPACK_IMPORTED_MODULE_1__different_keys_pipe__["a" /* DifferentKeysPipe */],
    __WEBPACK_IMPORTED_MODULE_2__filter_by_expression_pipe__["a" /* FilterByExpressionPipe */],
    __WEBPACK_IMPORTED_MODULE_3__filter_hidden_fields_pipe__["a" /* FilterHiddenFieldsPipe */],
    __WEBPACK_IMPORTED_MODULE_4__sanitize_url_pipe__["a" /* SanitizeUrlPipe */],
    __WEBPACK_IMPORTED_MODULE_5__self_or_empty_pipe__["a" /* SelfOrEmptyPipe */],
    __WEBPACK_IMPORTED_MODULE_6__underscore_to_space_pipe__["a" /* UnderscoreToSpacePipe */],
    __WEBPACK_IMPORTED_MODULE_7__set_first_element_path_pipe__["a" /* SetFirstElementPathPipe */],
    __WEBPACK_IMPORTED_MODULE_8__sort_alphabetically_pipe__["a" /* SortAlphabeticallyPipe */],
    __WEBPACK_IMPORTED_MODULE_9__keys_pipe__["a" /* KeysPipe */],
    __WEBPACK_IMPORTED_MODULE_10__last_path_element_pipe__["a" /* LastPathElementPipe */],
    __WEBPACK_IMPORTED_MODULE_11__type_of_pipe__["a" /* TypeOfPipe */]
];


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/keys-pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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

var KeysPipe = (function () {
    function KeysPipe() {
    }
    /**
     * Transforms object to array of its keys (Object.keys replacement for templates)
     */
    KeysPipe.prototype.transform = function (object) {
        if (!object) {
            return null;
        }
        return Object.keys(object);
    };
    return KeysPipe;
}());

KeysPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'keys',
                pure: false
            },] },
];
/** @nocollapse */
KeysPipe.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/last-path-element.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LastPathElementPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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


/**
 * Returs last part of json-pointer string
 * Example: for '/foo/bar/0/thing', returs 'thing'
 */
var LastPathElementPipe = (function () {
    function LastPathElementPipe(pathUtilService) {
        this.pathUtilService = pathUtilService;
    }
    LastPathElementPipe.prototype.transform = function (path) {
        var elements = path.split(this.pathUtilService.separator);
        return elements[elements.length - 1];
    };
    return LastPathElementPipe;
}());

LastPathElementPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'lastPathElement'
            },] },
];
/** @nocollapse */
LastPathElementPipe.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services__["m" /* PathUtilService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/sanitize-url.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SanitizeUrlPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
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


var SanitizeUrlPipe = (function () {
    function SanitizeUrlPipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /**
     * Transforms url to safe url that can be used for `<script src>` or `<iframe src>`
     *
     * @param {string} url
     * @return {SafeResourceUrl}
     */
    SanitizeUrlPipe.prototype.transform = function (url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return SanitizeUrlPipe;
}());

SanitizeUrlPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'sanitizeUrl',
            },] },
];
/** @nocollapse */
SanitizeUrlPipe.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DomSanitizer */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/self-or-empty.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelfOrEmptyPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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


var SelfOrEmptyPipe = (function () {
    function SelfOrEmptyPipe(emptyValueService) {
        this.emptyValueService = emptyValueService;
    }
    /**
     * Transforms a value to empty value if it is undefined,
     * returns self if it is already defined
     *
     * @return - empty value if given value is undefined or value itself.
     */
    SelfOrEmptyPipe.prototype.transform = function (value, schema) {
        return value ? value : this.emptyValueService.generateEmptyValue(schema);
    };
    return SelfOrEmptyPipe;
}());

SelfOrEmptyPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'selfOrEmpty',
            },] },
];
/** @nocollapse */
SelfOrEmptyPipe.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services__["d" /* EmptyValueService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/set-first-element-path.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetFirstElementPathPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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


var SetFirstElementPathPipe = (function () {
    function SetFirstElementPathPipe(appGlobalsService, pathUtilService) {
        this.appGlobalsService = appGlobalsService;
        this.pathUtilService = pathUtilService;
    }
    SetFirstElementPathPipe.prototype.transform = function (fields, tabName) {
        this.appGlobalsService.tabNameToFirstTopLevelElement[tabName] = "" + this.pathUtilService.separator + fields.first();
        return fields;
    };
    return SetFirstElementPathPipe;
}());

SetFirstElementPathPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'setFirstElementPath'
            },] },
];
/** @nocollapse */
SetFirstElementPathPipe.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__services__["m" /* PathUtilService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/sort-alphabetically.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SortAlphabeticallyPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var SortAlphabeticallyPipe = (function () {
    function SortAlphabeticallyPipe() {
    }
    SortAlphabeticallyPipe.prototype.transform = function (set) {
        return set.sort(function (a, b) {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });
    };
    return SortAlphabeticallyPipe;
}());

SortAlphabeticallyPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'sortAlphabetically',
            },] },
];
/** @nocollapse */
SortAlphabeticallyPipe.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/type-of.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TypeOfPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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

var TypeOfPipe = (function () {
    function TypeOfPipe() {
    }
    /**
     * `typeof` with extra 'array'
     */
    TypeOfPipe.prototype.transform = function (value) {
        if (Array.isArray(value)) {
            return 'array';
        }
        return typeof value;
    };
    return TypeOfPipe;
}());

TypeOfPipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'typeOf',
                pure: false
            },] },
];
/** @nocollapse */
TypeOfPipe.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/pipes/underscore-to-space.pipe.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnderscoreToSpacePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var UnderscoreToSpacePipe = (function () {
    function UnderscoreToSpacePipe() {
    }
    UnderscoreToSpacePipe.prototype.transform = function (text) {
        return text.replace(/\_/g, ' ');
    };
    return UnderscoreToSpacePipe;
}());

UnderscoreToSpacePipe.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Pipe */], args: [{
                name: 'underscoreToSpace',
            },] },
];
/** @nocollapse */
UnderscoreToSpacePipe.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/app-globals.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppGlobalsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__);
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


var AppGlobalsService = (function () {
    function AppGlobalsService() {
        this.adminMode$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.activeTabName = '';
        this.tabNameToFirstTopLevelElement = {};
        this.templates = {};
        this._adminMode = false;
    }
    Object.defineProperty(AppGlobalsService.prototype, "adminMode", {
        get: function () {
            return this._adminMode;
        },
        set: function (adminMode) {
            this._adminMode = adminMode;
            this.adminMode$.next(this._adminMode);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppGlobalsService.prototype, "firstElementPathForCurrentTab", {
        get: function () {
            return this.tabNameToFirstTopLevelElement[this.activeTabName];
        },
        enumerable: true,
        configurable: true
    });
    return AppGlobalsService;
}());

AppGlobalsService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
AppGlobalsService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/component-type.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentTypeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var ComponentTypeService = (function () {
    function ComponentTypeService() {
    }
    /**
     * It returns the editor specific type of given schema
     * In other words, which component to use for given schema.
     *
     * Possible values:
     *  - string, number, boolean, object, enum
     *  - primitive-list, table-list, complex-list
     *  - disabled, autocomplete
     *
     * @param {Object} schema
     * @return {string}
     */
    ComponentTypeService.prototype.getComponentType = function (schema) {
        if (!schema) {
            throw new Error('schema is undefined');
        }
        var schemaType = schema.type;
        if (!schemaType) {
            if (Object.keys(schema).length === 0) {
                return 'raw';
            }
        }
        else if (schemaType === 'string') {
            if (schema.autocompletionConfig) {
                return 'autocomplete';
            }
            else if (schema.enum) {
                return 'enum';
            }
        }
        else if (schemaType === 'object') {
            if (schema.properties['$ref']) {
                return 'ref';
            }
        }
        else if (schemaType === 'array') {
            var itemSchema_1 = schema.items;
            if (itemSchema_1.type === 'object' && !itemSchema_1.properties['$ref']) {
                // complex-array: if it's an object array
                // if its elements have at least a property with object (not ref-field)
                // or a non-primitive array.
                var isComplexArray = Object.keys(itemSchema_1.properties)
                    .some(function (prop) {
                    var propSchema = itemSchema_1.properties[prop];
                    return (propSchema.type === 'object' && !propSchema.properties['$ref']) ||
                        (propSchema.type === 'array' && (propSchema.items.type === 'object' || propSchema.items.type === 'array'));
                });
                if (isComplexArray) {
                    return 'complex-list';
                }
                else {
                    return 'table-list';
                }
            }
            else {
                // if schema.items.type is not object!
                return 'primitive-list';
            }
        }
        // execution reaches here if schemaType is either
        // 'number', 'integer', 'string' or something else which is currently not supported
        return schemaType;
    };
    return ComponentTypeService;
}());

ComponentTypeService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
ComponentTypeService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/dom-util.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DomUtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tabs_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/tabs-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_page_changer_service__ = __webpack_require__("../../../../../dist/src/shared/services/list-page-changer.service.js");
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



var DomUtilService = (function () {
    function DomUtilService(tabsUtilService, listPageChangerService) {
        this.tabsUtilService = tabsUtilService;
        this.listPageChangerService = listPageChangerService;
        this.editableSelector = '.value-container input, div[contenteditable=true], .switch-input, searchable-dropdown span.value';
        // highlight class is defined in json-editor.component.scss
        this.highlightClass = 'highlight';
    }
    DomUtilService.prototype.focusAndSelectFirstEditableChildById = function (id, highlight) {
        var _this = this;
        if (highlight === void 0) { highlight = false; }
        this.tabsUtilService.selectTabIfNeeded(id);
        this.listPageChangerService.changePage(id);
        setTimeout(function () {
            var el = document.getElementById(id);
            if (el) {
                var firstEditable_1 = el.querySelector(_this.editableSelector);
                if (firstEditable_1) {
                    if (firstEditable_1.classList.contains('hidden')) {
                        // has latex preview, click to disable to preview
                        firstEditable_1.nextElementSibling.click();
                        setTimeout(function () {
                            _this.focusAndSelectContent(firstEditable_1, highlight);
                        });
                    }
                    else {
                        _this.focusAndSelectContent(firstEditable_1, highlight);
                    }
                }
                else {
                    // if element doesn't have any input, open add-field-dropdown if it exists.
                    _this.openDropdown(el);
                }
            }
        });
    };
    DomUtilService.prototype.focusAndSelectContent = function (el, highlight) {
        el.focus();
        this.selectAllContent(el);
        if (highlight) {
            el.classList.add(this.highlightClass);
            this.highlightedElement = el;
        }
    };
    DomUtilService.prototype.focusFirstInputChildByElement = function (el) {
        var firstInput = el.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    };
    DomUtilService.prototype.focusRightOrLeftParentCell = function (id, direction) {
        var el = document.getElementById(id);
        if (el && el.tabIndex) {
            var elementParentCell = el.parentElement;
            while (elementParentCell.nodeName !== 'TD') {
                elementParentCell = elementParentCell.parentElement;
            }
            var nextSibling = direction > 0 ? elementParentCell.nextElementSibling : elementParentCell.previousElementSibling;
            while (nextSibling && nextSibling.nodeName === 'TD') {
                var inputElement = nextSibling.querySelector("input[tabindex='1'], div[contenteditable=true][tabindex='1']");
                if (inputElement) {
                    inputElement.focus();
                    this.selectAllContent(inputElement);
                    break;
                }
                nextSibling = direction > 0 ? nextSibling.nextElementSibling : nextSibling.previousElementSibling;
            }
        }
    };
    DomUtilService.prototype.blurFirstEditableChildById = function (id) {
        var el = document.getElementById(id);
        var firstEditable = el.querySelector(this.editableSelector);
        if (firstEditable) {
            firstEditable.blur();
        }
    };
    DomUtilService.prototype.clearHighlight = function () {
        if (this.highlightedElement) {
            this.highlightedElement.classList.remove(this.highlightClass);
            this.highlightedElement = undefined;
        }
    };
    DomUtilService.prototype.focusPatchElementById = function (id) {
        this.tabsUtilService.selectTabIfNeeded(id);
        this.listPageChangerService.changePage(id);
        setTimeout(function () {
            var el = document.getElementById(id);
            var mergeButton = el.querySelector('.btn-merge');
            if (mergeButton) {
                mergeButton.focus();
                mergeButton.click();
            }
            else {
                var patchActionsContainer = el.querySelector('.patch-actions-container');
                if (patchActionsContainer) {
                    patchActionsContainer.focus();
                }
            }
        });
    };
    DomUtilService.prototype.selectAllContent = function (el) {
        if (el instanceof HTMLInputElement) {
            el.select();
        }
        else {
            // select all content for contenteditable element.
            var range = document.createRange();
            range.selectNodeContents(el);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };
    DomUtilService.prototype.openDropdown = function (el) {
        var dropdown = el.querySelector('div.btn-group');
        if (dropdown) {
            var dropDownButton = dropdown.querySelector('button');
            if (dropDownButton) {
                dropDownButton.click();
            }
        }
    };
    return DomUtilService;
}());

DomUtilService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
DomUtilService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__tabs_util_service__["a" /* TabsUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__list_page_changer_service__["a" /* ListPageChangerService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/empty-value.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmptyValueService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("../../../../immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
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


var EmptyValueService = (function () {
    function EmptyValueService() {
    }
    EmptyValueService.prototype.generateEmptyValue = function (schema) {
        var emptyValue = this.generateEmptyValueRecursively(schema);
        if (typeof emptyValue === 'object') {
            return Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["fromJS"])(emptyValue);
        }
        else {
            return emptyValue;
        }
    };
    EmptyValueService.prototype.generateEmptyValueRecursively = function (schema) {
        var _this = this;
        if (schema.default) {
            return schema.default;
        }
        if (schema.type === 'object') {
            var emptyObject_1 = {};
            Object.keys(schema.properties)
                .filter(function (prop) {
                var required = schema.required || [];
                var alwaysShow = schema.alwaysShow || [];
                return required.indexOf(prop) > -1 || alwaysShow.indexOf(prop) > -1;
            }).forEach(function (prop) {
                var propSchema = schema.properties[prop];
                emptyObject_1[prop] = _this.generateEmptyValueRecursively(propSchema);
            });
            return emptyObject_1;
        }
        if (schema.type === 'array') {
            var emptyArray = [];
            var arrayElementSchema = schema.items;
            if (schema.componentType !== 'complex-list') {
                emptyArray.push(this.generateEmptyValueRecursively(arrayElementSchema));
            }
            return emptyArray;
        }
        return EmptyValueService.defaultValueLookup[schema.type];
    };
    return EmptyValueService;
}());

EmptyValueService.defaultValueLookup = {
    'string': '',
    'boolean': false
};
EmptyValueService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
EmptyValueService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/find-replace-all.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindReplaceAllService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("../../../../immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);


var FindReplaceAllService = (function () {
    function FindReplaceAllService() {
    }
    // TODO: fix compiler errors when type of immutable `List<any> | Map<string, any>`
    /**
     * Does deep replace when it finds the occurance in an immutable List and Map
     * uses schema to skip disabled properties
     *
     * @param {List<any> | Map<string, any} immutable
     * @param {Object} schema
     * @param {string} find
     * @param {replace} replace
     * @param {boolean} matchWhole - looks for whole match to a string property of immutable
     * @param {Array<any> | Object} diffHtml - TODO: describe
     */
    FindReplaceAllService.prototype.findReplaceInImmutable = function (immutable, schema, find, replace, exact, diffHtml) {
        var _this = this;
        if (exact === void 0) { exact = false; }
        var immutableAsMutable = immutable.asMutable();
        var isList = __WEBPACK_IMPORTED_MODULE_1_immutable__["List"].isList(immutable);
        // create empty array or object for the immutable to store diff
        diffHtml = isList ? [] : {};
        immutableAsMutable.forEach(function (value, key) {
            var innerSchema = isList ? schema.items : schema.properties[key];
            // ignore disabled and ref fields
            if (innerSchema.disabled || innerSchema.hidden || key === '$ref') {
                return;
                // TODO: is `schema.type === 'string'` better?
            }
            else if (typeof value === 'string') {
                // assign value to diff as initial, if nothing has changed it will remain same
                var diff = value;
                // create html diff for each possible change
                var singleDiffHtml = "<strong style='color: green;'>" + replace + "</strong><del><em style='color: red;'>" + find + "</em></del>";
                if (!exact) {
                    var regExp = new RegExp(find, 'g');
                    var replaced = value.replace(regExp, replace);
                    immutableAsMutable.set(key, replaced);
                    // create diff for multiple changes in value
                    diff = diff.replace(regExp, singleDiffHtml);
                }
                else if (value === find) {
                    immutableAsMutable.set(key, replace);
                    diff = singleDiffHtml;
                }
                diffHtml[key] = diff;
                // TODO: is `schema.type === 'object' || schema.type === 'array'` better?
            }
            else if (__WEBPACK_IMPORTED_MODULE_1_immutable__["List"].isList(value) || __WEBPACK_IMPORTED_MODULE_1_immutable__["Map"].isMap(value)) {
                // create empty array or object for the value in diffHtml
                var result = _this.
                    findReplaceInImmutable(immutableAsMutable.get(key), innerSchema, find, replace, exact, diffHtml[key]);
                diffHtml[key] = result.diffHtml;
                immutableAsMutable.set(key, result.replaced);
            }
        });
        return { replaced: immutableAsMutable.asImmutable(), diffHtml: diffHtml };
    };
    return FindReplaceAllService;
}());

FindReplaceAllService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
FindReplaceAllService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return SHARED_SERVICES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_globals_service__ = __webpack_require__("../../../../../dist/src/shared/services/app-globals.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__remote_autocompletion_service__ = __webpack_require__("../../../../../dist/src/shared/services/remote-autocompletion.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_type_service__ = __webpack_require__("../../../../../dist/src/shared/services/component-type.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dom_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/dom-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__empty_value_service__ = __webpack_require__("../../../../../dist/src/shared/services/empty-value.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__find_replace_all_service__ = __webpack_require__("../../../../../dist/src/shared/services/find-replace-all.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__json_store_service__ = __webpack_require__("../../../../../dist/src/shared/services/json-store.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__json_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/json-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__json_schema_service__ = __webpack_require__("../../../../../dist/src/shared/services/json-schema.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__keys_store_service__ = __webpack_require__("../../../../../dist/src/shared/services/keys-store.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modal_service__ = __webpack_require__("../../../../../dist/src/shared/services/modal.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__record_fixer_service__ = __webpack_require__("../../../../../dist/src/shared/services/record-fixer.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__schema_fixer_service__ = __webpack_require__("../../../../../dist/src/shared/services/schema-fixer.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__schema_validation_service__ = __webpack_require__("../../../../../dist/src/shared/services/schema-validation.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shortcut_action_service__ = __webpack_require__("../../../../../dist/src/shared/services/shortcut-action.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__window_href_service__ = __webpack_require__("../../../../../dist/src/shared/services/window-href.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__tabs_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/tabs-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__problems_service__ = __webpack_require__("../../../../../dist/src/shared/services/problems.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__katex_service__ = __webpack_require__("../../../../../dist/src/shared/services/katex.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__text_diff_service__ = __webpack_require__("../../../../../dist/src/shared/services/text-diff.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__list_page_changer_service__ = __webpack_require__("../../../../../dist/src/shared/services/list-page-changer.service.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_globals_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_1__remote_autocompletion_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__component_type_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__dom_util_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__empty_value_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__find_replace_all_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__json_store_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__json_util_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_8__json_schema_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_9__keys_store_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_10__path_util_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_11__modal_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_12__record_fixer_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_13__schema_fixer_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_14__schema_validation_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_15__shortcut_action_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_16__window_href_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_17__tabs_util_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_18__problems_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_19__katex_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_20__text_diff_service__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_21__list_page_changer_service__["a"]; });























var SHARED_SERVICES = [
    __WEBPACK_IMPORTED_MODULE_0__app_globals_service__["a" /* AppGlobalsService */],
    __WEBPACK_IMPORTED_MODULE_1__remote_autocompletion_service__["a" /* RemoteAutocompletionService */],
    __WEBPACK_IMPORTED_MODULE_2__component_type_service__["a" /* ComponentTypeService */],
    __WEBPACK_IMPORTED_MODULE_3__dom_util_service__["a" /* DomUtilService */],
    __WEBPACK_IMPORTED_MODULE_4__empty_value_service__["a" /* EmptyValueService */],
    __WEBPACK_IMPORTED_MODULE_5__find_replace_all_service__["a" /* FindReplaceAllService */],
    __WEBPACK_IMPORTED_MODULE_6__json_store_service__["a" /* JsonStoreService */],
    __WEBPACK_IMPORTED_MODULE_7__json_util_service__["a" /* JsonUtilService */],
    __WEBPACK_IMPORTED_MODULE_9__keys_store_service__["a" /* KeysStoreService */],
    __WEBPACK_IMPORTED_MODULE_8__json_schema_service__["a" /* JsonSchemaService */],
    __WEBPACK_IMPORTED_MODULE_10__path_util_service__["a" /* PathUtilService */],
    __WEBPACK_IMPORTED_MODULE_11__modal_service__["a" /* ModalService */],
    __WEBPACK_IMPORTED_MODULE_12__record_fixer_service__["a" /* RecordFixerService */],
    __WEBPACK_IMPORTED_MODULE_13__schema_fixer_service__["a" /* SchemaFixerService */],
    __WEBPACK_IMPORTED_MODULE_14__schema_validation_service__["a" /* SchemaValidationService */],
    __WEBPACK_IMPORTED_MODULE_15__shortcut_action_service__["a" /* ShortcutActionService */],
    __WEBPACK_IMPORTED_MODULE_16__window_href_service__["a" /* WindowHrefService */],
    __WEBPACK_IMPORTED_MODULE_17__tabs_util_service__["a" /* TabsUtilService */],
    __WEBPACK_IMPORTED_MODULE_18__problems_service__["a" /* ProblemsService */],
    __WEBPACK_IMPORTED_MODULE_19__katex_service__["a" /* KatexService */],
    __WEBPACK_IMPORTED_MODULE_20__text_diff_service__["a" /* TextDiffService */],
    __WEBPACK_IMPORTED_MODULE_21__list_page_changer_service__["a" /* ListPageChangerService */]
];


/***/ }),

/***/ "../../../../../dist/src/shared/services/json-schema.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JsonSchemaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
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


var JsonSchemaService = (function () {
    function JsonSchemaService(pathUtilService) {
        this.pathUtilService = pathUtilService;
    }
    JsonSchemaService.prototype.setSchema = function (schema) {
        this.schema = schema;
    };
    /**
     * Returns the schema extracted from this path
     */
    JsonSchemaService.prototype.forPathArray = function (path) {
        return path
            .reduce(function (schema, pathEl) {
            if (isNaN(pathEl) && pathEl !== '-') {
                return schema.properties[pathEl];
            }
            else {
                return schema.items;
            }
        }, this.schema);
    };
    /**
     * Returns the schema extracted from the json-pointer string
     */
    JsonSchemaService.prototype.forPathString = function (path) {
        var pathArray = this.pathUtilService.toPathArray(path);
        return this.forPathArray(pathArray);
    };
    return JsonSchemaService;
}());

JsonSchemaService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
JsonSchemaService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__path_util_service__["a" /* PathUtilService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/json-store.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JsonStoreService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("../../../../immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__keys_store_service__ = __webpack_require__("../../../../../dist/src/shared/services/keys-store.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes__ = __webpack_require__("../../../../../dist/src/shared/classes/index.js");
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







var JsonStoreService = (function () {
    function JsonStoreService(pathUtilService, keysStoreService) {
        this.pathUtilService = pathUtilService;
        this.keysStoreService = keysStoreService;
        this.patchesByPath$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.json$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.jsonPatches$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.patchesByPath = {};
        // list of reverse patches for important changes
        this.history = new __WEBPACK_IMPORTED_MODULE_6__classes__["a" /* SizedStack */](5);
    }
    JsonStoreService.prototype.setIn = function (path, value, allowUndo) {
        if (allowUndo === void 0) { allowUndo = true; }
        if (value === '' || value === undefined) {
            this.removeIn(path);
            return;
        }
        value = this.toImmutable(value);
        // immutablejs setIn creates Map for keys that don't exist in path
        // therefore List() should be set manually for some of those keys.
        this.setEmptyListBeforeEachIndexInPath(path);
        if (allowUndo && path.length <= 1) {
            this.pushRevertPatchToHistory(path, 'replace');
        }
        // set new value
        this.json = this.json.setIn(path, value);
        this.keysStoreService.syncKeysForPath(path, this.json);
        this.json$.next(this.json);
    };
    JsonStoreService.prototype.setEmptyListBeforeEachIndexInPath = function (path) {
        for (var i = 0; i < path.length - 1; i++) {
            var currentPath = path.slice(0, i + 1);
            if (!this.json.hasIn(currentPath) && typeof path[i + 1] === 'number') {
                this.json = this.json.setIn(currentPath, Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])());
            }
        }
    };
    JsonStoreService.prototype.getIn = function (path) {
        return this.json.getIn(path);
    };
    JsonStoreService.prototype.removeIn = function (path) {
        this.pushRevertPatchToHistory(path, 'add');
        this.json = this.json.removeIn(path);
        this.json$.next(this.json);
        this.keysStoreService.deletePath(path);
    };
    JsonStoreService.prototype.pushRevertPatchToHistory = function (path, revertOp) {
        this.history.push({
            path: this.pathUtilService.toPathString(path),
            op: revertOp,
            value: this.json.getIn(path)
        });
    };
    JsonStoreService.prototype.addIn = function (path, value) {
        var lastPathElement = path[path.length - 1];
        var isInsert = typeof lastPathElement === 'number' || lastPathElement === '-';
        if (isInsert) {
            var pathWithoutIndex = path.slice(0, path.length - 1);
            var list = this.getIn(pathWithoutIndex) || Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])();
            value = this.toImmutable(value);
            if (lastPathElement === '-') {
                list = list.push(value);
                path[path.length - 1] = list.size - 1;
            }
            else {
                list = list.insert(lastPathElement, value);
            }
            // allowUndo=false to avoid creating replace history patch when adding an item to a list.
            this.setIn(pathWithoutIndex, list, false);
        }
        else {
            this.setIn(path, value);
        }
    };
    JsonStoreService.prototype.toImmutable = function (value) {
        if (typeof value === 'object' && !(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"].isList(value) || __WEBPACK_IMPORTED_MODULE_1_immutable__["Map"].isMap(value))) {
            return Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["fromJS"])(value);
        }
        return value;
    };
    /**
     * Moves the element at given index UP or DOWN within the list
     * @param listPath path to a list in json
     * @param index index of the element that is being moved
     * @param direction 1 for DOWN, -1 for UP movement
     * @return new path of the moved element
     */
    JsonStoreService.prototype.moveIn = function (listPath, index, direction) {
        var list = this.getIn(listPath);
        var newIndex = index + direction;
        if (newIndex >= list.size || newIndex < 0) {
            newIndex = list.size - Math.abs(newIndex);
        }
        var temp = list.get(index);
        list = list
            .set(index, list.get(newIndex))
            .set(newIndex, temp);
        this.setIn(listPath, list);
        this.keysStoreService.swapListElementKeys(listPath, index, newIndex);
        return listPath.concat(newIndex);
    };
    JsonStoreService.prototype.setJson = function (json) {
        this.json = json;
    };
    JsonStoreService.prototype.setJsonPatches = function (patches) {
        var _this = this;
        this.patchesByPath = {};
        patches.forEach(function (patch) {
            var path = _this.getComponentPathForPatch(patch);
            if (!_this.patchesByPath[path]) {
                _this.patchesByPath[path] = [];
            }
            _this.patchesByPath[path].push(patch);
        });
        this.jsonPatches = patches;
        this.patchesByPath$.next(this.patchesByPath);
    };
    JsonStoreService.prototype.rollbackLastChange = function () {
        var lastChangeReversePatch = this.history.pop();
        if (lastChangeReversePatch) {
            this.applyPatch(lastChangeReversePatch, false);
            return lastChangeReversePatch.path;
        }
        else {
            return undefined;
        }
    };
    JsonStoreService.prototype.applyPatch = function (patch, allowUndo) {
        if (allowUndo === void 0) { allowUndo = true; }
        var path = this.pathUtilService.toPathArray(patch.path);
        switch (patch.op) {
            case 'replace':
                this.setIn(path, patch.value, allowUndo);
                break;
            case 'remove':
                this.removeIn(path);
                break;
            case 'add':
            // custom type for adding a replace patch as new.
            case 'add-as-new':
                this.addIn(path, patch.value);
                break;
            default:
                console.warn(patch.op + " is not supported!");
        }
        this.removeJsonPatch(patch);
    };
    JsonStoreService.prototype.rejectPatch = function (patch) {
        this.removeJsonPatch(patch);
    };
    JsonStoreService.prototype.hasPatch = function (path) {
        return this.patchesByPath[path] && this.patchesByPath[path].length > 0;
    };
    JsonStoreService.prototype.removeJsonPatch = function (patch) {
        var path = this.getComponentPathForPatch(patch);
        // don't do anything if it's UNDO json-patch.
        if (this.patchesByPath[path]) {
            var patchIndex = this.patchesByPath[path].indexOf(patch);
            if (patchIndex > -1) {
                this.patchesByPath[path].splice(patchIndex, 1);
                this.patchesByPath$.next(this.patchesByPath);
                var globalPatchIndex = this.jsonPatches.indexOf(patch);
                this.jsonPatches.splice(globalPatchIndex, 1);
                this.jsonPatches$.next(this.jsonPatches);
            }
        }
    };
    JsonStoreService.prototype.getComponentPathForPatch = function (patch) {
        if (patch.op === 'add') {
            return this.convertElementPathToParentArrayPath(patch.path);
        }
        return patch.path;
    };
    JsonStoreService.prototype.convertElementPathToParentArrayPath = function (path) {
        var pathArray = this.pathUtilService.toPathArray(path);
        var lastPathElement = pathArray[pathArray.length - 1];
        if (lastPathElement === '-' || !isNaN(Number(lastPathElement))) {
            pathArray.pop();
            return this.pathUtilService.toPathString(pathArray);
        }
        else {
            return path;
        }
    };
    return JsonStoreService;
}());

JsonStoreService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
JsonStoreService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_4__path_util_service__["a" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_5__keys_store_service__["a" /* KeysStoreService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/json-util.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JsonUtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
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


var JsonUtilService = (function () {
    function JsonUtilService(pathUtilService) {
        this.pathUtilService = pathUtilService;
    }
    /**
     * Returns value of the property located in dot separated path of json.
     */
    JsonUtilService.prototype.getValueInPath = function (json, path) {
        var pathElements = this.pathUtilService.toPathArray(path);
        var value = json;
        pathElements.forEach(function (pathElement) {
            value = value[pathElement];
            if (!value) {
                throw new Error("\"" + pathElement + "\" of given path not defined in given json");
            }
        });
        return value;
    };
    return JsonUtilService;
}());

JsonUtilService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
JsonUtilService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__path_util_service__["a" /* PathUtilService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/katex.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KatexService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_katex__ = __webpack_require__("../../../../katex/katex.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_katex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_katex__);


var KatexService = (function () {
    function KatexService() {
        this.delimiters = [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            // FIXME check if we need the ones below
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false },
        ];
    }
    /**
    *
    * Receives text that can contain LaTeX formulas. The formulas will be
    * identified using `this.delimiters` and rendered inside the passed
    * HTMLElement
    *
    * NOTE: The HTMLElement is expected to have a single child and this
    * will be replaced by the HTML with formatted LaTeX
    *
    * @param {string} text - text to be formatted with LaTeX
    * @param {HTMLElement} el - the HTMLElement where the LaTeX should be rendered
    */
    KatexService.prototype.renderMathInText = function (text, el) {
        var data = this.splitWithDelimiters(text, this.delimiters);
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < data.length; i++) {
            if (data[i].type === 'text') {
                fragment.appendChild(document.createTextNode(data[i].data));
            }
            else {
                var span = document.createElement('span');
                var math = data[i].data;
                try {
                    Object(__WEBPACK_IMPORTED_MODULE_1_katex__["render"])(math, span, {
                        displayMode: data[i].display,
                    });
                }
                catch (e) {
                    if (!(e instanceof __WEBPACK_IMPORTED_MODULE_1_katex__["ParseError"])) {
                        throw e;
                    }
                    console.error("KaTeX auto-render: Failed to parse " + data[i].data + " with " + e);
                    fragment.appendChild(document.createTextNode(data[i].rawData));
                    continue;
                }
                fragment.appendChild(span);
            }
        }
        // clear
        el.innerHTML = '';
        el.appendChild(fragment);
    };
    KatexService.prototype.findEndOfMath = function (delimiter, text, startIndex) {
        // Adapted from
        // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
        var index = startIndex;
        var braceLevel = 0;
        var delimLength = delimiter.length;
        while (index < text.length) {
            var character = text[index];
            if (braceLevel <= 0 &&
                text.slice(index, index + delimLength) === delimiter) {
                return index;
            }
            else if (character === '\\') {
                index++;
            }
            else if (character === '{') {
                braceLevel++;
            }
            else if (character === '}') {
                braceLevel--;
            }
            index++;
        }
        return -1;
    };
    KatexService.prototype.splitAtDelimiters = function (startData, leftDelim, rightDelim, display) {
        var finalData = [];
        for (var i = 0; i < startData.length; i++) {
            if (startData[i].type === 'text') {
                var text = startData[i].data;
                var lookingForLeft = true;
                var currIndex = 0;
                var nextIndex = void 0;
                nextIndex = text.indexOf(leftDelim);
                if (nextIndex !== -1) {
                    currIndex = nextIndex;
                    finalData.push({
                        type: 'text',
                        data: text.slice(0, currIndex),
                    });
                    lookingForLeft = false;
                }
                while (true) {
                    if (lookingForLeft) {
                        nextIndex = text.indexOf(leftDelim, currIndex);
                        if (nextIndex === -1) {
                            break;
                        }
                        finalData.push({
                            type: 'text',
                            data: text.slice(currIndex, nextIndex),
                        });
                        currIndex = nextIndex;
                    }
                    else {
                        nextIndex = this.findEndOfMath(rightDelim, text, currIndex + leftDelim.length);
                        if (nextIndex === -1) {
                            break;
                        }
                        finalData.push({
                            type: 'math',
                            data: text.slice(currIndex + leftDelim.length, nextIndex),
                            rawData: text.slice(currIndex, nextIndex + rightDelim.length),
                            display: display,
                        });
                        currIndex = nextIndex + rightDelim.length;
                    }
                    lookingForLeft = !lookingForLeft;
                }
                finalData.push({
                    type: 'text',
                    data: text.slice(currIndex),
                });
            }
            else {
                finalData.push(startData[i]);
            }
        }
        return finalData;
    };
    KatexService.prototype.splitWithDelimiters = function (text, delimiters) {
        var data = [{ type: 'text', data: text }];
        for (var i = 0; i < delimiters.length; i++) {
            var delimiter = delimiters[i];
            data = this.splitAtDelimiters(data, delimiter.left, delimiter.right, delimiter.display || false);
        }
        return data;
    };
    return KatexService;
}());

KatexService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
KatexService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/keys-store.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysStoreService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("../../../../immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__json_schema_service__ = __webpack_require__("../../../../../dist/src/shared/services/json-schema.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_globals_service__ = __webpack_require__("../../../../../dist/src/shared/services/app-globals.service.js");
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







var KeysStoreService = (function () {
    function KeysStoreService(appGlobalsService, pathUtilService, jsonSchemaService) {
        this.appGlobalsService = appGlobalsService;
        this.pathUtilService = pathUtilService;
        this.jsonSchemaService = jsonSchemaService;
        this.onKeysChange = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
    }
    KeysStoreService.prototype.forPath = function (path) {
        return this.keys$Map[path];
    };
    /**
     * Adds a key to the specified path.
     *
     * @param path path to add the key to
     * @param key key to be added
     * @param schema schema that belongs to path (schema.items for table-list)
     */
    KeysStoreService.prototype.addKey = function (path, key, schema, value) {
        var _this = this;
        // FIXME: could do O(logn) insert instead of O(nlogn) since the set is already sorted.
        this.keysMap[path] = this.keysMap[path]
            .add(key)
            .sort(function (a, b) { return _this.compareByPriority(a, b, schema); });
        this.keys$Map[path].next(this.keysMap[path]);
        this.onKeysChange.next({ path: path, keys: this.keysMap[path] });
        var newKeyPath = "" + path + this.pathUtilService.separator + key;
        var keySchema = schema.properties[key];
        if (keySchema.type === 'object' || keySchema.componentType === 'table-list') {
            this.buildKeysMapRecursivelyForPath(value || Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["Map"])(), newKeyPath, keySchema);
        }
        return newKeyPath;
    };
    KeysStoreService.prototype.deletePath = function (path) {
        var lastKey = path[path.length - 1];
        var parentPath = this.pathUtilService.toPathString(path.slice(0, -1));
        // don't invoke deleteKey if parentPath is primitive-list
        if (this.keysMap[parentPath]) {
            this.deleteKey(parentPath, lastKey);
        }
    };
    /**
     * Sync keys in store for the given path or its parent, grand parent etc. if necessary
     *
     * @param path path to the (re)set field
     * @param json whole json
     */
    KeysStoreService.prototype.syncKeysForPath = function (path, json) {
        // search from leaf to root, to find the first path with entry in keys map
        for (var i = path.length - 1; i >= 0; i--) {
            var currentPath = path.slice(0, i);
            var currentPathString = this.pathUtilService.toPathString(currentPath);
            if (this.keysMap[currentPathString]) {
                // path[i] is key that should be added to currentPat
                var key = path[i];
                // if currentPath has the key
                if (this.keysMap[currentPathString].has(key)) {
                    // just build the store keys map for that /current/path/key if it is object or array
                    var keyPath = currentPath.concat(key);
                    var keySchema = this.jsonSchemaService.forPathArray(keyPath);
                    if (keySchema.type === 'object' || keySchema.type === 'array') {
                        this.buildKeysMapRecursivelyForPath(json.getIn(keyPath), keyPath, keySchema);
                    }
                    // if currentPath doesn't have the key
                }
                else {
                    var currentSchema = this.jsonSchemaService.forPathArray(currentPath);
                    // if currentPath is to a table list
                    if (currentSchema.componentType === 'table-list') {
                        // have to rebuild keys map for it because key is here an index we don't know what to add
                        this.buildKeysMapRecursivelyForPath(json.getIn(currentPath), currentPath, currentSchema);
                        // if not to a table list.
                    }
                    else {
                        // just add the key which will build keys map for /current/path/key as well if needed
                        this.addKey(currentPathString, key, currentSchema, json.getIn(currentPath.concat(path[i])));
                    }
                }
                // break when a entry found for a path in keys map
                break;
            }
        }
    };
    KeysStoreService.prototype.deleteKey = function (parentPath, key) {
        var _this = this;
        // remove deleted one from parent
        this.keysMap[parentPath] = this.keysMap[parentPath].delete(key);
        this.keys$Map[parentPath].next(this.keysMap[parentPath]);
        this.onKeysChange.next({ path: parentPath, keys: this.keysMap[parentPath] });
        // delete keys for deleted one
        var deletedKeyPath = "" + parentPath + this.pathUtilService.separator + key;
        delete this.keysMap[deletedKeyPath];
        delete this.keys$Map[deletedKeyPath];
        // delete keys for all children of the deleted one
        var deletedKeyPathChildPrefix = deletedKeyPath + this.pathUtilService.separator;
        Object.keys(this.keysMap)
            .filter(function (path) { return path.startsWith(deletedKeyPathChildPrefix); })
            .forEach(function (childPath) {
            delete _this.keysMap[childPath];
            delete _this.keys$Map[childPath];
        });
    };
    /**
     * Swaps keys of given two indices in object list recursively
     */
    KeysStoreService.prototype.swapListElementKeys = function (listPath, index1, index2) {
        var _this = this;
        var listSchema = this.jsonSchemaService.forPathArray(listPath);
        if (listSchema.componentType !== 'complex-list') {
            return;
        }
        var listPathString = this.pathUtilService.toPathString(listPath);
        var ps1 = "" + listPathString + this.pathUtilService.separator + index1;
        var ps2 = "" + listPathString + this.pathUtilService.separator + index2;
        var keys1 = this.keysMap[ps1];
        this.setKeys(ps1, this.keysMap[ps2]);
        this.setKeys(ps2, keys1);
        // swap children as well
        var ps1ChildPrefix = ps1 + this.pathUtilService.separator;
        var ps2ChildPrefix = ps2 + this.pathUtilService.separator;
        var childrenSwaps = [];
        Object.keys(this.keysMap)
            .forEach(function (path) {
            if (path.startsWith(ps1ChildPrefix)) {
                var toPath = path.replace(ps1ChildPrefix, ps2ChildPrefix);
                childrenSwaps.push({ from: path, to: toPath, keys: _this.keysMap[path] });
            }
            else if (path.startsWith(ps2ChildPrefix)) {
                var toPath = path.replace(ps2ChildPrefix, ps1ChildPrefix);
                childrenSwaps.push({ from: path, to: toPath, keys: _this.keysMap[path] });
            }
        });
        childrenSwaps
            .forEach(function (swap) {
            _this.setKeys(swap.to, swap.keys);
            _this.onKeysChange.next({ path: swap.to, keys: _this.keysMap[swap.to] });
        });
        childrenSwaps
            .filter(function (swap) { return !childrenSwaps.some(function (otherSwap) { return swap.from === otherSwap.to; }); })
            .forEach(function (swap) {
            delete _this.keysMap[swap.from];
            delete _this.keys$Map[swap.from];
        });
    };
    KeysStoreService.prototype.buildKeysMap = function (json, schema) {
        this.keys$Map = {};
        this.keysMap = {};
        this.buildKeysMapRecursivelyForPath(json, '', schema);
    };
    KeysStoreService.prototype.buildKeysMapRecursivelyForPath = function (mapOrList, path, schema) {
        var _this = this;
        // TODO: remove this and unify typing when #330 is fixed
        var pathString = Array.isArray(path) ? this.pathUtilService.toPathString(path) : path;
        if (!schema) {
            schema = this.jsonSchemaService.forPathString(pathString);
        }
        if (schema.type === 'object') {
            var map_1 = mapOrList || Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["Map"])();
            var finalKeys = this.buildkeysForObject(pathString, map_1, schema);
            // recursive call
            finalKeys
                .filter(function (key) { return _this.isObjectOrArray(schema.properties[key]); })
                .forEach(function (key) {
                var nextPath = "" + pathString + _this.pathUtilService.separator + key;
                _this.buildKeysMapRecursivelyForPath(map_1.get(key), nextPath, schema.properties[key]);
            });
        }
        else if (schema.componentType === 'table-list') {
            var list = mapOrList || Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])();
            this.buildKeysForTableList(pathString, list, schema);
            // there is no recursive call for table list items because they aren't expected to have object or object list as property.
        }
        else if (schema.componentType === 'complex-list') {
            var list = mapOrList || Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])();
            list.forEach(function (element, index) {
                var elementPath = "" + pathString + _this.pathUtilService.separator + index;
                _this.buildKeysMapRecursivelyForPath(element, elementPath, schema.items);
            });
        }
    };
    // default value for `list`, if this is called for alwaysShow in which case `list` would be undefined
    KeysStoreService.prototype.buildKeysForTableList = function (path, list, schema) {
        if (list === void 0) { list = Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])(); }
        // get present unique keys in all items of table-list
        var keys = __WEBPACK_IMPORTED_MODULE_1_immutable__["Seq"].Set(list
            .map(function (object) { return object.keySeq().toArray(); })
            .reduce(function (pre, cur) { return pre.concat(cur); }, []));
        var itemSchema = schema.items;
        var finalKeys = this.schemafy(keys, itemSchema);
        this.setKeys(path, finalKeys);
    };
    // default value for `map`, if this is called for alwaysShow in which case `map` would be undefined
    KeysStoreService.prototype.buildkeysForObject = function (path, map, schema) {
        if (map === void 0) { map = Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["Map"])(); }
        var finalKeys = this.schemafy(map.keySeq(), schema);
        this.setKeys(path, finalKeys);
        return finalKeys;
    };
    /**
     * Filters keys, add alwaysShow fields and sorts by schema.
     */
    KeysStoreService.prototype.schemafy = function (keys, schema) {
        var _this = this;
        return keys
            .filter(function (key) { return _this.isNotHidden(key, schema) || _this.appGlobalsService.adminMode; })
            .concat(schema.required || [])
            .concat(schema.alwaysShow || [])
            .sort(function (a, b) { return _this.compareByPriority(a, b, schema); })
            .toOrderedSet();
    };
    KeysStoreService.prototype.compareByPriority = function (a, b, schema) {
        // Sort by priority, larger is the first.
        var pa = schema.properties[a].priority || 0;
        var pb = schema.properties[b].priority || 0;
        if (pa > pb) {
            return -1;
        }
        if (pa < pb) {
            return 1;
        }
        // Sort alphabetically.
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    };
    KeysStoreService.prototype.isNotHidden = function (key, schema) {
        if (!schema.properties[key]) {
            throw new Error("\"" + key + "\" is not specified as property in \n" + JSON.stringify(schema.properties, undefined, 2));
        }
        return !schema.properties[key].hidden;
    };
    KeysStoreService.prototype.isObjectOrArray = function (schema) {
        return schema.type === 'object' || schema.type === 'array';
    };
    KeysStoreService.prototype.setKeys = function (path, keys) {
        this.keysMap[path] = keys;
        if (!this.keys$Map[path]) {
            this.keys$Map[path] = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["ReplaySubject"](1);
        }
        this.keys$Map[path].next(keys);
    };
    return KeysStoreService;
}());

KeysStoreService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
KeysStoreService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_6__app_globals_service__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_4__path_util_service__["a" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_5__json_schema_service__["a" /* JsonSchemaService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/list-page-changer.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPageChangerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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



var ListPageChangerService = (function () {
    function ListPageChangerService(pathUtilService) {
        this.pathUtilService = pathUtilService;
        this.pageChange$Map = {};
        this.itemsPerPageMap = {};
    }
    /**
     * Changes the page of the list so that requested item is visible on UI
     * It doesn't do anything if given path's parent is not paginated list.
     *
     * @param itemPath path to a list item
     */
    ListPageChangerService.prototype.changePage = function (itemPath) {
        var itemPathArray = this.pathUtilService.toPathArray(itemPath);
        var itemIndex = itemPathArray[itemPathArray.length - 1];
        var listPath = this.pathUtilService.toPathString(itemPathArray.slice(0, -1));
        if (this.pageChange$Map[listPath]) {
            var itemsPerPage = this.itemsPerPageMap[listPath];
            var page = Math.floor((itemIndex / itemsPerPage) + 1);
            this.pageChange$Map[listPath].next(page);
        }
    };
    ListPageChangerService.prototype.registerPaginatedList = function (listPath, itemsPerPage) {
        this.itemsPerPageMap[listPath] = itemsPerPage;
        this.pageChange$Map[listPath] = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        return this.pageChange$Map[listPath];
    };
    return ListPageChangerService;
}());

ListPageChangerService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
ListPageChangerService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__path_util_service__["a" /* PathUtilService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/modal.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__);
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


var ModalService = (function () {
    function ModalService() {
        this.options$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.display$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
    }
    ModalService.prototype.displayModal = function (options) {
        this.options$.next(options);
        this.display$.next(true);
    };
    ModalService.prototype.closeCurrentModal = function () {
        this.display$.next(false);
    };
    return ModalService;
}());

ModalService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
ModalService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/path-util.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathUtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var PathUtilService = (function () {
    function PathUtilService() {
        this.separator = '/';
    }
    /**
     *
     * @param path - Element's path
     * @param root - Find nearest or root parent array. True for root and false for nearest array parent
     * @returns - Returns the path to the array parent
     */
    PathUtilService.prototype.getNearestOrRootArrayParentInPath = function (path, root) {
        var _path = [];
        var pathLength = path.length;
        for (var index = 0; index < pathLength; index++) {
            _path = root ? path.slice(0, index + 1) : path.slice(0, path.length - index);
            if (typeof _path[_path.length - 1] === 'number') {
                // transform ['arrayParent',0] => ['arrayParent']
                _path.pop();
                break;
            }
        }
        return _path;
    };
    PathUtilService.prototype.getElementIndexInForwardOrReversePath = function (path, directPathSearch) {
        return this.findIndexFromPath(path.slice(), directPathSearch);
    };
    /**
     *
     * @param path - The path of an element
     * @param directPathSearch - Flag for define direct or reverse searching in path. Set to true for searching in direct
     * or false for searching in reverse path
     * @returns - Returns found index in path or -1 if not found
     */
    PathUtilService.prototype.findIndexFromPath = function (path, directPathSearch) {
        path = directPathSearch ? path : path.reverse();
        for (var index in path) {
            if (!isNaN(path[index])) {
                return path[index];
            }
        }
        return -1;
    };
    /**
     * Converts path array `/` separated path string.
     * Example: from ['foo', 'bar', 0] to '/foo/bar/0'
     */
    PathUtilService.prototype.toPathString = function (path) {
        if (path.length === 0) {
            return '';
        }
        else {
            return "" + this.separator + path.join(this.separator);
        }
    };
    /**
     * Converts `/` separated path string to path array.
     * Example from '/foo/bar/0' to ['foo', 'bar', 0]
     */
    PathUtilService.prototype.toPathArray = function (pathString) {
        return pathString.split(this.separator)
            .slice(1) // remove the empty
            .map(function (key) { return isNaN(parseInt(key, 10)) ? key : parseInt(key, 10); });
    };
    return PathUtilService;
}());

PathUtilService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
PathUtilService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/problems.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProblemsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_combineLatest__ = __webpack_require__("../../../../rxjs/observable/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_combineLatest__);
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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



var ProblemsService = (function () {
    function ProblemsService() {
        this.externalCategorizedProblems$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.internalCategorizedProblems$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.externalProblemCount$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.internalProblemCount$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.errorCount$ = this.getTotalDistinctProblemCount$ForType('errors');
        this.warningCount$ = this.getTotalDistinctProblemCount$ForType('warnings');
        this.internalProblemMap$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.internalProblemMap = {};
        this.internalCategorizedProblemMap = { errors: {}, warnings: {} };
        this.externalCategorizedProblemMap = { errors: {}, warnings: {} };
        this.externalProblemCount = { errors: 0, warnings: 0 };
        this.internalProblemCount = { errors: 0, warnings: 0 };
        // set default counts to components
        this.externalProblemCount$.next(this.externalProblemCount);
        this.internalProblemCount$.next(this.internalProblemCount);
    }
    ProblemsService.prototype.getTotalDistinctProblemCount$ForType = function (type) {
        var external$ = this.externalProblemCount$
            .map(function (counts) { return counts[type]; });
        var internal$ = this.internalProblemCount$
            .map(function (counts) { return counts[type]; });
        return Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_combineLatest__["combineLatest"])(external$, internal$, function (external, internal) { return external + internal; })
            .distinctUntilChanged();
    };
    Object.defineProperty(ProblemsService.prototype, "externalProblems", {
        set: function (problems) {
            var _a = this.categorizeProblemMap(problems), categorizedProblemMap = _a.categorizedProblemMap, errorCount = _a.errorCount, warningCount = _a.warningCount;
            this.externalProblemCount = { errors: errorCount, warnings: warningCount };
            this.externalProblemCount$.next(this.externalProblemCount);
            this.externalCategorizedProblemMap = categorizedProblemMap;
            this.externalCategorizedProblems$.next(this.externalCategorizedProblemMap);
        },
        enumerable: true,
        configurable: true
    });
    ProblemsService.prototype.setInternalProblemsForPath = function (path, problems) {
        this.internalProblemMap[path] = problems;
        this.internalProblemMap$.next(this.internalProblemMap);
        var categorizedProblems = this.categorizeValidationProblems(problems);
        this.internalProblemCount.errors += categorizedProblems.errors.length - this.internalProblemCountForPath(path, 'errors');
        this.internalProblemCount.warnings += categorizedProblems.warnings.length - this.internalProblemCountForPath(path, 'warnings');
        this.internalProblemCount$.next(this.internalProblemCount);
        this.internalCategorizedProblemMap.errors[path] = categorizedProblems.errors;
        this.internalCategorizedProblemMap.warnings[path] = categorizedProblems.warnings;
        this.internalCategorizedProblems$.next(this.internalCategorizedProblemMap);
    };
    ProblemsService.prototype.internalProblemCountForPath = function (path, type) {
        if (this.internalCategorizedProblemMap[type][path]) {
            return this.internalCategorizedProblemMap[type][path].length;
        }
        return 0;
    };
    ProblemsService.prototype.hasProblem = function (path) {
        var internalProblems = this.internalCategorizedProblemMap.errors[path];
        var externalProblems = this.externalCategorizedProblemMap.errors[path];
        var internalProblemCount = internalProblems ? internalProblems.length : 0;
        var externalProblemCount = externalProblems ? externalProblems.length : 0;
        return (internalProblemCount + externalProblemCount) > 0;
    };
    ProblemsService.prototype.categorizeProblemMap = function (problemMap) {
        var _this = this;
        var categorizedProblemMap = { errors: {}, warnings: {} };
        var errorCount = 0;
        var warningCount = 0;
        Object.keys(problemMap)
            .map(function (path) {
            var validationProblems = problemMap[path];
            var categorized = _this.categorizeValidationProblems(validationProblems);
            return { path: path, categorized: categorized };
        }).forEach(function (problemsForPath) {
            categorizedProblemMap.errors[problemsForPath.path] = problemsForPath.categorized.errors;
            categorizedProblemMap.warnings[problemsForPath.path] = problemsForPath.categorized.warnings;
            errorCount += problemsForPath.categorized.errors.length;
            warningCount += problemsForPath.categorized.warnings.length;
        });
        return { categorizedProblemMap: categorizedProblemMap, errorCount: errorCount, warningCount: warningCount };
    };
    ProblemsService.prototype.categorizeValidationProblems = function (validationProblems) {
        var categorized = { errors: [], warnings: [] };
        validationProblems.forEach(function (error) {
            if (error.type === 'Error') {
                categorized.errors.push(error);
            }
            else {
                categorized.warnings.push(error);
            }
        });
        return categorized;
    };
    return ProblemsService;
}());

ProblemsService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
ProblemsService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/record-fixer.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordFixerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__empty_value_service__ = __webpack_require__("../../../../../dist/src/shared/services/empty-value.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component_type_service__ = __webpack_require__("../../../../../dist/src/shared/services/component-type.service.js");
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



var RecordFixerService = (function () {
    function RecordFixerService(emptyValueService, componentTypeService) {
        this.emptyValueService = emptyValueService;
        this.componentTypeService = componentTypeService;
    }
    /**
     * Fixes given record according to given schema, in other words
     * changes it to match the format expected the by te json-editor
     *
     * @param rawRecord - json record to be fixed
     * @param schema - extended schema of rawRecord
     * @return - fixed record
     */
    RecordFixerService.prototype.fixRecord = function (rawRecord, schema) {
        var _this = this;
        var record = Object.assign({}, rawRecord);
        Object.keys(record).forEach(function (field) {
            if (!schema.properties[field]) {
                // Delete if field is not in schema!
                _this.deleteField(record, field);
            }
            else {
                // Fix the field and all children.
                _this.fix(field, record, schema.properties[field]);
            }
        });
        return record;
    };
    /**
     * Visits all parts of record recursivly, along with the subschema of the part
     * and apply required fixes.
     *
     * NOTE: the reason that parent and key are passed instead of the direct value
     * is to be able do some operations that needs the parent such as `delete`.
     *
     * TODO: add special case for arrays because fixes are the same for
     * all elements.
     *
     * @param key - field name or element index
     * @param parent - parent of the field/element
     * @param schema - schema of visited field/element
     */
    RecordFixerService.prototype.fix = function (key, parent, schema) {
        var _this = this;
        if (schema.hidden) {
            return;
        }
        // Fixes for each type/condition, can be added below.
        var value = parent[key];
        // Recursive calls
        if (schema.type === 'object') {
            if (!schema.properties) {
                throw new Error("\"" + key + "\"'s schema has \"type\": \"object\" but doesn't specify \"properties\"");
            }
            else if (!(value instanceof Object)) {
                throw new Error("\"" + key + "\" in " + JSON.stringify(value, null, 2) + " is specified as \"object\" by schema but it is not an object in json");
            }
            // Looping over record to filter out fields that are not in schema.
            Object.keys(value).forEach(function (prop) {
                if (!schema.properties[prop]) {
                    // we don't like fields without schema!
                    _this.deleteField(value, prop);
                }
                else {
                    _this.fix(prop, value, schema.properties[prop]);
                }
            });
        }
        else if (schema.type === 'array') {
            if (!schema.items) {
                throw new Error("\"" + key + "\"'s schema has \"type\": \"array\" but doesn't specify \"items\"");
            }
            else if (!Array.isArray(value)) {
                throw new Error("\"" + key + "\" in " + JSON.stringify(value, null, 2) + " is specified as \"array\" by schema but it is not an array in json");
            }
            value.forEach(function (element, index) {
                _this.fix(index, value, schema.items);
            });
        }
    };
    /**
     * Deletes given field from the given object.
     * Used for deleting fields that aren't on the schema.
     *
     * TODO: replace this with only `delete` when logging is not necessary!
     */
    RecordFixerService.prototype.deleteField = function (object, field) {
        delete object[field];
        console.warn("\"" + field + "\" is removed from input json since it's not in the schema");
    };
    return RecordFixerService;
}());

RecordFixerService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
RecordFixerService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__empty_value_service__["a" /* EmptyValueService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__component_type_service__["a" /* ComponentTypeService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/remote-autocompletion.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoteAutocompletionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
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



var RemoteAutocompletionService = (function () {
    function RemoteAutocompletionService(http, pathUtilService) {
        this.http = http;
        this.pathUtilService = pathUtilService;
    }
    RemoteAutocompletionService.prototype.getAutocompletionResults = function (options, token) {
        var _this = this;
        return this.http.get("" + options.url + token)
            .map(function (res) { return _this.mapResponseToResults(res, options.path); });
    };
    RemoteAutocompletionService.prototype.mapResponseToResults = function (response, resultsPath) {
        var pathElements = this.pathUtilService.toPathArray(resultsPath);
        var results = response.json();
        pathElements.forEach(function (pathElement) {
            results = results[pathElement];
        });
        return results;
    };
    return RemoteAutocompletionService;
}());

RemoteAutocompletionService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
RemoteAutocompletionService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__path_util_service__["a" /* PathUtilService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/schema-fixer.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchemaFixerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__json_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/json-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__component_type_service__ = __webpack_require__("../../../../../dist/src/shared/services/component-type.service.js");
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




var SchemaFixerService = (function () {
    function SchemaFixerService(jsonUtilService, componentTypeService) {
        this.jsonUtilService = jsonUtilService;
        this.componentTypeService = componentTypeService;
    }
    /**
     * Fixes schema to be in a format that expected by json-editor
     *
     * @param schema - json schema
     * @param config - schema specific options
     * @return - fixed schema
     */
    SchemaFixerService.prototype.fixSchema = function (originalSchema, config) {
        var schema = __WEBPACK_IMPORTED_MODULE_1_lodash__["cloneDeep"](originalSchema);
        if (config) {
            schema = this.enrichSchemaWithConfig(schema, config);
        }
        schema = this.fixRecursively(schema);
        return schema;
    };
    /**
     * Enriches given schema with given configuration objects
     * puts config into correct places in schema.
     *
     * @param schema - json schema
     * @param config - schema specific options
     */
    SchemaFixerService.prototype.enrichSchemaWithConfig = function (schema, config) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["mergeWith"](schema, config, function (currentSchema, currentConfig, key) {
            if ((key === 'properties' || key === 'items') && !currentSchema) {
                console.warn("config => " + JSON.stringify(currentConfig, function (configKey, value) {
                    if (typeof value === 'function') {
                        return 'ƒ()';
                    }
                    return value;
                }, 2) + " should not be under \"" + key + "\" because schema does not have \"" + key + "\"");
                // cancel merge to avoid creating broken json schema
                return null;
            }
            if (currentSchema && key === 'properties') {
                var configKeys = Object.keys(currentConfig);
                configKeys
                    .filter(function (configKey) { return !currentSchema[configKey]; })
                    .forEach(function (wrongConfigKey) {
                    delete currentConfig[wrongConfigKey];
                    console.warn(wrongConfigKey);
                });
            }
        });
    };
    /**
     * Applies all fixes to schema recursively
     */
    SchemaFixerService.prototype.fixRecursively = function (schema) {
        var _this = this;
        if (schema.anyOf) {
            schema = this.fixAnyOf(schema);
        }
        else if (schema.allOf) {
            schema = this.fixAllOf(schema);
        }
        if (schema.order) {
            schema = this.fixOrder(schema);
        }
        if (schema.disabled) {
            schema = this.fixDisabled(schema);
        }
        if (schema.alwaysShow) {
            schema = this.fixAlwaysShow(schema);
        }
        if (schema.alwaysShowRegExp) {
            schema = this.fixAlwaysShowRegExp(schema);
        }
        // schema fixes must be done above
        // recursively call for deeper parts of schema
        if (schema.properties) {
            Object.keys(schema.properties)
                .forEach(function (prop) {
                schema.properties[prop] = _this.fixRecursively(schema.properties[prop]);
            });
        }
        else if (schema.items) {
            schema.items = this.fixRecursively(schema.items);
        }
        // fixes that needs above fixes to be done deeply for the current schema
        schema.componentType = this.componentTypeService.getComponentType(schema);
        return schema;
    };
    /**
     * Fixes disabled config to assign the disabled attribute
     * to array items or object properties
     */
    SchemaFixerService.prototype.fixDisabled = function (schema) {
        if (schema.items) {
            schema.items.disabled = true;
        }
        else if (schema.properties) {
            Object.keys(schema.properties)
                .forEach(function (prop) {
                schema.properties[prop].disabled = true;
            });
        }
        return schema;
    };
    /**
     * Fixes order config to assign the right priority to properties
     */
    SchemaFixerService.prototype.fixOrder = function (schema) {
        var order = schema.order;
        order.forEach(function (orderKey, index) {
            var priority = order.length - index;
            if (orderKey in schema.properties) {
                schema.properties[orderKey].priority = priority;
            }
            else {
                console.warn(orderKey + " defined in order config does not exist in schema.");
            }
        });
        return schema;
    };
    /**
     * Fixes anyOf schemas with exactly same property structure
     * it merges all enum fields in anyOf elements
     */
    SchemaFixerService.prototype.fixAnyOf = function (schema) {
        var anyOf = schema.anyOf;
        // find existence count of all enum properties in anyOf elements
        // the reason of this, a field could be enum type for some and not for some other anyOf element
        var enumPropCount = {};
        anyOf.forEach(function (anyOfElement) {
            Object.keys(anyOfElement.properties)
                .filter(function (prop) { return anyOfElement.properties[prop].enum; })
                .forEach(function (prop) {
                if (!enumPropCount[prop]) {
                    enumPropCount[prop] = 0;
                }
                enumPropCount[prop]++;
            });
        });
        // combine all enum arrays in anyOf elements
        var enums = {};
        Object.keys(enumPropCount)
            .forEach(function (prop) {
            anyOf.forEach(function (anyOfElement) {
                if (!enums[prop]) {
                    enums[prop] = [];
                }
                var enumValues = anyOfElement.properties[prop].enum;
                // check if current field is enum for current anyOf element
                if (enumValues) {
                    enums[prop] = enums[prop].concat(enumValues);
                }
            });
        });
        var fixedSchema = anyOf[0];
        // shallow cleaning of format and pattern
        Object.keys(fixedSchema.properties)
            .forEach(function (prop) {
            delete fixedSchema.properties[prop].format;
            delete fixedSchema.properties[prop].pattern;
        });
        Object.keys(enumPropCount)
            .forEach(function (prop) {
            var uniqueEnumValues = Array.from(new Set(enums[prop]));
            // if a field enum for all anyOf elements
            if (enumPropCount[prop] === anyOf.length) {
                // merge all enum values into one
                fixedSchema.properties[prop].enum = uniqueEnumValues;
                // if a field enum for some of anyOf elements
            }
            else {
                // create a autocomplete config so that it will allow any values
                // but autocomplete from enum values from where the field is defined as enum
                delete fixedSchema.properties[prop].enum;
                fixedSchema.properties[prop].autocompletionConfig = {
                    source: uniqueEnumValues,
                    size: 7
                };
            }
        });
        // copy disabled attribute inside fixedSchema because it
        // is outside anyOf element and is ignored
        if (schema.disabled) {
            fixedSchema.disabled = true;
        }
        return fixedSchema;
    };
    SchemaFixerService.prototype.fixAllOf = function (schema) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__["merge"].apply(__WEBPACK_IMPORTED_MODULE_1_lodash__, [{}].concat(schema.allOf));
    };
    /**
     * Adds keys that matches `alwaysShowRegExp` to `alwaysShow`.
     * Passes `alwaysShowRegExp` down to children so that it is applied recursively.
     */
    SchemaFixerService.prototype.fixAlwaysShowRegExp = function (schema) {
        if (!schema.alwaysShow) {
            schema.alwaysShow = [];
        }
        Object.keys(schema.properties)
            .forEach(function (key) {
            // pass alwaysShowRegExp down to apply it recursively.
            var subSchema = schema.properties[key];
            if (subSchema.type === 'object') {
                subSchema.alwaysShowRegExp = schema.alwaysShowRegExp;
            }
            if (key.search(schema.alwaysShowRegExp) > -1) {
                schema.alwaysShow.push(key);
            }
        });
        return schema;
    };
    /**
     * Removes alwayShow fields that aren't in the schema.properties
     * and warns on console.
     */
    SchemaFixerService.prototype.fixAlwaysShow = function (schema) {
        var alwaysShow = schema.alwaysShow;
        schema.alwaysShow = alwaysShow.filter(function (key) {
            if (schema.properties[key]) {
                return true;
            }
            else {
                console.warn(key + " is configured as alwaysShow but it is not in " + JSON.stringify(Object.keys(schema.properties)));
            }
        });
        return schema;
    };
    return SchemaFixerService;
}());

SchemaFixerService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
SchemaFixerService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__json_util_service__["a" /* JsonUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__component_type_service__["a" /* ComponentTypeService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/schema-validation.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchemaValidationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ajv__ = __webpack_require__("../../../../ajv/lib/ajv.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ajv___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ajv__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ajv_errors__ = __webpack_require__("../../../../ajv-errors/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ajv_errors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ajv_errors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_globals_service__ = __webpack_require__("../../../../../dist/src/shared/services/app-globals.service.js");
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




var SchemaValidationService = (function () {
    function SchemaValidationService(appGlobalsService) {
        var _this = this;
        this.appGlobalsService = appGlobalsService;
        // `jsonPointer: true` is required for `avj-errors` package
        this.ajv = new __WEBPACK_IMPORTED_MODULE_1_ajv__({ allErrors: true, jsonPointers: true });
        // https://gist.github.com/dperini/729294
        this.reWebUrl = new RegExp('^' +
            // protocol identifier
            '(?:(?:https?|ftp)://)' +
            // user:pass authentication
            '(?:\\S+(?::\\S*)?@)?' +
            '(?:' +
            // IP address exclusion
            // private & local networks
            '(?!(?:10)(?:\\.\\d{1,3}){3})' +
            '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
            '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
            '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
            '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
            '|' +
            'localhost' +
            '|' +
            // host name
            '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
            // domain name
            '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
            // TLD identifier
            '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
            // TLD may end with dot
            '\\.?' +
            ')' +
            // port number
            '(?::\\d{2,5})?' +
            // resource path
            '(?:[/?#]\\S*)?' +
            '$', 'i');
        __WEBPACK_IMPORTED_MODULE_2_ajv_errors__(this.ajv);
        //  ajv didn't support format:url, so was added using web url regex for validation
        this.ajv.addFormat('url', this.reWebUrl);
        if (this.appGlobalsService.config && this.appGlobalsService.config.customFormatValidation) {
            var customFormats_1 = this.appGlobalsService.config.customFormatValidation;
            Object.keys(customFormats_1).forEach(function (key) {
                _this.ajv.addFormat(key, customFormats_1[key].formatChecker);
            });
        }
    }
    /**
     * Validates a specific value against schema
     *
     * Uses: ajv package for json-schema validation
     *
     */
    SchemaValidationService.prototype.validateValue = function (value, schema) {
        var validationErrors = [];
        if (!this.ajv.validate(schema, value)) {
            this.ajv.errors.forEach(function (error) {
                validationErrors.push({
                    message: error.message,
                    type: 'Error'
                });
            });
        }
        return validationErrors;
    };
    return SchemaValidationService;
}());

SchemaValidationService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
SchemaValidationService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_3__app_globals_service__["a" /* AppGlobalsService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/shortcut-action.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShortcutActionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable__ = __webpack_require__("../../../../immutable/dist/immutable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__empty_value_service__ = __webpack_require__("../../../../../dist/src/shared/services/empty-value.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__json_store_service__ = __webpack_require__("../../../../../dist/src/shared/services/json-store.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__json_schema_service__ = __webpack_require__("../../../../../dist/src/shared/services/json-schema.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/dom-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__keys_store_service__ = __webpack_require__("../../../../../dist/src/shared/services/keys-store.service.js");
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








var ShortcutActionService = (function () {
    function ShortcutActionService(emptyValueService, domUtilService, jsonStoreService, jsonSchemaService, pathUtilService, keysStoreService) {
        this.emptyValueService = emptyValueService;
        this.domUtilService = domUtilService;
        this.jsonStoreService = jsonStoreService;
        this.jsonSchemaService = jsonSchemaService;
        this.pathUtilService = pathUtilService;
        this.keysStoreService = keysStoreService;
    }
    ShortcutActionService.prototype.addToRootAction = function (path) {
        this.add(path, true);
    };
    ShortcutActionService.prototype.addAction = function (path) {
        this.add(path, false);
    };
    ShortcutActionService.prototype.add = function (path, root) {
        var _path = this.pathUtilService.getNearestOrRootArrayParentInPath(path, root);
        this.addNewElementInArray(_path, this.jsonSchemaService.forPathArray(_path));
    };
    /**
     * @param path - Path of the array parent that the element is about to be inserted
     * @param schema - Schema of the element that is about to be inserted
     */
    ShortcutActionService.prototype.addNewElementInArray = function (path, schema) {
        var itemSchema = schema.items;
        var emptyValue = this.emptyValueService.generateEmptyValue(itemSchema);
        var values = this.jsonStoreService.getIn(path) || Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])();
        this.jsonStoreService.setIn(path, values.push(emptyValue));
        path.push(values.size);
        this.waitThenFocus(this.pathUtilService.toPathString(path));
    };
    ShortcutActionService.prototype.addBelowToRootAction = function (path) {
        var rootPath = this.pathUtilService.getNearestOrRootArrayParentInPath(path, true);
        var schema = this.jsonSchemaService.forPathArray(rootPath);
        var itemSchema = schema.items;
        var emptyValue = this.emptyValueService.generateEmptyValue(itemSchema);
        var values = this.jsonStoreService.getIn(rootPath) || Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])();
        this.jsonStoreService.setIn(rootPath, values.insert(path[1] + 1, emptyValue));
        rootPath.push(path[1] + 1);
        this.waitThenFocus(this.pathUtilService.toPathString(rootPath));
    };
    ShortcutActionService.prototype.moveUpAction = function (path) {
        this.move(path, -1);
    };
    ShortcutActionService.prototype.moveDownAction = function (path) {
        this.move(path, 1);
    };
    ShortcutActionService.prototype.moveUpRootAction = function (path) {
        this.move(path, -1, true);
    };
    ShortcutActionService.prototype.moveDownRootAction = function (path) {
        this.move(path, 1, true);
    };
    /**
     * @param path - Path of the element that is moved
     * @param direction - Movement direction. -1 for UP, +1 for DOWN
     */
    ShortcutActionService.prototype.move = function (path, direction, root) {
        if (root === void 0) { root = false; }
        this.domUtilService.blurFirstEditableChildById(this.pathUtilService.toPathString(path));
        var index = this.pathUtilService.getElementIndexInForwardOrReversePath(path, root);
        path = this.jsonStoreService.moveIn(this.pathUtilService.getNearestOrRootArrayParentInPath(path, root), index, direction);
        var pathString = this.pathUtilService.toPathString(path);
        this.waitThenFocus(pathString);
    };
    ShortcutActionService.prototype.deleteAction = function (path) {
        // blur element before delete for ensuring that `commitValueChange` will not show again the deleted value
        this.domUtilService.blurFirstEditableChildById(this.pathUtilService.toPathString(path));
        this.deleteElement(this.pathUtilService.getNearestOrRootArrayParentInPath(path, false), this.pathUtilService.getElementIndexInForwardOrReversePath(path, false));
    };
    /**
     * @param path - Path of the element's array parent
     * @param index - Index of the element that is deleted from array parent path
     */
    ShortcutActionService.prototype.deleteElement = function (path, index) {
        var values = this.jsonStoreService.getIn(path);
        this.jsonStoreService.setIn(path, values.remove(index));
    };
    ShortcutActionService.prototype.navigateUpAction = function (path) {
        this.navigateUpDown(path, -1);
    };
    ShortcutActionService.prototype.navigateDownAction = function (path) {
        this.navigateUpDown(path, 1);
    };
    /**
     * @param path - Path of the element that is focused
     * @param direction - Navigation direction. -1 for UP, +1 for DOWN
     */
    ShortcutActionService.prototype.navigateUpDown = function (path, direction) {
        var values = this.jsonStoreService.getIn(this.pathUtilService.getNearestOrRootArrayParentInPath(path, false));
        if (__WEBPACK_IMPORTED_MODULE_1_immutable__["List"].isList(values)) {
            var elemIndexInPath = this.pathUtilService.getElementIndexInForwardOrReversePath(path, true);
            if ((elemIndexInPath + direction) < values.size && (elemIndexInPath + direction) >= 0) {
                path[path.length - 2] = elemIndexInPath + direction;
            }
            else {
                path[path.length - 2] = values.size - Math.abs((elemIndexInPath + direction));
            }
            var pathString = this.pathUtilService.toPathString(path);
            this.domUtilService.focusAndSelectFirstEditableChildById(pathString);
        }
    };
    ShortcutActionService.prototype.navigateLeftAction = function (path) {
        this.navigateRightLeft(path, -1);
    };
    ShortcutActionService.prototype.navigateRightAction = function (path) {
        this.navigateRightLeft(path, 1);
    };
    /**
     * @param path - Path of the element that is focused
     * @param direction - Navigation direction. -1 for LEFT, +1 for RIGHT
     */
    ShortcutActionService.prototype.navigateRightLeft = function (path, direction) {
        var pathString = this.pathUtilService.toPathString(path);
        this.domUtilService.focusRightOrLeftParentCell(pathString, direction);
    };
    /**
     * Copies the current row in table below and sets the value of the previous focused field to empty in the new row
     * @param path - Path
     */
    ShortcutActionService.prototype.copyAction = function (path) {
        this.copyRowOrSchemaBelow(path, false);
    };
    /**
     * Copies the root parent element below(eg creates a new author in authors list)
     * when you edit an author's field)
     * @param path - Path
     */
    ShortcutActionService.prototype.copyFromRootAction = function (path) {
        this.copyRowOrSchemaBelow(path, true);
    };
    /**
     * @param originalPath - Path of the element that is copied
     * @param root - Copy item from parent or root. Set to true for usage as in `copyFromRootAction` and false
     * for usage as in `copyAction`
     */
    ShortcutActionService.prototype.copyRowOrSchemaBelow = function (originalPath, root) {
        var arrayParentPath = this.pathUtilService.getNearestOrRootArrayParentInPath(originalPath, root);
        if (this.jsonSchemaService.forPathArray(arrayParentPath)['items'].hasOwnProperty('properties')) {
            var elemIndex = this.pathUtilService.getElementIndexInForwardOrReversePath(originalPath, root);
            var valuesList = this.jsonStoreService.getIn(arrayParentPath) || Object(__WEBPACK_IMPORTED_MODULE_1_immutable__["List"])();
            var newValue = valuesList.get(elemIndex);
            var newPath = arrayParentPath.concat(elemIndex + 1);
            var newPathString = this.pathUtilService.toPathString(newPath);
            if (!root) {
                newValue = newValue.set(originalPath[originalPath.length - 1]);
                newPathString = "" + newPathString + this.pathUtilService.separator + originalPath[originalPath.length - 1];
            }
            this.jsonStoreService.setIn(arrayParentPath, valuesList.insert(elemIndex + 1, newValue));
            this.waitThenFocus(newPathString);
        }
    };
    ShortcutActionService.prototype.undoAction = function () {
        var rolledBackPath = this.jsonStoreService.rollbackLastChange();
        if (rolledBackPath) {
            this.waitThenFocus(rolledBackPath);
        }
    };
    ShortcutActionService.prototype.waitThenFocus = function (path) {
        var _this = this;
        setTimeout(function () {
            _this.domUtilService.focusAndSelectFirstEditableChildById(path, true);
        });
    };
    ShortcutActionService.prototype.generateShortcutAction = function (actionName) {
        var _this = this;
        return function (event) {
            event.preventDefault();
            var eventTarget = event.target;
            var pathString = eventTarget.getAttribute('data-path');
            if (pathString) {
                _this[actionName](_this.pathUtilService.toPathArray(pathString));
            }
            return false;
        };
    };
    return ShortcutActionService;
}());

ShortcutActionService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
ShortcutActionService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__empty_value_service__["a" /* EmptyValueService */], },
    { type: __WEBPACK_IMPORTED_MODULE_5__dom_util_service__["a" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_3__json_store_service__["a" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_4__json_schema_service__["a" /* JsonSchemaService */], },
    { type: __WEBPACK_IMPORTED_MODULE_6__path_util_service__["a" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_7__keys_store_service__["a" /* KeysStoreService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/tabs-util.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsUtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__path_util_service__ = __webpack_require__("../../../../../dist/src/shared/services/path-util.service.js");
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



var TabsUtilService = (function () {
    function TabsUtilService(pathUtilService) {
        this.pathUtilService = pathUtilService;
        this.activeTabName$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
    }
    TabsUtilService.prototype.getTabNames = function (tabsConfig) {
        var tabNames = tabsConfig.tabs.map(function (tab) { return tab.name; });
        // insert default tab name at the beginning
        return [tabsConfig.defaultTabName]
            .concat(tabNames);
    };
    TabsUtilService.prototype.getSchemaKeyToTabName = function (tabsConfig, schema) {
        if (!this.schemaKeyToTabName) {
            // set tab.name for configured keys
            var keyToTabName_1 = tabsConfig.tabs
                .map(function (tab) {
                var keysWithTabName = {};
                tab.properties.forEach(function (key) {
                    keysWithTabName[key] = tab.name;
                });
                return keysWithTabName;
            }).reduce(function (pre, cur) { return Object.assign(pre, cur); });
            // set defaultTabName for all other keys in the schema
            Object.keys(schema.properties)
                .filter(function (key) { return !keyToTabName_1[key]; })
                .forEach(function (key) {
                keyToTabName_1[key] = tabsConfig.defaultTabName;
            });
            this.schemaKeyToTabName = keyToTabName_1;
        }
        return this.schemaKeyToTabName;
    };
    // TODO: maybe this could be a decorator
    TabsUtilService.prototype.selectTabIfNeeded = function (path) {
        if (this.schemaKeyToTabName) {
            var tabName = this.schemaKeyToTabName[this.pathUtilService.toPathArray(path)[0]];
            this.activeTabName$.next(tabName);
        }
    };
    return TabsUtilService;
}());

TabsUtilService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
TabsUtilService.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__path_util_service__["a" /* PathUtilService */], },
]; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/text-diff.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextDiffService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_diff__ = __webpack_require__("../../../../diff/dist/diff.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_diff___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_diff__);
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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


var TextDiffService = (function () {
    function TextDiffService() {
    }
    TextDiffService.prototype.diffByWord = function (currentText, newText) {
        if (newText === void 0) { newText = ''; }
        return Object(__WEBPACK_IMPORTED_MODULE_1_diff__["diffWords"])(currentText, newText);
    };
    return TextDiffService;
}());

TextDiffService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
TextDiffService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/shared/services/window-href.service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WindowHrefService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var WindowHrefService = (function () {
    function WindowHrefService() {
        this.hrefWithoutHash = this.getHrefWithoutHash();
    }
    WindowHrefService.prototype.getHrefWithoutHash = function () {
        var href = window.location.href;
        var lastHashIndex = href.lastIndexOf('#');
        if (lastHashIndex > 0) {
            return href.substring(0, lastHashIndex);
        }
        else {
            return href;
        }
    };
    return WindowHrefService;
}());

WindowHrefService.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */] },
];
/** @nocollapse */
WindowHrefService.ctorParameters = function () { return []; };


/***/ }),

/***/ "../../../../../dist/src/string-input/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__string_input_component__ = __webpack_require__("../../../../../dist/src/string-input/string-input.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__string_input_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/string-input/string-input.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringInputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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


var StringInputComponent = (function () {
    function StringInputComponent(domUtilService, katexService) {
        this.domUtilService = domUtilService;
        this.katexService = katexService;
        this.blur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.onKeypress = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.valueChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    StringInputComponent.prototype.ngOnChanges = function (changes) {
        var valueChange = changes['value'];
        if (valueChange) {
            this.contentModel = this.value;
            if (this.latexPreviewEnabled && !valueChange.firstChange) {
                this.renderLatex();
            }
        }
    };
    StringInputComponent.prototype.ngOnInit = function () {
        if (this.shouldShowLatexPreview) {
            this.latexPreviewShown = true;
        }
    };
    StringInputComponent.prototype.ngAfterViewInit = function () {
        // render latex preview on init, if it's enabled and value is not empty
        if (this.shouldShowLatexPreview) {
            this.renderLatex();
        }
    };
    StringInputComponent.prototype.onBlur = function () {
        if (this.shouldShowLatexPreview) {
            this.latexPreviewShown = true;
            this.value = this.contentModel;
        }
        this.blur.emit();
    };
    StringInputComponent.prototype.renderLatex = function () {
        this.katexService.renderMathInText(this.value, this.latexPreviewEl.nativeElement);
    };
    StringInputComponent.prototype.hideLatexPreview = function (contentEditableDiv) {
        this.latexPreviewShown = false;
        setTimeout(function () { return contentEditableDiv.focus(); });
    };
    StringInputComponent.prototype.contentModelChange = function (value) {
        this.contentModel = value;
        this.valueChange.emit(value);
    };
    Object.defineProperty(StringInputComponent.prototype, "shouldShowLatexPreview", {
        get: function () {
            return this.latexPreviewEnabled && Boolean(this.value);
        },
        enumerable: true,
        configurable: true
    });
    return StringInputComponent;
}());

StringInputComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'string-input',
                styles: [""],
                template: "<div [class.hidden]=\"latexPreviewShown\" [attr.contenteditable]=\"!disabled\" [attr.data-path]=\"pathString\" [tabindex]=\"tabIndex\" [contentModel]=\"contentModel\" (contentModelChange)=\"contentModelChange($event)\" (blur)=\"onBlur()\" (keypress)=\"onKeypress.emit($event)\" attr.placeholder=\"{{placeholder || '⁣\u2063'}}\" #contentEditable></div> <div [class.hidden]=\"!latexPreviewEnabled || !latexPreviewShown\" (click)=\"hideLatexPreview(contentEditable)\" (blur)=\"hideLatexPreview(contentEditable)\" #latexPreview></div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
StringInputComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["i" /* KatexService */], },
]; };
StringInputComponent.propDecorators = {
    'latexPreviewEl': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */], args: ['latexPreview',] },],
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'disabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'pathString': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'placeholder': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'tabIndex': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'latexPreviewEnabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'blur': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'onKeypress': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
    'valueChange': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Output */] },],
};


/***/ }),

/***/ "../../../../../dist/src/sub-record/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sub_record_component__ = __webpack_require__("../../../../../dist/src/sub-record/sub-record.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__sub_record_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/sub-record/sub-record.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubRecordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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


var SubRecordComponent = (function () {
    function SubRecordComponent(jsonStoreService, appGlobalsService, tabsUtilService, keysStoreService) {
        this.jsonStoreService = jsonStoreService;
        this.appGlobalsService = appGlobalsService;
        this.tabsUtilService = tabsUtilService;
        this.keysStoreService = keysStoreService;
        this.pathCache = {};
    }
    SubRecordComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['keys']) {
            var keys = void 0;
            if (this.tabName) {
                var keyToTabName_1 = this.tabsUtilService.getSchemaKeyToTabName(this.appGlobalsService.config.tabsConfig, this.schema);
                keys = this.keys
                    .filter(function (key) { return keyToTabName_1[key] === _this.tabName; });
            }
            else {
                keys = this.keys;
            }
            this.keysByType = keys
                .groupBy(function (key) { return _this.isToggle(key) ? 'toggles' : 'others'; })
                .toObject();
        }
    };
    // delete only work for others, not toggles (UPDATE: config comment if this changes)
    SubRecordComponent.prototype.deleteField = function (field) {
        this.jsonStoreService.removeIn(this.getPathForChild(field));
    };
    SubRecordComponent.prototype.getPathForChild = function (key) {
        if (!this.pathCache[key]) {
            this.pathCache[key] = [key];
        }
        return this.pathCache[key];
    };
    SubRecordComponent.prototype.onToggleValueChange = function (field, value) {
        this.jsonStoreService.setIn(this.getPathForChild(field), value);
    };
    SubRecordComponent.prototype.isToggle = function (field) {
        return this.schema.properties[field].toggleColor !== undefined;
    };
    SubRecordComponent.prototype.isDisabled = function (key) {
        return this.schema.properties[key].disabled && !this.appGlobalsService.adminMode;
    };
    SubRecordComponent.prototype.trackByElement = function (index, element) {
        return element;
    };
    SubRecordComponent.prototype.getTitleDropdownItemTemplateNamesForChild = function (key) {
        return this.schema.properties[key].titleDropdownItemTemplateNames;
    };
    return SubRecordComponent;
}());

SubRecordComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'sub-record',
                styles: ["tr.align-right td:first-child { width: 100%; } tr.align-right td:first-child slide-toggle { float: right; } "],
                template: "<div class=\"record-fields-container\"> <table class=\"table\"> <div class=\"field-wrapper\"> <tr *ngIf=\"keysByType.toggles\" class=\"align-right\"> <td *ngFor=\"let key of keysByType.toggles; trackBy:trackByElement\"> <slide-toggle [id]=\"'/' + key\" [value]=\"value.get(key) | selfOrEmpty:schema.properties[key]\" (valueChange)=\"onToggleValueChange(key, $event)\" [onText]=\"key\" [offText]=\"key\" [onColor]=\"schema.properties[key].toggleColor\"></slide-toggle> </td> </tr> </div> <div *ngIf=\"keysByType.others\"> <div class=\"field-wrapper\" *ngFor=\"let key of keysByType.others | setFirstElementPath:tabName; trackBy:trackByElement\"> <tr> <td class=\"label-holder\"> <title-dropdown [title]=\"key | underscoreToSpace\" [isDisabled]=\"isDisabled(key)\"> <li *ngIf=\"schema.properties[key].type === 'array'\" class=\"title-dropdown-item\"> <add-new-element-button [path]=\"getPathForChild(key)\" [schema]=\"schema.properties[key]\"></add-new-element-button> </li> <li class=\"title-dropdown-item\"> <button type=\"button\" class=\"editor-btn-delete editor-btn-delete-text\" (click)=\"deleteField(key)\">Delete</button> </li> <ng-container *ngIf=\"getTitleDropdownItemTemplateNamesForChild(key)\"> <li *ngFor=\"let templateName of getTitleDropdownItemTemplateNamesForChild(key)\" class=\"title-dropdown-item custom-title-dropdown-item\"> <ng-template [ngTemplateOutlet]=\"appGlobalsService.templates[templateName]\"></ng-template> </li> </ng-container> <li class=\"divider\"></li> <li class=\"title-dropdown-item\" (click)=\"$event.stopPropagation()\"> <find-replace [path]=\"getPathForChild(key)\" [schema]=\"schema.properties[key]\"></find-replace> </li> </title-dropdown> </td> </tr> <tr> <td> <any-type-field [value]=\"value.get(key) | selfOrEmpty:schema.properties[key]\" [schema]=\"schema.properties[key]\" [path]=\"getPathForChild(key)\"></any-type-field> </td> </tr> </div> </div> </table> </div> ",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
SubRecordComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["u" /* TabsUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["j" /* KeysStoreService */], },
]; };
SubRecordComponent.propDecorators = {
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'tabName': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'keys': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'pathString': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/table-item-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table_item_field_component__ = __webpack_require__("../../../../../dist/src/table-item-field/table-item-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__table_item_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/table-item-field/table-item-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableItemFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_field__ = __webpack_require__("../../../../../dist/src/abstract-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var TableItemFieldComponent = (function (_super) {
    __extends(TableItemFieldComponent, _super);
    function TableItemFieldComponent(appGlobalsService, problemsService, jsonStoreService, pathUtilService, changeDetectorRef) {
        var _this = _super.call(this, appGlobalsService, problemsService, pathUtilService, changeDetectorRef, jsonStoreService) || this;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.jsonStoreService = jsonStoreService;
        _this.pathUtilService = pathUtilService;
        _this.changeDetectorRef = changeDetectorRef;
        return _this;
    }
    return TableItemFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_field__["a" /* AbstractFieldComponent */]));

TableItemFieldComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                // Defined as attribute selector not to break table > tr > td html structure
                // tslint:disable-next-line
                selector: '[table-item-field]',
                styles: [""],
                template: "<td *ngFor=\"let key of keys; trackBy:trackByElement; first as isFirst\" [style.width]=\"schema.properties[key].columnWidth + '%'\" [ngClass]=\"isFirst ? redLeftBorderClass : ''\"> <patch-actions *ngIf=\"removeJsonPatch && isFirst\" [patch]=\"removeJsonPatch\"></patch-actions> <any-type-field [value]=\"value.get(key) | selfOrEmpty:schema.properties[key]\" [schema]=\"schema.properties[key]\" [path]=\"getPathForChild(key)\"> </any-type-field> <add-new-element-button *ngIf=\"schema.properties[key].type === 'array'\" [path]=\"getPathForChild(key)\" [schema]=\"schema.properties[key]\"> </add-new-element-button> </td> <!-- td element with list-action-group (up/down and delete buttons) --> <ng-content></ng-content>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
TableItemFieldComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
]; };
TableItemFieldComponent.propDecorators = {
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'keys': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/table-list-field/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__table_list_field_component__ = __webpack_require__("../../../../../dist/src/table-list-field/table-list-field.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__table_list_field_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/table-list-field/table-list-field.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableListFieldComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_list_field__ = __webpack_require__("../../../../../dist/src/abstract-list-field/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var TableListFieldComponent = (function (_super) {
    __extends(TableListFieldComponent, _super);
    function TableListFieldComponent(appGlobalsService, problemsService, jsonStoreService, pathUtilService, keysStoreService, changeDetectorRef) {
        var _this = _super.call(this, appGlobalsService, problemsService, jsonStoreService, pathUtilService, changeDetectorRef) || this;
        _this.appGlobalsService = appGlobalsService;
        _this.problemsService = problemsService;
        _this.jsonStoreService = jsonStoreService;
        _this.pathUtilService = pathUtilService;
        _this.keysStoreService = keysStoreService;
        _this.changeDetectorRef = changeDetectorRef;
        return _this;
    }
    Object.defineProperty(TableListFieldComponent.prototype, "keys$", {
        get: function () {
            return this.keysStoreService.forPath(this.pathString);
        },
        enumerable: true,
        configurable: true
    });
    return TableListFieldComponent;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_list_field__["a" /* AbstractListFieldComponent */]));

TableListFieldComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'table-list-field',
                styles: ["table.editable-inner-table { border: none; } table.editable-inner-table thead > tr > th { vertical-align: middle; border: none; color: #c1c1c1; } "],
                template: "<div [id]=\"pathString\" [ngClass]=\"redLeftBorderClass\"> <table class=\"table editable-inner-table\"> <thead class=\"thead-inverse\"> <tr> <th *ngFor=\"let key of keys$ | async; trackBy:trackByElement\" [style.width]=\"schema.items.properties[key].columnWidth + '%'\"> {{key | underscoreToSpace}} </th> <th class=\"button-holder\" [class.sortable]=\"schema.sortable\"> <add-field-dropdown *ngIf=\"values.size > 0\" [fields]=\"keys$ | async\" [pathString]=\"pathString\" [schema]=\"schema.items\" [isDisabled]=\"disabled\"> <i class=\"fa fa-plus\"></i> </add-field-dropdown> </th> </tr> </thead> <tr *ngFor=\"let value of values; let i = index; trackBy:trackByIndex\" table-item-field [id]=\"getPathStringForChild(i)\" [value]=\"value\" [schema]=\"schema.items\" [path]=\"getPathForChild(i)\" [keys]=\"keys$ | async\"> <td *ngIf=\"values.size > 0\" class=\"button-holder\" [class.sortable]=\"schema.sortable\"> <list-action-group (onMove)=\"moveElement(i, $event)\" (onDelete)=\"deleteElement(i)\" [canMove]=\"schema.sortable\" [isDisabled]=\"disabled\"></list-action-group> </td> </tr> <tr *ngIf=\"removeJsonPatch\"> <patch-actions [patch]=\"removeJsonPatch\"></patch-actions> </tr> </table> <div *ngFor=\"let patch of addJsonPatches\"> <add-patch-view [patch]=\"patch\"></add-patch-view> </div> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
TableListFieldComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["a" /* AppGlobalsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["n" /* ProblemsService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["g" /* JsonStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__shared_services__["j" /* KeysStoreService */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], },
]; };
TableListFieldComponent.propDecorators = {
    'values': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/text-diff/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_diff_component__ = __webpack_require__("../../../../../dist/src/text-diff/text-diff.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__text_diff_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/text-diff/text-diff.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextDiffComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
/*
 * This file is part of ng2-json-editor.
 * Copyright (C) 2017 CERN.
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


var TextDiffComponent = (function () {
    function TextDiffComponent(textDiffService) {
        this.textDiffService = textDiffService;
    }
    Object.defineProperty(TextDiffComponent.prototype, "diffs", {
        get: function () {
            return this.textDiffService
                .diffByWord(this.currentText, this.newText);
        },
        enumerable: true,
        configurable: true
    });
    return TextDiffComponent;
}());

TextDiffComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'text-diff',
                template: "<span *ngFor=\"let diff of diffs\" [ngClass]=\"{added: diff.added, removed: diff.removed}\">{{diff.value}}</span>",
                styles: [".added { color: green; font-weight: bold; } .removed { color: red; text-decoration: line-through; } "],
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
TextDiffComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["v" /* TextDiffService */], },
]; };
TextDiffComponent.propDecorators = {
    'newText': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'currentText': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/title-dropdown/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__title_dropdown_component__ = __webpack_require__("../../../../../dist/src/title-dropdown/title-dropdown.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__title_dropdown_component__["a"]; });



/***/ }),

/***/ "../../../../../dist/src/title-dropdown/title-dropdown.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TitleDropdownComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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

var TitleDropdownComponent = (function () {
    function TitleDropdownComponent() {
    }
    return TitleDropdownComponent;
}());

TitleDropdownComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'title-dropdown',
                styles: [".title-dropdown-toggle { font-size: 13px; background: transparent; border: none; padding: 0px 3px 0px 3px; color: #c1c1c1; font-weight: bold; } .title-dropdown-toggle:focus { outline: 0; } .title-dropdown-toggle:hover { color: #6b6b6b; } .dropdown-menu { min-width: 120px; top: initial; left: initial; } "],
                template: "<div dropdown [isDisabled]=\"isDisabled\"> <button class=\"btn title-dropdown-toggle\" dropdownToggle> {{title}} <span class=\"caret\"></span> </button> <ul class=\"dropdown-menu\" *dropdownMenu> <ng-content></ng-content> </ul> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
TitleDropdownComponent.ctorParameters = function () { return []; };
TitleDropdownComponent.propDecorators = {
    'title': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'isDisabled': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/tree-menu/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tree_menu_component__ = __webpack_require__("../../../../../dist/src/tree-menu/tree-menu.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree_menu_item_component__ = __webpack_require__("../../../../../dist/src/tree-menu/tree-menu-item.component.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tree_menu_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__tree_menu_item_component__["a"]; });





/***/ }),

/***/ "../../../../../dist/src/tree-menu/tree-menu-item.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeMenuItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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


var TreeMenuItemComponent = (function () {
    function TreeMenuItemComponent(windowHrefService, domUtilService, pathUtilService, appGlobalsService) {
        this.windowHrefService = windowHrefService;
        this.domUtilService = domUtilService;
        this.pathUtilService = pathUtilService;
        this.appGlobalsService = appGlobalsService;
        this.isCollapsed = true;
    }
    TreeMenuItemComponent.prototype.ngOnInit = function () {
        this.href = this.windowHrefService.hrefWithoutHash + "#" + this.path;
    };
    TreeMenuItemComponent.prototype.ngOnChanges = function (changes) {
        if (changes['value'] && this.value && this.schema.type === 'object') {
            this.keys = this.value.keySeq().toSet();
        }
    };
    TreeMenuItemComponent.prototype.toggle = function (event) {
        // fix to trigger :focus css after focusAndSelectFirstInputChildById called.
        event.preventDefault();
        this.isCollapsed = !this.isCollapsed;
        this.domUtilService.focusAndSelectFirstEditableChildById(this.path, true);
    };
    TreeMenuItemComponent.prototype.collapse = function () {
        this.isCollapsed = true;
    };
    Object.defineProperty(TreeMenuItemComponent.prototype, "isCollapsable", {
        get: function () {
            var schemaType = this.schema.type;
            return this.isNotLeaf && (schemaType === 'object' || schemaType === 'array');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeMenuItemComponent.prototype, "maxDepth", {
        get: function () {
            return this.appGlobalsService.config.menuMaxDepth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeMenuItemComponent.prototype, "isNotLeaf", {
        get: function () {
            return this.maxDepth === undefined || this.depth < this.maxDepth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeMenuItemComponent.prototype, "adminMode$", {
        get: function () {
            return this.appGlobalsService.adminMode$;
        },
        enumerable: true,
        configurable: true
    });
    TreeMenuItemComponent.prototype.getChildPath = function (indexOrKey) {
        return "" + this.path + this.pathUtilService.separator + indexOrKey;
    };
    TreeMenuItemComponent.prototype.trackByElement = function (index, element) {
        return element;
    };
    return TreeMenuItemComponent;
}());

TreeMenuItemComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'tree-menu-item',
                styles: ["a { color: #e0dfdf; } "],
                template: "<div> <a [href]=\"href\" (click)=\"toggle($event)\">{{label}}</a> <a *ngIf=\"isCollapsable\" [hidden]=\"isCollapsed\" (click)=\"collapse()\"> [x]</a> <div *ngIf=\"isNotLeaf\" [ngSwitch]=\"schema.type\" [hidden]=\"isCollapsed\"> <ul> <div *ngSwitchCase=\"'object'\"> <li *ngFor=\"let key of keys | filterHiddenFields:schema:(adminMode$ | async) | addAlwaysShowFields:schema | sortAlphabetically; trackBy:trackByElement\"> <tree-menu-item [label]=\"key\" [value]=\"value.get(key)\" [schema]=\"schema.properties[key]\" [path]=\"getChildPath(key)\" [depth]=\"depth + 1\"></tree-menu-item> </li> </div> <div *ngSwitchCase=\"'array'\"> <li *ngFor=\"let element of value; let i = index; trackBy:trackByElement\"> <tree-menu-item [label]=\"i\" [value]=\"element\" [schema]=\"schema.items\" [path]=\"getChildPath(i)\" [depth]=\"depth + 1\"></tree-menu-item> </li> </div> </ul> </div> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
TreeMenuItemComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["w" /* WindowHrefService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["a" /* AppGlobalsService */], },
]; };
TreeMenuItemComponent.propDecorators = {
    'label': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'value': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'path': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'depth': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../dist/src/tree-menu/tree-menu.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services__ = __webpack_require__("../../../../../dist/src/shared/services/index.js");
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


var TreeMenuComponent = (function () {
    function TreeMenuComponent(domUtilService, pathUtilService, appGlobalsService) {
        this.domUtilService = domUtilService;
        this.pathUtilService = pathUtilService;
        this.appGlobalsService = appGlobalsService;
        this.prefixOrPath = '';
    }
    TreeMenuComponent.prototype.ngOnChanges = function (changes) {
        if (changes['record']) {
            this.keys = this.record.keySeq().toSet();
        }
    };
    TreeMenuComponent.prototype.getChildPath = function (key) {
        return "" + this.pathUtilService.separator + key;
    };
    TreeMenuComponent.prototype.trackByElement = function (index, element) {
        return element;
    };
    Object.defineProperty(TreeMenuComponent.prototype, "adminMode$", {
        get: function () {
            return this.appGlobalsService.adminMode$;
        },
        enumerable: true,
        configurable: true
    });
    return TreeMenuComponent;
}());

TreeMenuComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'tree-menu',
                styles: ["div.tree-menu-container { padding: 8px 0; overflow-x: hidden; overflow-y: auto; text-align: center; } ul.menu-item-container { list-style: none; text-align: left; padding-top: 8px; } ul.menu-item-container li { margin-bottom: 2px; } "],
                template: "<div class=\"tree-menu-container\"> <ul class=\"menu-item-container\"> <li *ngFor=\"let key of keys | filterHiddenFields:schema:(adminMode$ | async) | addAlwaysShowFields:schema | sortAlphabetically; trackBy:trackByElement\"> <tree-menu-item [label]=\"key\" [value]=\"record.get(key)\" [schema]=\"schema.properties[key]\" [path]=\"getChildPath(key)\" [depth]=\"1\"></tree-menu-item> </li> </ul> </div>",
                changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectionStrategy */].OnPush
            },] },
];
/** @nocollapse */
TreeMenuComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["c" /* DomUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["m" /* PathUtilService */], },
    { type: __WEBPACK_IMPORTED_MODULE_1__shared_services__["a" /* AppGlobalsService */], },
]; };
TreeMenuComponent.propDecorators = {
    'record': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
    'schema': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */] },],
};


/***/ }),

/***/ "../../../../../example/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../example/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../example/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template let-item=\"item\" #referenceTemplate>\n  <div class=\"reference-template-container\" [ngSwitch]=\"item.hasIn(['record', '$ref'])\">\n    <span *ngSwitchCase=\"true\">\n      <i class=\"fa fa-check-circle success\" aria-hidden=\"true\"></i>\n      <a href=\"{{item.getIn(['record', '$ref'])}}\" target=\"_blank\">{{item.getIn(['reference', 'misc', 0])}}</a>\n    </span>\n    <span *ngSwitchDefault>\n      <i class=\"fa fa-exclamation-triangle warning\" aria-hidden=\"true\"></i>\n      {{item.getIn(['reference', 'misc', 0])}}\n    </span>\n  </div>\n</ng-template>\n<json-editor *ngIf=\"record && schema\"\n  [config]=\"config\"\n  [(record)]=\"record\"\n  [(jsonPatches)]=\"patches\"\n  [problemMap]=\"problemMap\"\n  [schema]=\"schema\"\n  [templates]=\"{referenceTemplate: referenceTemplate}\">\n</json-editor>"

/***/ }),

/***/ "../../../../../example/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".fa-check-circle.success {\n  color: green; }\n\n.fa-exclamation-triangle.warning {\n  color: orange; }\n\n.reference-template-container {\n  background-color: white;\n  box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #B3B3B3;\n  padding: 5px;\n  margin-bottom: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../example/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_zip__ = __webpack_require__("../../../../rxjs/add/observable/zip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_zip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_zip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../example/environments/environment.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(http) {
        var _this = this;
        this.http = http;
        this.config = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].editorConfig;
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].zip(this.http.get("./assets/" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].mockDataFolder + "/record.json"), this.http.get("./assets/" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].mockDataFolder + "/schema.json"), this.http.get("./assets/" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].mockDataFolder + "/patches.json"), this.http.get("./assets/" + __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].mockDataFolder + "/problem-map.json"), function (recordRes, schemaRes, patchesRes, problemMapRes) {
            return {
                record: recordRes.json(),
                schema: schemaRes.json(),
                patches: patchesRes.json(),
                problemMap: problemMapRes.json(),
            };
        }).subscribe(function (data) {
            _this.record = data.record;
            _this.schema = data.schema;
            _this.patches = data.patches;
            _this.problemMap = data.problemMap;
        });
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        // tslint:disable-next-line
        selector: 'app',
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewEncapsulation */].None,
        styles: [__webpack_require__("../../../../../example/app/app.component.scss")],
        template: __webpack_require__("../../../../../example/app/app.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/app.component.js.map

/***/ }),

/***/ "../../../../../example/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dist__ = __webpack_require__("../../../../../dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../example/app/app.component.ts");
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__dist__["a" /* JsonEditorModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/app.module.js.map

/***/ }),

/***/ "../../../../../example/app/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_module__ = __webpack_require__("../../../../../example/app/app.module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_module__["a"]; });

//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/index.js.map

/***/ }),

/***/ "../../../../../example/configs/config.e2e.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export e2eConfig */
// ALWAYS access config through `environment`, DO NOT import from here
var e2eConfig = {
    schemaOptions: {
        alwaysShow: ['deleted'],
        properties: {
            $schema: {
                hidden: true
            },
            deleted: {
                toggleColor: '#e74c3c'
            },
            citeable: {
                toggleColor: '#3498db'
            },
            core: {
                toggleColor: '#27ae60'
            },
            authors: {
                items: {
                    order: ['full_name', 'affiliations'],
                    alwaysShow: ['credit_roles'],
                    properties: {
                        ids: {
                            disabled: true
                        }
                    }
                }
            },
            references: {
                sortable: true,
                longListNavigatorConfig: {
                    findSingle: function (value, expression) {
                        return value.getIn(['reference', 'number']) === parseInt(expression, 10);
                    },
                    findMultiple: function (value, expression) {
                        return JSON.stringify(value).search(expression) > -1;
                    },
                    itemsPerPage: 20,
                    maxVisiblePageCount: 5
                },
                viewTemplateConfig: {
                    itemTemplateName: 'referenceTemplate',
                    showEditForm: function (value) {
                        return !(value.hasIn(['record', '$ref']));
                    }
                }
            },
            arxiv_eprints: {
                items: {
                    properties: {
                        value: {
                            linkBuilder: function (value) {
                                return "http://arxiv.org/abs/" + value;
                            }
                        }
                    }
                }
            },
            abstracts: {
                items: {
                    properties: {
                        source: {
                            columnWidth: 20
                        },
                        value: {
                            latexPreviewEnabled: true
                        }
                    }
                }
            },
            publication_info: {
                items: {
                    properties: {
                        conference_record: {
                            refFieldConfig: {
                                anchorBuilder: function (url) {
                                    var parts = url.split('/');
                                    var type = parts[parts.length - 2].slice(0, -1);
                                    var display = "View " + type;
                                    var href = url.replace(/\/api\//, '/');
                                    return { href: href, display: display };
                                }
                            }
                        }
                    }
                }
            },
            titles: {
                items: {
                    properties: {
                        title: {
                            latexPreviewEnabled: true
                        }
                    }
                }
            },
            imprints: {
                items: {
                    properties: {
                        date: {
                            errorMessage: {
                                format: 'This is not a date!'
                            }
                        }
                    }
                }
            }
        }
    },
    shortcuts: {
        navigateRight: 'mod+shift+right'
    },
    customFormatValidation: {
        date: {
            formatChecker: function (value) {
                var formats = [
                    /^\d{4}$/,
                    /^\d{4}-\d{2}$/,
                    /^\d{4}-\d{2}-\d{2}$/
                ];
                return formats
                    .some(function (format) {
                    if (value.match(format)) {
                        return Date.parse(value) !== NaN;
                    }
                    return false;
                });
            }
        },
        'date-time': {
            formatChecker: function (value) {
                var regex = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i;
                if (value.match(regex)) {
                    return true;
                }
                ;
                return false;
            }
        }
    },
    enableAdminModeSwitch: true,
    menuMaxDepth: 1,
    tabsConfig: {
        defaultTabName: 'Main',
        tabs: [
            {
                name: 'References',
                properties: ['references']
            },
            {
                name: 'Authors',
                properties: [
                    'collaboration',
                    'accelerator_experiments',
                    'authors',
                    'corporate_author'
                ]
            }
        ]
    },
    previews: [
        {
            name: 'pdf',
            type: 'html',
            urlPath: '/urls/0/value'
        }
    ]
};
//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/config.e2e.js.map

/***/ }),

/***/ "../../../../../example/configs/config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaultConfig; });
// ALWAYS access config through `environment`, DO NOT import from here
var defaultConfig = {
    schemaOptions: {
        alwaysShow: ['deleted'],
        properties: {
            $schema: {
                hidden: true
            },
            deleted: {
                toggleColor: '#e74c3c'
            },
            citeable: {
                toggleColor: '#3498db'
            },
            core: {
                toggleColor: '#27ae60'
            },
            authors: {
                items: {
                    order: ['full_name', 'affiliations'],
                    alwaysShow: ['credit_roles'],
                    properties: {
                        ids: {
                            disabled: true
                        }
                    }
                }
            },
            references: {
                sortable: true,
                longListNavigatorConfig: {
                    findSingle: function (value, expression) {
                        return value.getIn(['reference', 'number']) === parseInt(expression, 10);
                    },
                    findMultiple: function (value, expression) {
                        return JSON.stringify(value).search(expression) > -1;
                    },
                    itemsPerPage: 20,
                    maxVisiblePageCount: 5
                },
                viewTemplateConfig: {
                    itemTemplateName: 'referenceTemplate',
                    showEditForm: function (value) {
                        return !(value.hasIn(['record', '$ref']));
                    }
                }
            },
            arxiv_eprints: {
                items: {
                    properties: {
                        value: {
                            linkBuilder: function (value) {
                                return "http://arxiv.org/abs/" + value;
                            }
                        }
                    }
                }
            },
            abstracts: {
                items: {
                    properties: {
                        source: {
                            columnWidth: 20
                        },
                        value: {
                            latexPreviewEnabled: true
                        }
                    }
                }
            },
            publication_info: {
                items: {
                    properties: {
                        conference_record: {
                            refFieldConfig: {
                                anchorBuilder: function (url) {
                                    var parts = url.split('/');
                                    var type = parts[parts.length - 2].slice(0, -1);
                                    var display = "View " + type;
                                    var href = url.replace(/\/api\//, '/');
                                    return { href: href, display: display };
                                }
                            }
                        }
                    }
                }
            },
            titles: {
                items: {
                    properties: {
                        title: {
                            latexPreviewEnabled: true
                        }
                    }
                }
            },
            imprints: {
                items: {
                    properties: {
                        date: {
                            errorMessage: {
                                format: 'This is not a date!'
                            }
                        }
                    }
                }
            }
        }
    },
    shortcuts: {
        navigateRight: 'mod+shift+right'
    },
    customFormatValidation: {
        date: {
            formatChecker: function (value) {
                var formats = [
                    /^\d{4}$/,
                    /^\d{4}-\d{2}$/,
                    /^\d{4}-\d{2}-\d{2}$/
                ];
                return formats
                    .some(function (format) {
                    if (value.match(format)) {
                        return Date.parse(value) !== NaN;
                    }
                    return false;
                });
            }
        },
        'date-time': {
            formatChecker: function (value) {
                var regex = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:z|[+-]\d\d:\d\d)?$/i;
                if (value.match(regex)) {
                    return true;
                }
                ;
                return false;
            }
        }
    },
    enableAdminModeSwitch: true,
    menuMaxDepth: 1,
    tabsConfig: {
        defaultTabName: 'Main',
        tabs: [
            {
                name: 'References',
                properties: ['references']
            },
            {
                name: 'Authors',
                properties: [
                    'collaboration',
                    'accelerator_experiments',
                    'authors',
                    'corporate_author'
                ]
            }
        ]
    },
    previews: [
        {
            name: 'pdf',
            type: 'html',
            urlPath: '/urls/0/value'
        }
    ]
};
//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/config.js.map

/***/ }),

/***/ "../../../../../example/configs/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("../../../../../example/configs/config.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__config__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_e2e__ = __webpack_require__("../../../../../example/configs/config.e2e.ts");
/* unused harmony reexport e2eConfig */
// ALWAYS access config through `environment`, DO NOT import from here


//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/index.js.map

/***/ }),

/***/ "../../../../../example/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__configs__ = __webpack_require__("../../../../../example/configs/index.ts");
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

var environment = {
    production: false,
    editorConfig: __WEBPACK_IMPORTED_MODULE_0__configs__["a" /* defaultConfig */],
    mockDataFolder: 'mock-data'
};
//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/environment.js.map

/***/ }),

/***/ "../../../../../example/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("../../../../../example/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../example/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app__ = __webpack_require__("../../../../../example/app/index.ts");





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app__["a" /* AppModule */]);
//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/main.js.map

/***/ }),

/***/ "../../../../../example/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__("../../../../core-js/es6/symbol.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__("../../../../core-js/es6/object.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__("../../../../core-js/es6/function.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__("../../../../core-js/es6/parse-int.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__("../../../../core-js/es6/parse-float.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__("../../../../core-js/es6/number.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__("../../../../core-js/es6/math.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__("../../../../core-js/es6/string.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__("../../../../core-js/es6/date.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__("../../../../core-js/es6/array.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__("../../../../core-js/es6/regexp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__("../../../../core-js/es6/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__("../../../../core-js/es6/set.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__("../../../../core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__("../../../../core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__("../../../../zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=/home/travis/build/inveniosoftware-contrib/ng2-json-editor/example/polyfills.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../example/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map