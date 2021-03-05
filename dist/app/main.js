(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\fbTest\fbTestApp\src\main.ts */"zUnb");


/***/ }),

/***/ "AgfE":
/*!********************************************************************!*\
  !*** ./src/app/shared/components/d3-sensor/d3-sensor.component.ts ***!
  \********************************************************************/
/*! exports provided: calendarStream$, D3SensorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calendarStream$", function() { return calendarStream$; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D3SensorComponent", function() { return D3SensorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @taiga-ui/cdk */ "ig6K");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase */ "JZFu");
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngneat/until-destroy */ "3bzS");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @taiga-ui/kit */ "fqsm");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var c3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! c3 */ "LV99");
/* harmony import */ var c3__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(c3__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var src_app_services_sensors_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/sensors.service */ "p95a");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");













const today = new Date();
const [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDay()];
const calendarStream$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])(new _taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__["TuiDayRange"](new _taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__["TuiDay"](year, month, day), new _taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__["TuiDay"](year, month, day - 3)));
let D3SensorComponent = class D3SensorComponent {
    constructor(activeRoute, sensorsSvc) {
        this.activeRoute = activeRoute;
        this.sensorsSvc = sensorsSvc;
        this.sensorId = '';
        this.calItems = Object(_taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__["tuiCreateDefaultDayRangePeriods"])();
        this.sensorBtnTitle = 'Start getting Data';
        this.fullSensorDateRange = [];
        this.loadingState = 'stopped';
        this.fromTimestamp = firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore.Timestamp.fromMillis(Date.now()).toMillis();
        this.toTimestamp = firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore.Timestamp.fromMillis(Date.now() - (1000 * 60 * 60 * 24 * 2)).toMillis();
        this.sensorValue = null;
        this.dateStamp = [];
        this.labelsY = ['0', '150000'];
    }
    ngOnInit() {
        this.activeRoute.queryParams.pipe(Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__["untilDestroyed"])(this)).subscribe(params => {
            this.sensorId = params['sensorID'];
            this.sensorId = this.sensorsSvc.selectedSensor;
            console.log(`[D3SensorCmp->ngOnInit()] :: sensor: ${this.sensorId}`);
        });
    }
    ngAfterViewInit() {
        const { from, to } = this.dateRange.value;
        this.fromTimestamp = firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore.Timestamp.fromDate(new Date(to.toUtcNativeDate())).toMillis();
        this.toTimestamp = firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore.Timestamp.fromDate(new Date(from.toUtcNativeDate())).toMillis();
    }
    startGetSensorData() {
        // combineLatest([
        //   this.sensorsSvc.getSensorFirstValTime(this.sensorId),
        //   this.sensorsSvc.getSensorLastValTime(this.sensorId)
        // ])
        //   .subscribe(([first, last]) => this.fullSensorDateRange = [first, last]);
        this.loadingState = 'loading';
        this.sensorsSvc.getAllSensorData(this.sensorId, { startAt: this.fromTimestamp, endAt: this.toTimestamp })
            .pipe(Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__["untilDestroyed"])(this), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((values) => {
            const times = values.map(val => val.timestamp);
            const vals = [...values.map(value => value.AirQuality)];
            return { times, vals };
        })
        // take(1)
        )
            .subscribe(({ times, vals }) => {
            let chartApi = generateChart({ bindto: 'chart', columns: getDataArray(vals) });
            this.sensorValue = chartApi;
            let minMaxDates = [new Date(Math.min(...times)), new Date(Math.max(...times))];
            this.dateStamp = minMaxDates;
            this.loadingState = 'processed';
        });
    }
    getHeight(max) {
        return (max / Object(_taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__["ceil"])(max, -3)) * 100;
    }
    getRange(range) {
        const { from, to } = range;
        this.fromTimestamp = firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore.Timestamp.fromDate(new Date(from.toUtcNativeDate())).toMillis();
        this.toTimestamp = firebase__WEBPACK_IMPORTED_MODULE_3__["default"].firestore.Timestamp.fromDate(new Date(to.toUtcNativeDate())).toMillis();
    }
};
D3SensorComponent.ɵfac = function D3SensorComponent_Factory(t) { return new (t || D3SensorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_services_sensors_service__WEBPACK_IMPORTED_MODULE_10__["SensorsService"])); };
D3SensorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: D3SensorComponent, selectors: [["app-d3-sensor"]], viewQuery: function D3SensorComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__["TuiCalendarRangeComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.dateRange = _t.first);
    } }, inputs: { sensorId: "sensorId" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵProvidersFeature"]([
            {
                provide: _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__["TUI_CALENDAR_DATA_STREAM"],
                useValue: calendarStream$,
            },
        ])], decls: 9, vars: 2, consts: [[1, "tui-row", "tui-space_top-3"], [1, "tui-col_8", "tui-col-offset_1"], [3, "items", "rangeChange"], [1, "tui-col_2", "tui-col-offset_1"], ["tuiButton", "", 1, "tui-space_right-3", "tui-space_bottom-3", 3, "click"], [1, "tui-row", "tui-space_top-3", "d3-chart"], [1, "tui-col-10", "tui-col-offset_1"], ["id", "chart"]], template: function D3SensorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "tui-calendar-range", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("rangeChange", function D3SensorComponent_Template_tui_calendar_range_rangeChange_2_listener($event) { return ctx.getRange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function D3SensorComponent_Template_button_click_4_listener() { return ctx.startGetSensorData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("items", ctx.calItems);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.sensorBtnTitle);
    } }, directives: [_taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__["TuiCalendarRangeComponent"], _taiga_ui_core__WEBPACK_IMPORTED_MODULE_11__["TuiButtonComponent"]], styles: [".c3[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{font:10px sans-serif;-webkit-tap-highlight-color:transparent}.c3[_ngcontent-%COMP%]   line[_ngcontent-%COMP%], .c3[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{fill:none;stroke:#000}.c3[_ngcontent-%COMP%]   text[_ngcontent-%COMP%]{-webkit-user-select:none;user-select:none}.c3-bars[_ngcontent-%COMP%]   path[_ngcontent-%COMP%], .c3-event-rect[_ngcontent-%COMP%], .c3-legend-item-tile[_ngcontent-%COMP%], .c3-xgrid-focus[_ngcontent-%COMP%], .c3-ygrid[_ngcontent-%COMP%]{shape-rendering:crispEdges}.c3-chart-arc[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{stroke:#fff}.c3-chart-arc[_ngcontent-%COMP%]   rect[_ngcontent-%COMP%]{stroke:#fff;stroke-width:1}.c3-chart-arc[_ngcontent-%COMP%]   text[_ngcontent-%COMP%]{fill:#fff;font-size:13px}.c3-grid[_ngcontent-%COMP%]   line[_ngcontent-%COMP%]{stroke:#aaa}.c3-grid[_ngcontent-%COMP%]   text[_ngcontent-%COMP%]{fill:#aaa}.c3-xgrid[_ngcontent-%COMP%], .c3-ygrid[_ngcontent-%COMP%]{stroke-dasharray:3 3}.c3-text.c3-empty[_ngcontent-%COMP%]{fill:grey;font-size:2em}.c3-line[_ngcontent-%COMP%]{stroke-width:1px}.c3-circle[_ngcontent-%COMP%]{fill:currentColor}.c3-circle._expanded_[_ngcontent-%COMP%]{stroke-width:1px;stroke:#fff}.c3-selected-circle[_ngcontent-%COMP%]{fill:#fff;stroke-width:2px}.c3-bar[_ngcontent-%COMP%]{stroke-width:0}.c3-bar._expanded_[_ngcontent-%COMP%]{fill-opacity:1;fill-opacity:.75}.c3-target.c3-focused[_ngcontent-%COMP%]{opacity:1}.c3-target.c3-focused[_ngcontent-%COMP%]   path.c3-line[_ngcontent-%COMP%], .c3-target.c3-focused[_ngcontent-%COMP%]   path.c3-step[_ngcontent-%COMP%]{stroke-width:2px}.c3-target.c3-defocused[_ngcontent-%COMP%]{opacity:.3!important}.c3-region[_ngcontent-%COMP%]{fill:#4682b4;fill-opacity:.1}.c3-region[_ngcontent-%COMP%]   text[_ngcontent-%COMP%]{fill-opacity:1}.c3-brush[_ngcontent-%COMP%]   .extent[_ngcontent-%COMP%]{fill-opacity:.1}.c3-legend-item[_ngcontent-%COMP%]{font-size:12px}.c3-legend-item-hidden[_ngcontent-%COMP%]{opacity:.15}.c3-legend-background[_ngcontent-%COMP%]{opacity:.75;fill:#fff;stroke:#d3d3d3;stroke-width:1}.c3-title[_ngcontent-%COMP%]{font:14px sans-serif}.c3-tooltip-container[_ngcontent-%COMP%]{z-index:10}.c3-tooltip[_ngcontent-%COMP%]{border-collapse:collapse;border-spacing:0;background-color:#fff;empty-cells:show;box-shadow:7px 7px 12px -9px #777;opacity:.9}.c3-tooltip[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{border:1px solid #ccc}.c3-tooltip[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#aaa;font-size:14px;padding:2px 5px;text-align:left;color:#fff}.c3-tooltip[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:13px;padding:3px 6px;background-color:#fff;border-left:1px dotted #999}.c3-tooltip[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{display:inline-block;width:10px;height:10px;margin-right:6px}.c3-tooltip[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{text-align:right}.c3-area[_ngcontent-%COMP%]{stroke-width:0;opacity:.2}.c3-chart-arcs-title[_ngcontent-%COMP%]{dominant-baseline:middle;font-size:1.3em}.c3-chart-arcs[_ngcontent-%COMP%]   .c3-chart-arcs-background[_ngcontent-%COMP%]{fill:#e0e0e0;stroke:#fff}.c3-chart-arcs[_ngcontent-%COMP%]   .c3-chart-arcs-gauge-unit[_ngcontent-%COMP%]{fill:#000;font-size:16px}.c3-chart-arcs[_ngcontent-%COMP%]   .c3-chart-arcs-gauge-max[_ngcontent-%COMP%]{fill:#777}.c3-chart-arcs[_ngcontent-%COMP%]   .c3-chart-arcs-gauge-min[_ngcontent-%COMP%]{fill:#777}.c3-chart-arc[_ngcontent-%COMP%]   .c3-gauge-value[_ngcontent-%COMP%]{fill:#000}.c3-chart-arc.c3-target[_ngcontent-%COMP%]   g[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{opacity:1}.c3-chart-arc.c3-target.c3-focused[_ngcontent-%COMP%]   g[_ngcontent-%COMP%]   path[_ngcontent-%COMP%]{opacity:1}.c3-drag-zoom.enabled[_ngcontent-%COMP%]{pointer-events:all!important;visibility:visible}.c3-drag-zoom.disabled[_ngcontent-%COMP%]{pointer-events:none!important;visibility:hidden}.c3-drag-zoom[_ngcontent-%COMP%]   .extent[_ngcontent-%COMP%]{fill-opacity:.1}.d3-chart[_ngcontent-%COMP%] {\n  min-height: 30vh;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jMy9jMy5taW4uY3NzIiwiLi5cXC4uXFwuLlxcLi5cXC4uXFxkMy1zZW5zb3IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsUUFBUSxvQkFBb0IsQ0FBQyx1Q0FBdUMsQ0FBQyxrQkFBa0IsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLHdCQUF3QixDQUF1QixnQkFBZ0IsQ0FBQyw0RUFBNEUsMEJBQTBCLENBQUMsbUJBQW1CLFdBQVcsQ0FBQyxtQkFBbUIsV0FBVyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsU0FBUyxDQUFDLGNBQWMsQ0FBQyxjQUFjLFdBQVcsQ0FBQyxjQUFjLFNBQVMsQ0FBQyxvQkFBb0Isb0JBQW9CLENBQUMsa0JBQWtCLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxnQkFBZ0IsQ0FBQyxXQUFXLGlCQUFpQixDQUFDLHNCQUFzQixnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsb0JBQW9CLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLGNBQWMsQ0FBQyxtQkFBbUIsY0FBYyxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixTQUFTLENBQUMsc0VBQXNFLGdCQUFnQixDQUFDLHdCQUF3QixvQkFBb0IsQ0FBQyxXQUFXLFlBQVksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLGNBQWMsQ0FBQyxrQkFBa0IsZUFBZSxDQUFDLGdCQUFnQixjQUFjLENBQUMsdUJBQXVCLFdBQVcsQ0FBQyxzQkFBc0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFVBQVUsb0JBQW9CLENBQUMsc0JBQXNCLFVBQVUsQ0FBQyxZQUFZLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFrRixpQ0FBaUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxxQkFBcUIsQ0FBQyxlQUFlLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxlQUFlLGNBQWMsQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsMkJBQTJCLENBQUMsb0JBQW9CLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLGdCQUFnQixDQUFDLFNBQVMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsd0JBQXdCLENBQUMsZUFBZSxDQUFDLHlDQUF5QyxZQUFZLENBQUMsV0FBVyxDQUFDLHlDQUF5QyxTQUFTLENBQUMsY0FBYyxDQUFDLHdDQUF3QyxTQUFTLENBQUMsd0NBQXdDLFNBQVMsQ0FBQyw4QkFBOEIsU0FBUyxDQUFDLCtCQUErQixTQUFTLENBQUMsMENBQTBDLFNBQVMsQ0FBQyxzQkFBc0IsNEJBQTRCLENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixlQUFlLENDRTM0RTtFQUNFLGdCQUFBO0FBQUYiLCJmaWxlIjoiZDMtc2Vuc29yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmMzIHN2Z3tmb250OjEwcHggc2Fucy1zZXJpZjstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnR9LmMzIGxpbmUsLmMzIHBhdGh7ZmlsbDpub25lO3N0cm9rZTojMDAwfS5jMyB0ZXh0ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uYzMtYmFycyBwYXRoLC5jMy1ldmVudC1yZWN0LC5jMy1sZWdlbmQtaXRlbS10aWxlLC5jMy14Z3JpZC1mb2N1cywuYzMteWdyaWR7c2hhcGUtcmVuZGVyaW5nOmNyaXNwRWRnZXN9LmMzLWNoYXJ0LWFyYyBwYXRoe3N0cm9rZTojZmZmfS5jMy1jaGFydC1hcmMgcmVjdHtzdHJva2U6I2ZmZjtzdHJva2Utd2lkdGg6MX0uYzMtY2hhcnQtYXJjIHRleHR7ZmlsbDojZmZmO2ZvbnQtc2l6ZToxM3B4fS5jMy1ncmlkIGxpbmV7c3Ryb2tlOiNhYWF9LmMzLWdyaWQgdGV4dHtmaWxsOiNhYWF9LmMzLXhncmlkLC5jMy15Z3JpZHtzdHJva2UtZGFzaGFycmF5OjMgM30uYzMtdGV4dC5jMy1lbXB0eXtmaWxsOmdyZXk7Zm9udC1zaXplOjJlbX0uYzMtbGluZXtzdHJva2Utd2lkdGg6MXB4fS5jMy1jaXJjbGV7ZmlsbDpjdXJyZW50Q29sb3J9LmMzLWNpcmNsZS5fZXhwYW5kZWRfe3N0cm9rZS13aWR0aDoxcHg7c3Ryb2tlOiNmZmZ9LmMzLXNlbGVjdGVkLWNpcmNsZXtmaWxsOiNmZmY7c3Ryb2tlLXdpZHRoOjJweH0uYzMtYmFye3N0cm9rZS13aWR0aDowfS5jMy1iYXIuX2V4cGFuZGVkX3tmaWxsLW9wYWNpdHk6MTtmaWxsLW9wYWNpdHk6Ljc1fS5jMy10YXJnZXQuYzMtZm9jdXNlZHtvcGFjaXR5OjF9LmMzLXRhcmdldC5jMy1mb2N1c2VkIHBhdGguYzMtbGluZSwuYzMtdGFyZ2V0LmMzLWZvY3VzZWQgcGF0aC5jMy1zdGVwe3N0cm9rZS13aWR0aDoycHh9LmMzLXRhcmdldC5jMy1kZWZvY3VzZWR7b3BhY2l0eTouMyFpbXBvcnRhbnR9LmMzLXJlZ2lvbntmaWxsOiM0NjgyYjQ7ZmlsbC1vcGFjaXR5Oi4xfS5jMy1yZWdpb24gdGV4dHtmaWxsLW9wYWNpdHk6MX0uYzMtYnJ1c2ggLmV4dGVudHtmaWxsLW9wYWNpdHk6LjF9LmMzLWxlZ2VuZC1pdGVte2ZvbnQtc2l6ZToxMnB4fS5jMy1sZWdlbmQtaXRlbS1oaWRkZW57b3BhY2l0eTouMTV9LmMzLWxlZ2VuZC1iYWNrZ3JvdW5ke29wYWNpdHk6Ljc1O2ZpbGw6I2ZmZjtzdHJva2U6I2QzZDNkMztzdHJva2Utd2lkdGg6MX0uYzMtdGl0bGV7Zm9udDoxNHB4IHNhbnMtc2VyaWZ9LmMzLXRvb2x0aXAtY29udGFpbmVye3otaW5kZXg6MTB9LmMzLXRvb2x0aXB7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO2JvcmRlci1zcGFjaW5nOjA7YmFja2dyb3VuZC1jb2xvcjojZmZmO2VtcHR5LWNlbGxzOnNob3c7LXdlYmtpdC1ib3gtc2hhZG93OjdweCA3cHggMTJweCAtOXB4ICM3Nzc7LW1vei1ib3gtc2hhZG93OjdweCA3cHggMTJweCAtOXB4ICM3Nzc7Ym94LXNoYWRvdzo3cHggN3B4IDEycHggLTlweCAjNzc3O29wYWNpdHk6Ljl9LmMzLXRvb2x0aXAgdHJ7Ym9yZGVyOjFweCBzb2xpZCAjY2NjfS5jMy10b29sdGlwIHRoe2JhY2tncm91bmQtY29sb3I6I2FhYTtmb250LXNpemU6MTRweDtwYWRkaW5nOjJweCA1cHg7dGV4dC1hbGlnbjpsZWZ0O2NvbG9yOiNmZmZ9LmMzLXRvb2x0aXAgdGR7Zm9udC1zaXplOjEzcHg7cGFkZGluZzozcHggNnB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItbGVmdDoxcHggZG90dGVkICM5OTl9LmMzLXRvb2x0aXAgdGQ+c3BhbntkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMHB4O2hlaWdodDoxMHB4O21hcmdpbi1yaWdodDo2cHh9LmMzLXRvb2x0aXAgLnZhbHVle3RleHQtYWxpZ246cmlnaHR9LmMzLWFyZWF7c3Ryb2tlLXdpZHRoOjA7b3BhY2l0eTouMn0uYzMtY2hhcnQtYXJjcy10aXRsZXtkb21pbmFudC1iYXNlbGluZTptaWRkbGU7Zm9udC1zaXplOjEuM2VtfS5jMy1jaGFydC1hcmNzIC5jMy1jaGFydC1hcmNzLWJhY2tncm91bmR7ZmlsbDojZTBlMGUwO3N0cm9rZTojZmZmfS5jMy1jaGFydC1hcmNzIC5jMy1jaGFydC1hcmNzLWdhdWdlLXVuaXR7ZmlsbDojMDAwO2ZvbnQtc2l6ZToxNnB4fS5jMy1jaGFydC1hcmNzIC5jMy1jaGFydC1hcmNzLWdhdWdlLW1heHtmaWxsOiM3Nzd9LmMzLWNoYXJ0LWFyY3MgLmMzLWNoYXJ0LWFyY3MtZ2F1Z2UtbWlue2ZpbGw6Izc3N30uYzMtY2hhcnQtYXJjIC5jMy1nYXVnZS12YWx1ZXtmaWxsOiMwMDB9LmMzLWNoYXJ0LWFyYy5jMy10YXJnZXQgZyBwYXRoe29wYWNpdHk6MX0uYzMtY2hhcnQtYXJjLmMzLXRhcmdldC5jMy1mb2N1c2VkIGcgcGF0aHtvcGFjaXR5OjF9LmMzLWRyYWctem9vbS5lbmFibGVke3BvaW50ZXItZXZlbnRzOmFsbCFpbXBvcnRhbnQ7dmlzaWJpbGl0eTp2aXNpYmxlfS5jMy1kcmFnLXpvb20uZGlzYWJsZWR7cG9pbnRlci1ldmVudHM6bm9uZSFpbXBvcnRhbnQ7dmlzaWJpbGl0eTpoaWRkZW59LmMzLWRyYWctem9vbSAuZXh0ZW50e2ZpbGwtb3BhY2l0eTouMX0iLCJAaW1wb3J0IFwifmMzL2MzLm1pbi5jc3NcIjtcclxuXHJcbi5kMy1jaGFydCB7XHJcbiAgbWluLWhlaWdodDogMzB2aDtcclxufVxyXG4iXX0= */"] });
