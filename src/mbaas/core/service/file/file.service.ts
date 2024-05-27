import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SendInformationService } from '../SendInformation/send-information.service';
import { catchError, tap, debounceTime } from 'rxjs/operators';
import { LOGGER, CLIENT_ID } from '../../../mbaas.const';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private logger: SendInformationService<any>,
    private obserStr: SendInformationService<string>
  ) {}

  /**
   * Funcion encargada de enviar las imagenes al servicio soporteUploadImage.
   * @param objImage Tipo BLOB con content-type: application/octet-stream
   */
  public uploadImages(objImage: any) {
    const httpOptions = this.auth.headerTokenInjectorMultipart();
    const headers = { headers: httpOptions };
    const clientId = this.obserStr.lastValue(CLIENT_ID);
    const formData = this.getImagesOfObject(objImage);
    formData.append('clientId', clientId);
    console.log('UPLOAD SERVICE BEFORE');
    return this.http
      .post(environment.soporteUploadImage, formData, headers)
      .pipe(
        debounceTime(45000),
        catchError((error: Error) => {
          this.logger.sendData(
            {
              title: '[ERROR] UPLOAD IMAGE - BIOMETRIA',
              data: error.message,
            },
            LOGGER
          );
          throw new Error('Ocurrio un error al subir la imagen');
        }),
        tap((data: any) => {
          this.logger.sendData(
            {
              title: '[SUCCESS] UPLOAD IMAGE - BIOMETRIA',
              data,
            },
            LOGGER
          );
        })
      );
  }

  /**
   * Función que se encarga de agregar las imagenes en un formulario
   * para facilitar el envio y poder agregar datos posteriormente.
   * @param images Tipo BLOB con content-type: application/octet-stream
   */
  private getImagesOfObject(images) {
    const formData = new FormData();
    for (const key in images) {
      if (images && images.hasOwnProperty(key)) {
        formData.append(`img_${key}`, images[key]);
      }
    }
    return formData;
  }
}
