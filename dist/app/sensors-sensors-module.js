(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sensors-sensors-module"],{

/***/ "2qIN":
/*!*******************************************!*\
  !*** ./src/app/sensors/sensors.module.ts ***!
  \*******************************************/
/*! exports provided: SensorsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensorsModule", function() { return SensorsModule; });
/* harmony import */ var _sensors_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sensors-routing.module */ "dBQL");
/* harmony import */ var _sensors_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sensors.component */ "fW8A");
/* harmony import */ var _sensor_sensor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sensor/sensor.component */ "h6J9");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "8Y7J");





class SensorsModule {
}
SensorsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: SensorsModule });
SensorsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ factory: function SensorsModule_Factory(t) { return new (t || SensorsModule)(); }, imports: [[
            _sensors_routing_module__WEBPACK_IMPORTED_MODULE_0__["SensorsRoutingModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](SensorsModule, { declarations: [_sensors_component__WEBPACK_IMPORTED_MODULE_1__["SensorsComponent"], _sensor_sensor_component__WEBPACK_IMPORTED_MODULE_2__["SensorComponent"]], imports: [_sensors_routing_module__WEBPACK_IMPORTED_MODULE_0__["SensorsRoutingModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]] }); })();


/***/ }),

/***/ "dBQL":
/*!***************************************************!*\
  !*** ./src/app/sensors/sensors-routing.module.ts ***!
  \***************************************************/
/*! exports provided: SensorsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensorsRoutingModule", function() { return SensorsRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _shared_components_d3_sensor_d3_sensor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/components/d3-sensor/d3-sensor.component */ "AgfE");
/* harmony import */ var _shared_components_tui_sensor_tui_sensor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/components/tui-sensor/tui-sensor.component */ "qnSI");
/* harmony import */ var _sensor_sensor_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sensor/sensor.component */ "h6J9");
/* harmony import */ var _sensors_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sensors.component */ "fW8A");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "8Y7J");







const routes = [
    { path: '', component: _sensors_component__WEBPACK_IMPORTED_MODULE_4__["SensorsComponent"], pathMatch: 'full' },
    {
        path: ':id', component: _sensor_sensor_component__WEBPACK_IMPORTED_MODULE_3__["SensorComponent"], children: [
            { path: 'c3Route', component: _shared_components_d3_sensor_d3_sensor_component__WEBPACK_IMPORTED_MODULE_1__["D3SensorComponent"] },
            { path: 'tuiRoute', component: _shared_components_tui_sensor_tui_sensor_component__WEBPACK_IMPORTED_MODULE_2__["TuiSensorComponent"] },
            { path: '', redirectTo: 'tuiRoute', pathMatch: 'full' }
        ]
    }
];
class SensorsRoutingModule {
}
SensorsRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: SensorsRoutingModule });
SensorsRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ factory: function SensorsRoutingModule_Factory(t) { return new (t || SensorsRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](SensorsRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "fW8A":
/*!**********************************************!*\
  !*** ./src/app/sensors/sensors.component.ts ***!
  \**********************************************/
/*! exports provided: SensorsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensorsComponent", function() { return SensorsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _services_sensors_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/sensors.service */ "p95a");
/* harmony import */ var _shared_components_choose_sensor_choose_sensor_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/components/choose-sensor/choose-sensor.component */ "QIIY");




class SensorsComponent {
    constructor(router, sensorsSvc) {
        this.router = router;
        this.sensorsSvc = sensorsSvc;
    }
    selectSensor(sensorId) {
        this.sensorsSvc.setSelectedSensor(sensorId);
        return this.router.navigateByUrl(`/sensors/${sensorId}`);
    }
}
SensorsComponent.ɵfac = function SensorsComponent_Factory(t) { return new (t || SensorsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_sensors_service__WEBPACK_IMPORTED_MODULE_2__["SensorsService"])); };
SensorsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SensorsComponent, selectors: [["app-sensors"]], decls: 1, vars: 0, consts: [[3, "sensorIdSelected"]], template: function SensorsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-choose-sensor", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("sensorIdSelected", function SensorsComponent_Template_app_choose_sensor_sensorIdSelected_0_listener($event) { return ctx.selectSensor($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_components_choose_sensor_choose_sensor_component__WEBPACK_IMPORTED_MODULE_3__["ChooseSensorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZW5zb3JzLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "h6J9":
/*!****************************************************!*\
  !*** ./src/app/sensors/sensor/sensor.component.ts ***!
  \****************************************************/
/*! exports provided: SensorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensorComponent", function() { return SensorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngneat/until-destroy */ "3bzS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _services_sensors_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/sensors.service */ "p95a");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @taiga-ui/kit */ "fqsm");






let SensorComponent = class SensorComponent {
    constructor(router, activeRoute, sensorsSvc) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.sensorsSvc = sensorsSvc;
        this.activeItemIndex = 0;
        this.sensorBtnTitle = 'Start getting Data';
        this.sensorId = '';
        this.fullSensorDateRange = [];
    }
    ngOnInit() {
        this.activeRoute.params.pipe(Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_1__["untilDestroyed"])(this)).subscribe(params => {
            this.sensorId = params['id'];
            console.log(`Sensor selected:  ${this.sensorId}`);
        });
    }
    onTabClick(tabIndex) {
        this.activeItemIndex = tabIndex;
        const subUrl = (tabIndex == 0) ? 'tuiRoute' : 'c3Route';
        this.router.navigate([subUrl], { relativeTo: this.activeRoute, queryParams: { sensorID: this.sensorId } });
    }
};
SensorComponent.ɵfac = function SensorComponent_Factory(t) { return new (t || SensorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_sensors_service__WEBPACK_IMPORTED_MODULE_4__["SensorsService"])); };
SensorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SensorComponent, selectors: [["app-sensor"]], decls: 9, vars: 1, consts: [[1, "tui-container"], [1, "tui-row"], [1, "tui-col_12"], [3, "activeItemIndex", "activeItemIndexChange"], ["tuiTab", "", 3, "click"]], template: function SensorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "tui-tabs", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("activeItemIndexChange", function SensorComponent_Template_tui_tabs_activeItemIndexChange_3_listener($event) { return ctx.activeItemIndex = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SensorComponent_Template_button_click_4_listener() { return ctx.onTabClick(0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Tui-bar-chart based Chart");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SensorComponent_Template_button_click_6_listener() { return ctx.onTabClick(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "D3 / C3 based Chart");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("activeItemIndex", ctx.activeItemIndex);
    } }, directives: [_taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__["TuiTabsComponent"], _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__["TuiTabComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: [".tui-container[_ngcontent-%COMP%] {\n  padding: 1rem;\n  margin: 1rem;\n  width: 100%;\n  overflow: auto;\n}\n.tui-container[_ngcontent-%COMP%]   .axes[_ngcontent-%COMP%] {\n  min-height: 300px;\n  min-width: 90%;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxzZW5zb3IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0FBQ0Y7QUFDRTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7QUFDSiIsImZpbGUiOiJzZW5zb3IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudHVpLWNvbnRhaW5lciB7XHJcbiAgcGFkZGluZzogMXJlbTtcclxuICBtYXJnaW46IDFyZW07XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcblxyXG4gIC5heGVzIHtcclxuICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xyXG4gICAgbWluLXdpZHRoOiA5MCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuIl19 */"] });
SensorComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_1__["UntilDestroy"])()
], SensorComponent);



/***/ })

}]);
//# sourceMappingURL=sensors-sensors-module.js.map