D3SensorComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_4__["UntilDestroy"])()
], D3SensorComponent);

const getDataArray = (data) => {
    if (!!!(data === null || data === void 0 ? void 0 : data.length))
        return [];
    const sensorTypes = Object.keys(data[0]);
    let results = sensorTypes.map((sensorKey, i) => [sensorKey]);
    results = data.reduce((accu, next) => {
        for (let item of accu) {
            for (let key in next) {
                if (key == item[0]) {
                    item.push(next[key]);
                }
            }
        }
        return accu;
    }, [...results]);
    return results;
};
const generateChart = ({ bindto, columns }) => {
    const opts = {
        bindto: '#chart',
        data: {
            columns
        }
    };
    let chartData = Object(c3__WEBPACK_IMPORTED_MODULE_7__["generate"])(opts);
    return chartData;
};


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyAl_miXHGEsZGKgeRJFwqlSOowX951WqEE",
        authDomain: "airappsora.firebaseapp.com",
        databaseURL: "https://airappsora.firebaseio.com",
        projectId: "airappsora",
        storageBucket: "airappsora.appspot.com",
        messagingSenderId: "291294931192",
        appId: "1:291294931192:web:305a6acc75c9579792b30d",
        measurementId: "G-J85G113BP7"
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "DWOX":
/*!************************************************************!*\
  !*** ./src/app/shared/components/login/login.component.ts ***!
  \************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @taiga-ui/kit */ "fqsm");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");







