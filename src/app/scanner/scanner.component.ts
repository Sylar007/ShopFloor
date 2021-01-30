import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ScannerService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent {

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  qrType: string;

  constructor(
    private route: ActivatedRoute,
    private scannerService: ScannerService,
    private router: Router) { }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.scannerService.getQRtype(this.qrResultString)
      .pipe(first())
      .subscribe(data => {
          if (data.qr_type === 'Equipment') {
            this.router.navigate(['/equipment/equipmentview', { serialNo: this.qrResultString }]);
          }
          else if (data.qr_type === 'Part')
          {
            this.router.navigate(['/part/part', { serialNo: this.qrResultString }]);
          }
          else if (data.qr_type === 'WorkOrder')
          {
            this.router.navigate(['/workorder/workorderview', { workorderNo: this.qrResultString }]);
          }
        });
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }
}
