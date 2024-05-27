import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64ConverterService {

  constructor() {
  }

  /**
   * Funcion encargada de convertir el string Base64 en un archivo tipo BLOB.
   * @param b64Data string Base64, con o sin MIME Type.
   * @param contentType string MIME Type para definir el BLOB.
   * @param sliceSize number tamaño de las secciones de bits para el BLOB.
   */
  public base64toBlob(b64Data: any, contentType = 'plain/text', sliceSize = 512) {
    const blob = new Blob([b64Data], {type: contentType});
    return blob;
  }

}