class LoginComponent {
    constructor(authSvc, router) {
        this.authSvc = authSvc;
        this.router = router;
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({
            nameValue: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].minLength(2), _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].email]),
            passwordValue: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].minLength(2)]),
        });
    }
    ngOnInit() {
    }
    logIn() {
        const { nameValue: email, passwordValue: password } = this.loginForm.value;
        this.authSvc.logIn({ email, password }).subscribe(user => {
            if (user) {
                this.router.navigateByUrl('/sensors');
            }
            else {
                this.router.navigateByUrl('/');
            }
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 26, vars: 2, consts: [[1, "tui-container"], [3, "formGroup"], [1, "tui-row", "tui-row_sme"], [1, "tui-col_8"], [1, "tui-form__header", "tui-form__header_margin-top_none"], [1, "tui-form__row"], ["tuiTextfieldExampleText", "Field placeholder", "formControlName", "nameValue", "tuiHintContent", "test01@test.com"], [1, "tui-required"], [1, "tui-form__field-note"], ["formControlName", "nameValue"], [1, "tui-form__row", "tui-form__row_multi-fields"], [1, "tui-form__multi-field"], ["formControlName", "passwordValue", "tuiHintContent", "test01"], ["formControlName", "passwordValue"], [1, "tui-form__header", "tui-form__header_margin-bottom_small"], [1, "tui-form__header"], [1, "tui-form__buttons"], ["tuiButton", "", "size", "l", "type", "submit", 1, "tui-form__button", 3, "disabled", "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "h3", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " Log in to your account ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "tui-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "test01@test.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "tui-field-error", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "tui-input-password", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, " Password ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "test01");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "tui-field-error", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "h3", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "h3", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_24_listener() { return ctx.logIn(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, " Log In ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.loginForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.loginForm.valid);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFieldErrorComponent"], _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPasswordComponent"], _taiga_ui_core__WEBPACK_IMPORTED_MODULE_5__["TuiButtonComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ "IFhZ":
/*!*************************************************!*\
  !*** ./src/app/shared/shared.modules.module.ts ***!
  \*************************************************/
/*! exports provided: SharedModulesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModulesModule", function() { return SharedModulesModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @taiga-ui/addon-charts */ "vSuC");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @taiga-ui/kit */ "fqsm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "8Y7J");







class SharedModulesModule {
}
SharedModulesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: SharedModulesModule });
SharedModulesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ factory: function SharedModulesModule_Factory(t) { return new (t || SharedModulesModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiModeModule"],
            _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiBarChartModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiButtonModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiLabelModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiSvgModule"],
            _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiAxesModule"],
            _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiBarModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiActionModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiAvatarModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBadgedContentModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBadgeModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBreadcrumbsModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCalendarMonthModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCalendarRangeModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxBlockModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxLabeledModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiComboBoxModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiDataListWrapperModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiDropdownSelectionModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFieldErrorModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFilterModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiHighlightModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputCopyModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputCountModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateRangeModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateTimeModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputFileModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputInlineModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputMonthModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputMonthRangeModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputNumberModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPasswordModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPhoneInternationalModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPhoneModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputRangeModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputSliderModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputTagModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputTimeModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiIslandModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiLazyLoadingModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiLineClampModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiMarkerIconModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiMultiSelectModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiPaginationModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiPresentModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioBlockModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioLabeledModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioListModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiSelectModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiSliderModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiStepperModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTabsModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTagModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTextAreaModule"],
            _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiToggleModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiLoaderModule"]
        ], _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiModeModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiBarChartModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiButtonModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiLabelModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiSvgModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiAxesModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiBarModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiActionModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiAvatarModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBadgedContentModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBadgeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBreadcrumbsModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCalendarMonthModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCalendarRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxBlockModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxLabeledModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiComboBoxModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiDataListWrapperModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiDropdownSelectionModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFieldErrorModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFilterModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiHighlightModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputCopyModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputCountModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateTimeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputFileModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputInlineModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputMonthModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputMonthRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputNumberModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPasswordModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPhoneInternationalModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPhoneModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputSliderModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputTagModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputTimeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiIslandModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiLazyLoadingModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiLineClampModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiMarkerIconModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiMultiSelectModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiPaginationModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiPresentModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioBlockModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioLabeledModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioListModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiSelectModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiSliderModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiStepperModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTabsModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTagModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTextAreaModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiLoaderModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](SharedModulesModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiModeModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiBarChartModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiButtonModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiLabelModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiSvgModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiAxesModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiBarModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiActionModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiAvatarModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBadgedContentModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBadgeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBreadcrumbsModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCalendarMonthModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCalendarRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxBlockModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxLabeledModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiComboBoxModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiDataListWrapperModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiDropdownSelectionModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFieldErrorModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFilterModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiHighlightModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputCopyModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputCountModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateTimeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputFileModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputInlineModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputMonthModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputMonthRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputNumberModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPasswordModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPhoneInternationalModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPhoneModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputSliderModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputTagModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputTimeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiIslandModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiLazyLoadingModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiLineClampModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiMarkerIconModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiMultiSelectModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiPaginationModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiPresentModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioBlockModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioLabeledModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioListModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiSelectModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiSliderModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiStepperModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTabsModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTagModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTextAreaModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiToggleModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiLoaderModule"]], exports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiModeModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiBarChartModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiButtonModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiLabelModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiSvgModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiAxesModule"],
        _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_2__["TuiBarModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiActionModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiAvatarModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBadgedContentModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBadgeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiBreadcrumbsModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCalendarMonthModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCalendarRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxBlockModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxLabeledModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiCheckboxModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiComboBoxModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiDataListWrapperModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiDropdownSelectionModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFieldErrorModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiFilterModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiHighlightModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputCopyModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputCountModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputDateTimeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputFileModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputInlineModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputMonthModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputMonthRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputNumberModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPasswordModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPhoneInternationalModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputPhoneModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputRangeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputSliderModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputTagModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiInputTimeModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiIslandModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiLazyLoadingModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiLineClampModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiMarkerIconModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiMultiSelectModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiPaginationModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiPresentModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioBlockModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioLabeledModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioListModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiRadioModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiSelectModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiSliderModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiStepperModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTabsModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTagModule"],
        _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_4__["TuiTextAreaModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_3__["TuiLoaderModule"]] }); })();


/***/ }),

