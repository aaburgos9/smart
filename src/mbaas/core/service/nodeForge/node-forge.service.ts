import { Injectable } from '@angular/core';
import * as forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class NodeForgeService {

  constructor() { }

  get buildHash(): {
    encriptacionClaveA: (certificado: string, texto: string) => string,
    encriptacionClaveB: (certificado: string, texto: string) => string
  } {
    const methods = {
      encriptacionClaveA: (certificado: string, texto: string) => {
        const pki = forge.pki;
        const publicKey = pki.publicKeyFromPem(certificado);
        // Encriptar con metodo RSA/ECB/PKCS1PADDING
        const encrypted = publicKey.encrypt(texto);
        // codificar en base64
        const encoded = forge.util.encode64(encrypted);
        return encoded;
      },
      encriptacionClaveB: (certificado: string, texto: string) => {
        const pki = forge.pki;
        const publicKey = pki.publicKeyFromPem(certificado);
        // Encriptar con metodo RSA/ECB/OAEPWithSHA-512AndMGF1Padding
        const encrypted = publicKey.encrypt(texto, 'RSA-OAEP', {
          md: forge.md.sha512.create(),
          mgf1: {
            md: forge.md.sha1.create()
          }
        });
        // codificar en base64
        const encoded = forge.util.encode64(encrypted);
        return encoded;
      }
    };
    return methods;
  }
}
