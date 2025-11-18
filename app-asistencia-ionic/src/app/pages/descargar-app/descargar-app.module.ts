import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DescargarAppPageRoutingModule } from './descargar-app-routing.module';
import { DescargarAppPage } from './descargar-app.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DescargarAppPageRoutingModule],
  declarations: [DescargarAppPage]
})
export class DescargarAppPageModule {}