/***/ "LS6v":
/*!****************************************!*\
  !*** ./src/app/auth/auth.component.ts ***!
  \****************************************/
/*! exports provided: AuthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthComponent", function() { return AuthComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _shared_components_login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/components/login/login.component */ "DWOX");


class AuthComponent {
    constructor() { }
    ngOnInit() {
    }
}
AuthComponent.ɵfac = function AuthComponent_Factory(t) { return new (t || AuthComponent)(); };
AuthComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthComponent, selectors: [["app-auth"]], decls: 1, vars: 0, template: function AuthComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-login");
    } }, directives: [_shared_components_login_login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdXRoLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "Nm2m":
/*!**************************************!*\
  !*** ./src/app/app/app.component.ts ***!
  \**************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");
/* harmony import */ var _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/components/header/header.component */ "aZ8m");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "iInd");




const sensor = 'testfcf5c42aff80';
class AppComponent {
    constructor() {
        this.title = 'fbTestApp';
        // this.getData();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tui-root");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_taiga_ui_core__WEBPACK_IMPORTED_MODULE_1__["TuiRootComponent"], _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "PCNd":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/login/login.component */ "DWOX");
/* harmony import */ var _components_choose_sensor_choose_sensor_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/choose-sensor/choose-sensor.component */ "QIIY");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/header/header.component */ "aZ8m");
/* harmony import */ var _shared_modules_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared.modules.module */ "IFhZ");
/* harmony import */ var _components_tui_sensor_tui_sensor_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/tui-sensor/tui-sensor.component */ "qnSI");
/* harmony import */ var _components_d3_sensor_d3_sensor_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/d3-sensor/d3-sensor.component */ "AgfE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "8Y7J");







