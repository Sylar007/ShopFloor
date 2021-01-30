import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ArchwizardModule} from 'angular-archwizard';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { SharedModule } from './theme/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { CameraComponent } from './camera/camera.component';
import { AuthSigninComponent } from './signin/auth-signin.component';
import {WebcamModule} from './modules/webcam/webcam.module';
import { ZXingScannerModule } from './modules/scanner/zxing-scanner.module';
import { ScannerComponent } from './scanner/scanner.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentListComponent } from './equipment/equipmentlist.component';
import { EquipmentViewComponent } from './equipment/equipmentview.component';
import { EquipmentAddComponent } from './equipment/equipmentadd.component';
import { EquipmentEditComponent } from './equipment/equipmentedit.component';
import { EquipmentLogComponent } from './equipment/equipmentlog.component';
import { EquipmentLogDetailComponent } from './equipment/equipmentlogdetail.component';
import { EquipmentFileComponent } from './equipment/equipmentfile.component';

import { PartListComponent } from './part/partlist.component';
import { PartViewComponent } from './part/partview.component';
import { PartEditComponent } from './part/partedit.component';
import { PartAddComponent } from './part/partadd.component';

import { ScheduleListComponent } from './schedule/schedulelist.component';
import { ScheduleEditComponent } from './schedule/scheduleedit.component';
import { ScheduleAddComponent } from './schedule/scheduleadd.component';
import { PartDialogComponent } from './schedule/partdialog.component';

import { TechnicianEntryListComponent } from './technicianentry/technicianentrylist.component';
import { TechnicianEntryEditComponent } from './technicianentry/technicianentryedit.component';

import { PartModelListComponent } from './partmodel/partmodellist.component';
import { PartModelViewComponent } from './partmodel/partmodelview.component';
import { PartModelEditComponent } from './partmodel/partmodeledit.component';
import { PartModelAddComponent } from './partmodel/partmodeladd.component';

import { PartTypeListComponent } from './parttype/parttypelist.component';
import { PartTypeViewComponent } from './parttype/parttypeview.component';
import { PartTypeEditComponent } from './parttype/parttypeedit.component';
import { PartTypeAddComponent } from './parttype/parttypeadd.component';

import { EquipmentTypeListComponent } from './equipmenttype/equipmenttypelist.component';
import { EquipmentTypeViewComponent } from './equipmenttype/equipmenttypeview.component';
import { EquipmentTypeEditComponent } from './equipmenttype/equipmenttypeedit.component';
import { EquipmentTypeAddComponent } from './equipmenttype/equipmenttypeadd.component';

import { OperationEntryListComponent } from './operationentry/operationentrylist.component';
import { OperationEntryViewComponent } from './operationentry/operationentryview.component';
import { OperationEntryEditComponent } from './operationentry/operationentryedit.component';
import { OperationEntryAddComponent } from './operationentry/operationentryadd.component';
import { OperationEntryDialogComponent } from './operationentry/operationentrydialog.component';

import { WorkOrderComponent } from './workorder/workorder.component';
import { WorkOrderListComponent } from './workorder/workorderlist.component';
import { WorkOrderViewComponent } from './workorder/workorderview.component';
import { WorkOrderEditComponent } from './workorder/workorderedit.component';
import { WorkOrderAddComponent } from './workorder/workorderadd.component';
import { WorkOrderFileComponent } from './workorder/workorderfile.component';
import { WorkOrderSubTaskFileComponent } from './workorder/workordersubtaskfile.component';
import { WorkOrderBoardComponent } from './workorderboard/workorderboard.component';
import { WorkExecutionComponent } from './workexecution/workexecution.component';

import { NotificationListComponent } from './notification/notificationlist.component';
import { NotificationViewComponent } from './notification/notificationview.component';
import { NotificationEditComponent } from './notification/notificationedit.component';
import { NotificationAddComponent } from './notification/notificationadd.component';

import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import {ChatUserListComponent} from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import {FriendComponent} from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import {ChatMsgComponent} from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';

import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TreeviewModule } from 'ngx-treeview';
import {OverlayModule} from '@angular/cdk/overlay';
import { AngularXTimelineModule } from 'angularx-timeline';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { SafeHtmlPipe } from './pipes/keep-html.pipe';
import { SafeUrlPipe } from './pipes/keep-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthSigninComponent,
    WelcomeComponent,
    CameraComponent,
    ScannerComponent,
    EquipmentComponent,
    EquipmentListComponent,
    EquipmentViewComponent,
    EquipmentAddComponent,
    EquipmentEditComponent,
    EquipmentLogComponent,
    EquipmentLogDetailComponent,
    EquipmentFileComponent,
    OperationEntryListComponent,
    OperationEntryViewComponent,
    OperationEntryEditComponent,
    OperationEntryAddComponent,
    OperationEntryDialogComponent,
    PartModelListComponent,
    PartModelViewComponent,
    PartModelEditComponent,
    PartModelAddComponent,
    PartTypeListComponent,
    PartTypeViewComponent,
    PartTypeEditComponent,
    PartTypeAddComponent,
    ScheduleListComponent,
    ScheduleEditComponent,
    ScheduleAddComponent,
    TechnicianEntryListComponent,
    TechnicianEntryEditComponent,
    PartDialogComponent,
    EquipmentTypeListComponent,
    EquipmentTypeViewComponent,
    EquipmentTypeEditComponent,
    EquipmentTypeAddComponent,
    PartListComponent,
    PartViewComponent,
    PartEditComponent,
    PartAddComponent,
    WorkOrderComponent,
    WorkOrderListComponent,
    WorkOrderViewComponent,
    WorkOrderEditComponent,
    WorkOrderAddComponent,
    WorkOrderFileComponent,
    WorkOrderSubTaskFileComponent,
    WorkOrderBoardComponent,
    WorkExecutionComponent,
    NotificationListComponent,
    NotificationViewComponent,
    NotificationEditComponent,
    NotificationAddComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ChatUserListComponent,
    FriendComponent,
    ChatMsgComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    SafeHtmlPipe,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    WebcamModule,
    SharedModule,
    ArchwizardModule,
      // Local
    ZXingScannerModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgbDatepickerModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    TreeviewModule.forRoot(),
    OverlayModule,
    ScrollingModule,
    AngularXTimelineModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    [NavigationItem]
    // provider used to create fake backend
    //fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
