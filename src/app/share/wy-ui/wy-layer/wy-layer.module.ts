import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyLayerModalComponent } from './wy-layer-modal/wy-layer-modal.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WyLoginPhoneComponent } from './wy-login-phone/wy-login-phone.component';
import { WyLayerRegisterComponent } from './wy-layer-register/wy-layer-register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzInputModule, NzAlertModule, NzCheckboxModule, NzFormModule, NzSpinModule, NzListModule, NzIconModule } from 'ng-zorro-antd';
import { WyLoginDefaultComponent } from './wy-login-default/wy-login-default.component';
import { WyLoginLikeComponent } from './wy-login-like/wy-login-like.component';

@NgModule({
  declarations: [WyLayerModalComponent, WyLoginPhoneComponent, WyLayerRegisterComponent, WyLoginDefaultComponent, WyLoginLikeComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    OverlayModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
    NzSpinModule,
    NzAlertModule,
    NzListModule,
    NzIconModule,
    NzFormModule
  ],
  providers: [OverlayContainer],
  exports: [WyLayerModalComponent, WyLoginPhoneComponent, WyLayerRegisterComponent, WyLoginDefaultComponent, WyLoginLikeComponent]
})
export class WyLayerModule { }