class SharedModule {
}
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ factory: function SharedModule_Factory(t) { return new (t || SharedModule)(); }, imports: [[
            _shared_modules_module__WEBPACK_IMPORTED_MODULE_3__["SharedModulesModule"]
        ], _shared_modules_module__WEBPACK_IMPORTED_MODULE_3__["SharedModulesModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_components_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"],
        _components_choose_sensor_choose_sensor_component__WEBPACK_IMPORTED_MODULE_1__["ChooseSensorComponent"],
        _components_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"],
        _components_tui_sensor_tui_sensor_component__WEBPACK_IMPORTED_MODULE_4__["TuiSensorComponent"],
        _components_d3_sensor_d3_sensor_component__WEBPACK_IMPORTED_MODULE_5__["D3SensorComponent"]], imports: [_shared_modules_module__WEBPACK_IMPORTED_MODULE_3__["SharedModulesModule"]], exports: [_shared_modules_module__WEBPACK_IMPORTED_MODULE_3__["SharedModulesModule"],
        _components_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"],
        _components_choose_sensor_choose_sensor_component__WEBPACK_IMPORTED_MODULE_1__["ChooseSensorComponent"],
        _components_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"],
        _components_tui_sensor_tui_sensor_component__WEBPACK_IMPORTED_MODULE_4__["TuiSensorComponent"],
        _components_d3_sensor_d3_sensor_component__WEBPACK_IMPORTED_MODULE_5__["D3SensorComponent"]] }); })();


/***/ }),

/***/ "QIIY":
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/choose-sensor/choose-sensor.component.ts ***!
  \****************************************************************************/
/*! exports provided: ChooseSensorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseSensorComponent", function() { return ChooseSensorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _models___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/ */ "TwVa");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var src_app_services_sensors_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/sensors.service */ "p95a");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @taiga-ui/kit */ "fqsm");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");









function ChooseSensorComponent_tui_data_list_wrapper_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tui-data-list-wrapper", 11);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("items", ctx_r0.items);
} }
class ChooseSensorComponent {
    constructor(router, sensorSvc) {
        this.router = router;
        this.sensorSvc = sensorSvc;
        this.sensorIdSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.sensorBtnTitle = 'Start getting Data';
        this.fullSensorDateRange = [];
        this.items = [
            _models___WEBPACK_IMPORTED_MODULE_2__["testSensorId"],
        ];
        this.selectedSensorId = null;
    }
    ;
    ngOnInit() {
        this.sensorSelectForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            sensor: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.items[0], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
        });
    }
    sensorSelected(sensorId) {
        console.log('Sensor Selected: ', sensorId);
        this.selectedSensorId = sensorId;
    }
    navigateToSensor() {
        if (this.sensorSelectForm.valid && !!this.sensorSelectForm.value) {
            const sensorVal = this.sensorSelectForm.get('sensor').value;
            console.log({ sensorVal });
            this.sensorIdSelected.emit(sensorVal);
            this.sensorSvc.setSelectedSensor(sensorVal);
            this.router.navigate(['sensors', sensorVal]);
        }
    }
}
ChooseSensorComponent.ɵfac = function ChooseSensorComponent_Factory(t) { return new (t || ChooseSensorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_sensors_service__WEBPACK_IMPORTED_MODULE_4__["SensorsService"])); };
ChooseSensorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChooseSensorComponent, selectors: [["app-choose-sensor"]], outputs: { sensorIdSelected: "sensorIdSelected" }, decls: 13, vars: 1, consts: [[1, "tui-container"], [3, "formGroup"], [1, "tui-row", "tui-row_sme"], [1, "tui-col_8"], [1, "tui-form__header", "tui-form__header_margin-top_none"], [1, "tui-form__row", "tui-form__row_multi-fields"], [1, "tui-form__multi-field"], ["tuiTextfieldSize", "s", "formControlName", "sensor"], [3, "items", 4, "tuiDataList"], [1, "tui-form__buttons"], ["tuiButton", "", "size", "l", 1, "tui-form__button", 3, "click"], [3, "items"]], template: function ChooseSensorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Select a sensor to track ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "tui-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ChooseSensorComponent_tui_data_list_wrapper_9_Template, 1, 1, "tui-data-list-wrapper", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChooseSensorComponent_Template_button_click_11_listener() { return ctx.navigateToSensor(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " SELECT ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.sensorSelectForm);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__["TuiSelectComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _taiga_ui_core__WEBPACK_IMPORTED_MODULE_6__["TuiButtonComponent"], _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_5__["TuiDataListWrapperComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaG9vc2Utc2Vuc29yLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ "TR/i":
/*!**********************************************************!*\
  !*** ./src/app/shared/models/sensor-indication.model.ts ***!
  \**********************************************************/
/*! exports provided: testSensorId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testSensorId", function() { return testSensorId; });
const testSensorId = 'testfcf5c42aff80';


/***/ }),

/***/ "TwVa":
/*!****************************************!*\
  !*** ./src/app/shared/models/index.ts ***!
  \****************************************/
/*! exports provided: testSensorId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sensor_indication_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sensor-indication.model */ "TR/i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "testSensorId", function() { return _sensor_indication_model__WEBPACK_IMPORTED_MODULE_0__["testSensorId"]; });




/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "omvX");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire */ "jmUF");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");
/* harmony import */ var ngx_date_fns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-date-fns */ "xavc");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../environments/environment */ "AytR");
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app/app.component */ "Nm2m");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/shared.module */ "PCNd");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _auth_auth_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/auth.component */ "LS6v");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "8Y7J");














class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
            _taiga_ui_core__WEBPACK_IMPORTED_MODULE_4__["TuiRootModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"],
            ngx_date_fns__WEBPACK_IMPORTED_MODULE_5__["DateFnsModule"].forRoot(),
            _angular_fire__WEBPACK_IMPORTED_MODULE_3__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].firebaseConfig)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
        _auth_auth_component__WEBPACK_IMPORTED_MODULE_10__["AuthComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
        _taiga_ui_core__WEBPACK_IMPORTED_MODULE_4__["TuiRootModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"], ngx_date_fns__WEBPACK_IMPORTED_MODULE_5__["DateFnsModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_3__["AngularFireModule"]] }); })();


/***/ }),

/***/ "aZ8m":
/*!**************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngneat/until-destroy */ "3bzS");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "VRCc");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "SVse");








function HeaderComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeaderComponent_div_4_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r4.logOut(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " logout ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Hello, \u00A0 ", user_r3.email, "");
} }
function HeaderComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function HeaderComponent_ng_template_6_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r6.logIn(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " login ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
let HeaderComponent = class HeaderComponent {
    constructor(auth, router, authSvc) {
        this.auth = auth;
        this.router = router;
        this.authSvc = authSvc;
    }
    // avatar = 'https://ng-web-apis.github.io/dist/assets/images/web-api.svg';
    ngOnInit() { }
    logOut() {
        this.authSvc.logOut().pipe(Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_1__["untilDestroyed"])(this)).subscribe(_ => this.router.navigateByUrl('/'));
    }
    logIn() {
        this.router.navigateByUrl('/auth');
    }
};
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 8, vars: 4, consts: [["tuiMode", "onDark", 1, "wrapper"], [1, "tui-text_h3", "title"], [1, "divider"], ["class", "auth-container", 4, "ngIf", "ngIfElse"], ["showLogin", ""], [1, "auth-container"], ["tuiIconButton", "", "type", "button", 1, "tui-space_right-3", "tui-space_left-3", 3, "click"], [1, "material-icons"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Sensor Tracker");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, HeaderComponent_div_4_Template, 6, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, HeaderComponent_ng_template_6_Template, 3, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 2, ctx.auth.user))("ngIfElse", _r1);
    } }, directives: [_taiga_ui_core__WEBPACK_IMPORTED_MODULE_6__["TuiModeDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _taiga_ui_core__WEBPACK_IMPORTED_MODULE_6__["TuiButtonComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  position: relative;\n  display: block;\n  margin-bottom: 1rem;\n  background: rgba(53, 5, 97, 0.45);\n}\n\n.wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 0.8rem;\n  align-items: center;\n  justify-content: center;\n  justify-items: center;\n}\n\n.divider[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.content[_ngcontent-%COMP%] {\n  padding: 32px;\n}\n\n.title[_ngcontent-%COMP%] {\n  min-width: 250px;\n  margin: 0;\n  color: #b00;\n  text-shadow: 2px 2px 2px #b1c;\n  pointer-events: none;\n}\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcaGVhZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQ0FBQTtBQURGOztBQUlBO0VBRUUsYUFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7QUFGRjs7QUFLQTtFQUNFLE9BQUE7QUFGRjs7QUFLQTtFQUNFLGFBQUE7QUFGRjs7QUFLQTtFQUNFLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSw2QkFBQTtFQUNBLG9CQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFGRiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAaW1wb3J0IFwidGFpZ2EtdWktbG9jYWxcIjtcclxuXHJcbjpob3N0IHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDUzLCA1LCA5NywgMC40NSk7XHJcbn1cclxuXHJcbi53cmFwcGVyIHtcclxuICAvLyAuaW5zZXQtYm9yZGVyKGJvdHRvbSwgbGlnaHQpO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgcGFkZGluZzogMC44cmVtO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZGl2aWRlciB7XHJcbiAgZmxleDogMTtcclxufVxyXG5cclxuLmNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDMycHg7XHJcbn1cclxuXHJcbi50aXRsZSB7XHJcbiAgbWluLXdpZHRoOiAyNTBweDtcclxuICBtYXJnaW46IDA7XHJcbiAgY29sb3I6ICNiMDA7XHJcbiAgdGV4dC1zaGFkb3c6IDJweCAycHggMnB4ICNiMWM7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuXHJcbi5hdXRoLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG59XHJcbiJdfQ== */"] });
HeaderComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_1__["UntilDestroy"])()
], HeaderComponent);



/***/ }),

/***/ "ajt+":
/*!****************************************!*\
  !*** ./src/app/services/db.service.ts ***!
  \****************************************/
/*! exports provided: DbService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DbService", function() { return DbService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/database */ "bSaC");





class DbService {
    constructor(fDb) {
        this.fDb = fDb;
    }
    listSnapshots({ path, query, snapEvents } = { path: '', query: null, snapEvents: ['child_added', 'child_removed'] }) {
        return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"]((inner) => {
            const events = snapEvents;
            this.fDb.list(path, query).snapshotChanges(events).pipe(
            // shareReplay({ bufferSize: 1, refCount: true, windowTime: 300 }),
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["concatMap"])((vals) => {
                let chats = vals.map(val => val.payload.exists() && val.payload.val());
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(chats);
            }), 
            // tap(vals => console.log(`[dbSvc->listSnapshots()] :: new snapshot ${JSON.stringify(vals)}`)),
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((err) => {
                console.error(`[DbService->listSnapshots()] ::::::::   ${JSON.stringify(err)}`);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(null);
            })).subscribe(val => inner.next(val), err => inner.error(err), () => inner.complete());
        });
    }
    list({ path, dateRange, snapEvents, reducingFn } = {
        path: '',
        dateRange: null,
        snapEvents: ['child_added'],
        reducingFn: null
    }) {
        const events = snapEvents;
        return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](inner => {
            const sensorDataRef = this.fDb.object(path).query.ref;
            const startAT = dateRange.startAt || (Date.now() - 1000 * 60 * 60 * 60 * 24);
            const endAT = dateRange.endAt || Date.now();
            let query = ((ref) => sensorDataRef.orderByChild('timestamp')
                .startAfter(startAT, 'timestamp')
                .endBefore(endAT, 'timestamp'));
            return this.fDb.list(sensorDataRef, query).valueChanges(events, { idField: 'keyID' }).pipe(
            // shareReplay({ bufferSize: 1, refCount: true, windowTime: 300 }),
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(vals => console.log(`[DbSvc->list<T>()] number of Items ::::::::::::::::::::::::::::: ${vals.length} `)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((vals) => {
                if (!reducingFn)
                    return vals;
                return reducingFn(vals);
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(vals => console.log(`[DbSvc->list<T>()] REDUCED number of Items ::::::::::::::::::::::::::::: ${vals.length} `)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((err) => {
                console.error(`[DbService->list()]::::::::   ${JSON.stringify(err)}`);
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(err);
            })).subscribe(val => inner.next(val), err => inner.error(err), () => inner.complete());
        });
    }
    update(path, data) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(this.fDb.object(path).update(data));
    }
    set(path, data) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(this.fDb.object(path).set(data));
    }
    push(path, data) {
        // let pushID = this.fDb.createPushId();
        // data = { ...data, pushID };
        // return from(this.fDb.list<T>(path).push(data)).pipe(map(pushResult => pushResult.toJSON()));
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(this.fDb.database.ref(`${path}`).push(data)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(pushResult => pushResult.toJSON()));
    }
    get(path) {
        let objectRef = this.fDb.database.ref(path);
        objectRef.orderByKey().ref.get().then(object => object.val());
        return this.fDb.object(path).valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((err) => {
            console.error(`[DbService->get()]::::::::   ${JSON.stringify(err)}`);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(err);
        }));
    }
    getFirstOnce(path) {
        // this.fDb.object<T>()
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(new Promise((resolve, reject) => this.fDb.database.ref(path).orderByKey().limitToFirst(1).once('value', snap => resolve(snap.val()))))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(val => Object.values(val)[0]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(_ => console.log(`Get Single value from path ${path} `)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(err => {
            console.error(`[DbService->delete()]::::::::   ${JSON.stringify(err)}`);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(err);
        }));
    }
    getLastOnce(path) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(new Promise((resolve, reject) => this.fDb.database.ref(path).orderByKey().limitToLast(1).once('value', snap => resolve(snap.val()))))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(val => Object.values(val)[0]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(_ => console.log(`Get Single value from path ${path} `)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(err => {
            console.error(`[DbService->delete()]::::::::   ${JSON.stringify(err)}`);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(err);
        }));
    }
    delete(path, keyId) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(this.fDb.list(path, ref => ref.child(keyId)).query.ref.remove()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(_ => console.log(`Removed entry from path ${path} with KeyID :: ${keyId}`)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(err => {
            console.error(`[DbService->delete()]::::::::   ${JSON.stringify(err)}`);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(err);
        }));
    }
    getSnapshot(path) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const item = yield (this.fDb.database.ref(path).once('value'));
            return item.exists() && item.toJSON();
        });
    }
}
DbService.ɵfac = function DbService_Factory(t) { return new (t || DbService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__["AngularFireDatabase"])); };
DbService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: DbService, factory: DbService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "lGQG":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "VRCc");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.service */ "qfBg");





