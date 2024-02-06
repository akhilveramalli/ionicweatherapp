import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  private _storage: Storage | null = null;

  scannedData: any;
  encodedData: any;
  encodeData: any;
  inputData: any;
  number : any;
  

  constructor(private barcodeScanner: BarcodeScanner,private storage: Storage,private alertController: AlertController) {this.init();}

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

    }).catch(err => {
      console.log('Error', err);
    });

  }

  createBarcode() {
    var data = 'upi://pay?pa='+this.number+'&pn=vdfvgdvg&am='+this.inputData+'&cu=INR&tn=f&' ;
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, data).then((encodedData) => {
      console.log(encodedData);
      this.encodedData = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.number = await storage.get('name');
    console.log(this.number)
    if (this.number == null){
      await this.showEnterNameAlert();
    }
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async showEnterNameAlert() {
    const alert = await this.alertController.create({
        header: 'Enter Name',
        message: 'Please enter your UPI ID:',
        inputs: [
            {
                name: 'name',
                type: 'text',
                placeholder: 'UPI ID'
            }
        ],
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Submit',
                handler: (data) => {
                    // Handle the entered name (data.name)
                    console.log('Entered Name:', data.name);
                    this.set('name', data.name)
                    this.init()
                }
            }
        ]
    });

    await alert.present();  
} 






}