class AuthService {
    constructor(fbAuth, userSvc) {
        this.fbAuth = fbAuth;
        this.userSvc = userSvc;
    }
    logIn({ email, password }) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(this.fbAuth.signInWithEmailAndPassword(email, password)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(userCreds => console.log(`Logged in with User Details ${JSON.stringify(userCreds)}`)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(userCreds => this.userSvc.setCurrentUser(userCreds.user)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(userCreds => !!userCreds.user), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(err => {
            console.error(`[AuthSvc->logIn()]::: ${err}`);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])(err);
        }));
    }
    logOut() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(this.fbAuth.signOut()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(_ => console.log('Signing out...')), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(_ => this.userSvc.setCurrentUser(null)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(err => {
            console.error(`[AuthSvc->logOUT()]::: ${err}`);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["throwError"])(err);
        }));
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "p95a":
/*!*********************************************!*\
  !*** ./src/app/services/sensors.service.ts ***!
  \*********************************************/
/*! exports provided: SensorsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensorsService", function() { return SensorsService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns */ "b/SL");
/* harmony import */ var date_fns_locale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns/locale */ "PSO/");
/* harmony import */ var date_fns_locale__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(date_fns_locale__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _db_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./db.service */ "ajt+");






class SensorsService {
    constructor(dbSvc) {
        this.dbSvc = dbSvc;
        this._selectedSensor$$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    setSelectedSensor(sensorId = null) {
        sensorId && localStorage.setItem('sensorID', sensorId);
        this._selectedSensor$$.next(sensorId);
    }
    get selectedSensor() {
        const id = localStorage.getItem('sensorID');
        if (id)
            this._selectedSensor$$.next(id);
        return this._selectedSensor$$.value;
    }
    getAllSensorData(sensorId, dateRange) {
        console.log({ dateRange });
        const reduceToEvery = (factor = 100) => (items) => items.filter((_, i) => (i % factor == 0));
        const reducingFn = reduceToEvery(1000);
        return this.dbSvc.list({ path: sensorIdPath(sensorId), dateRange, reducingFn }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((data) => data.map((singleVal) => (Object.assign(Object.assign({}, singleVal), { date: Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["toDate"])(singleVal.timestamp), RuDate: date_fns_locale__WEBPACK_IMPORTED_MODULE_2__["ru"].formatLong.dateTime(singleVal.timestamp) })))));
    }
    getSensorFirstVal(sensorId) {
        return this.dbSvc.getFirstOnce(sensorIdPath(sensorId));
    }
    getSensorLastVal(sensorId) {
        return this.dbSvc.getLastOnce(sensorIdPath(sensorId));
    }
    getSensorFirstValTime(sensorId) {
        return this.getSensorFirstVal(sensorId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(sensorRes => Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["toDate"])(sensorRes.timestamp)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(date => console.log('[SensorsSvc->getAllSensorData()]  Sensor first Time ::: ', date)));
    }
    getSensorLastValTime(sensorId) {
        return this.getSensorLastVal(sensorId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(sensorRes => Object(date_fns__WEBPACK_IMPORTED_MODULE_1__["toDate"])(sensorRes.timestamp)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(date => console.log('[SensorsSvc->getAllSensorData()]  Sensor Last Time ::: ', date)));
    }
}
SensorsService.ɵfac = function SensorsService_Factory(t) { return new (t || SensorsService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_db_service__WEBPACK_IMPORTED_MODULE_5__["DbService"])); };
SensorsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: SensorsService, factory: SensorsService.ɵfac, providedIn: 'root' });
const sensorIdPath = (sensorId) => `sensors/${sensorId}`;


/***/ }),

/***/ "qfBg":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");


class UserService {
    constructor() {
        this.currentUser$$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](null);
        this.isLoggedIn$$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](null);
    }
    setCurrentUser(user) {
        this.currentUser$$.next(user);
        this.setLoggedIn(true);
    }
    setLoggedIn(val = false) {
        this.isLoggedIn$$.next(val);
    }
    get isLoggedIn$() {
        return this.isLoggedIn$$.asObservable();
    }
    get currentUser$() {
        return this.currentUser$$.asObservable();
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(); };
UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "qnSI":
/*!**********************************************************************!*\
  !*** ./src/app/shared/components/tui-sensor/tui-sensor.component.ts ***!
  \**********************************************************************/
/*! exports provided: calendarStream$, TuiSensorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calendarStream$", function() { return calendarStream$; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TuiSensorComponent", function() { return TuiSensorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @taiga-ui/cdk */ "ig6K");
/* harmony import */ var _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @taiga-ui/kit */ "fqsm");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngneat/until-destroy */ "3bzS");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase */ "JZFu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var src_app_services_sensors_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/sensors.service */ "p95a");
/* harmony import */ var _taiga_ui_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @taiga-ui/core */ "fHwI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @taiga-ui/addon-charts */ "vSuC");














function TuiSensorComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](0);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" Select Dates Range and start listening sensor ", ctx_r0.sensorId, " ... ");
} }
function TuiSensorComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tui-loader", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("inheritColor", true)("overlay", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" loading data from firebase for sensor ", ctx_r1.sensorId, " ... ");
} }
function TuiSensorComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "tui-axes", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "tui-bar-chart", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("axisXLabels", ctx_r2.dateStamp)("axisYLabels", ctx_r2.labelsY);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("max", 150000)("value", ctx_r2.sensorValue);
} }
const today = new Date();
const [year, month, day] = [today.getFullYear(), today.getMonth(), today.getDay()];
const calendarStream$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(new _taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__["TuiDayRange"](new _taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__["TuiDay"](year, month, day), new _taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__["TuiDay"](year, month, day - 3)));
let TuiSensorComponent = class TuiSensorComponent {
    constructor(activeRoute, sensorsSvc) {
        this.activeRoute = activeRoute;
        this.sensorsSvc = sensorsSvc;
        this.sensorId = '';
        this.calItems = Object(_taiga_ui_kit__WEBPACK_IMPORTED_MODULE_2__["tuiCreateDefaultDayRangePeriods"])();
        this.sensorBtnTitle = 'Start getting Data';
        this.fullSensorDateRange = [];
        this.loadingState = 'stopped';
        this.fromTimestamp = firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.Timestamp.fromMillis(Date.now()).toMillis();
        this.toTimestamp = firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.Timestamp.fromMillis(Date.now() - (1000 * 60 * 60 * 24 * 2)).toMillis();
        this.sensorValue = null;
        this.dateStamp = [];
        this.labelsY = ['0', '150000'];
    }
    ngOnInit() {
        this.activeRoute.queryParams.pipe(Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__["untilDestroyed"])(this)).subscribe(params => {
            this.sensorId = params['sensorID'];
            this.sensorId = this.sensorsSvc.selectedSensor;
            console.log(`[TUISensorCmp->ngOnIni()] :: sensor: ${this.sensorId}`);
        });
    }
    ngAfterViewInit() {
        const { from, to } = this.dateRange.value;
        this.fromTimestamp = firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.Timestamp.fromDate(new Date(to.toUtcNativeDate())).toMillis();
        this.toTimestamp = firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.Timestamp.fromDate(new Date(from.toUtcNativeDate())).toMillis();
    }
    startGetSensorData() {
        // combineLatest([
        //   this.sensorsSvc.getSensorFirstValTime(this.sensorId),
        //   this.sensorsSvc.getSensorLastValTime(this.sensorId)
        // ])
        //   .subscribe(([first, last]) => this.fullSensorDateRange = [first, last]);
        this.loadingState = 'loading';
        this.sensorsSvc.getAllSensorData(this.sensorId, { startAt: this.fromTimestamp, endAt: this.toTimestamp })
            .pipe(Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__["untilDestroyed"])(this), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((values) => {
            const times = values.map(val => val.timestamp);
            const vals = [...values.map(value => value.AirQuality)];
            return { times, vals };
        })
        // take(1)
        )
            .subscribe(({ times, vals }) => {
            this.sensorValue = getDataArray(vals);
            let minMaxDates = [new Date(Math.min(...times)), new Date(Math.max(...times))];
            this.dateStamp = minMaxDates;
            this.loadingState = 'processed';
        });
    }
    getHeight(max) {
        return (max / Object(_taiga_ui_cdk__WEBPACK_IMPORTED_MODULE_1__["ceil"])(max, -3)) * 100;
    }
    getRange(range) {
        const { from, to } = range;
        this.fromTimestamp = firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.Timestamp.fromDate(new Date(from.toUtcNativeDate())).toMillis();
        this.toTimestamp = firebase__WEBPACK_IMPORTED_MODULE_6__["default"].firestore.Timestamp.fromDate(new Date(to.toUtcNativeDate())).toMillis();
    }
};
TuiSensorComponent.ɵfac = function TuiSensorComponent_Factory(t) { return new (t || TuiSensorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_services_sensors_service__WEBPACK_IMPORTED_MODULE_9__["SensorsService"])); };
TuiSensorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: TuiSensorComponent, selectors: [["app-tui-sensor"]], viewQuery: function TuiSensorComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_taiga_ui_kit__WEBPACK_IMPORTED_MODULE_2__["TuiCalendarRangeComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.dateRange = _t.first);
    } }, inputs: { sensorId: "sensorId" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵProvidersFeature"]([
            {
                provide: _taiga_ui_kit__WEBPACK_IMPORTED_MODULE_2__["TUI_CALENDAR_DATA_STREAM"],
                useValue: calendarStream$,
            },
        ])], decls: 11, vars: 6, consts: [[1, "tui-row", "tui-space_top-3"], [1, "tui-col_8", "tui-col-offset_1"], [3, "items", "rangeChange"], [1, "tui-col_2", "tui-col-offset_1"], ["tuiButton", "", 1, "tui-space_right-3", "tui-space_bottom-3", 3, "click"], [1, "tui-row", "tui-space_top-3", "sensor-results"], [1, "tui-col-10", "tui-col-offset_1", 3, "ngSwitch"], [3, "ngSwitchCase"], ["size", "xxl", 3, "inheritColor", "overlay"], [1, "axes", 3, "axisXLabels", "axisYLabels"], [3, "max", "value"]], template: function TuiSensorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "tui-calendar-range", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("rangeChange", function TuiSensorComponent_Template_tui_calendar_range_rangeChange_2_listener($event) { return ctx.getRange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function TuiSensorComponent_Template_button_click_4_listener() { return ctx.startGetSensorData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, TuiSensorComponent_ng_template_8_Template, 1, 1, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, TuiSensorComponent_ng_template_9_Template, 2, 3, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, TuiSensorComponent_ng_template_10_Template, 2, 4, "ng-template", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("items", ctx.calItems);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx.sensorBtnTitle);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngSwitch", ctx.loadingState);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngSwitchCase", "stopped");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngSwitchCase", "loading");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngSwitchCase", "processed");
    } }, directives: [_taiga_ui_kit__WEBPACK_IMPORTED_MODULE_2__["TuiCalendarRangeComponent"], _taiga_ui_core__WEBPACK_IMPORTED_MODULE_10__["TuiButtonComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_11__["NgSwitchCase"], _taiga_ui_core__WEBPACK_IMPORTED_MODULE_10__["TuiLoaderComponent"], _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_12__["TuiAxesComponent"], _taiga_ui_addon_charts__WEBPACK_IMPORTED_MODULE_12__["TuiBarChartComponent"]], styles: [".sensor-results[_ngcontent-%COMP%] {\n  min-height: 35vh;\n}\n.sensor-results[_ngcontent-%COMP%]   tui-axes[_ngcontent-%COMP%] {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcdHVpLXNlbnNvci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0FBQ0Y7QUFDRTtFQUNFLFlBQUE7QUFDSiIsImZpbGUiOiJ0dWktc2Vuc29yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlbnNvci1yZXN1bHRzIHtcclxuICBtaW4taGVpZ2h0OiAzNXZoO1xyXG5cclxuICB0dWktYXhlcyB7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });
TuiSensorComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_ngneat_until_destroy__WEBPACK_IMPORTED_MODULE_5__["UntilDestroy"])()
], TuiSensorComponent);

const getDataArray = (data) => {
    if (!!!(data === null || data === void 0 ? void 0 : data.length))
        return [];
    const sensorTypes = Object.keys(data[0]);
    return data.reduce((accu = new Array(sensorTypes.length).fill([]), next) => {
        sensorTypes.forEach((sensorTypeName) => accu[sensorTypes.indexOf(sensorTypeName)].push(next[sensorTypeName]));
        return accu;
    }, new Array(sensorTypes.length).fill([]));
};


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_fire_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/auth-guard */ "BPe8");
/* harmony import */ var _auth_auth_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/auth.component */ "LS6v");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");





const redirectUnauthorizedToLogin = () => Object(_angular_fire_auth_guard__WEBPACK_IMPORTED_MODULE_1__["redirectUnauthorizedTo"])(['auth']);
const redirectLoggedInToItems = () => Object(_angular_fire_auth_guard__WEBPACK_IMPORTED_MODULE_1__["redirectLoggedInTo"])('/sensors');
const routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    Object.assign(Object.assign({ path: 'auth' }, Object(_angular_fire_auth_guard__WEBPACK_IMPORTED_MODULE_1__["canActivate"])(redirectLoggedInToItems)), { component: _auth_auth_component__WEBPACK_IMPORTED_MODULE_2__["AuthComponent"] }),
    Object.assign(Object.assign({ path: 'sensors' }, Object(_angular_fire_auth_guard__WEBPACK_IMPORTED_MODULE_1__["canActivate"])(redirectUnauthorizedToLogin)), { loadChildren: () => __webpack_require__.e(/*! import() | sensors-sensors-module */ "sensors-sensors-module").then(__webpack_require__.bind(null, /*! ./sensors/sensors.module */ "2qIN")).then(m => m.SensorsModule) })
];
// const routes: Routes = [
//   { path: '', redirectTo: '/auth', pathMatch: 'full' },
//   { path: 'auth', canActivate: [IsAnonymousGuard], component: AuthComponent },
//   { path: 'sensors', canActivate: [IsAuthGuard], loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsModule) }
// ];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_0__["PreloadAllModules"] })], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map