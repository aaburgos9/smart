//
// Copyright (C) 2024 - Smart Jungle
//

// **** IMPORT'S ****
import * as jose from 'node-jose-browserify';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class CriptoService {
  // **** PROPERTIES ****
  private publickeyMbaas: any;
  private publickeyFrontend: any;
  private generalkeyFrontend: any;
  private encryptKey: any;

  constructor(public http: HttpClient) {}

  // **** SETTERS AND GETTERS -START ****
  setPublickeyMbaas(publickeyMbaas: any): void {
    this.publickeyMbaas = publickeyMbaas;
  }

  getPublickeyMbaas(): any {
    return this.publickeyMbaas;
  }

  setPublickeyFrontend(publickeyFrontend: any): void {
    this.publickeyFrontend = publickeyFrontend;
  }

  getPublickeyFrontend(): any {
    return this.publickeyFrontend;
  }

  setEncryptKey(encryptKey: any): void {
    this.encryptKey = encryptKey;
  }

  getEncryptKey(): any {
    return this.encryptKey;
  }

  setGeneralkeyFrontend(generalkeyFrontend: any): void {
    this.generalkeyFrontend = generalkeyFrontend;
  }

  getGeneralkeyFrontend(): any {
    return this.generalkeyFrontend;
  }
  // **** SETTERS AND GETTERS - END ****

  // ******************************************************
  // encrypt data with mbaas key
  // input: data to encryp:string
  // return: data encrypted:string
  // ******************************************************
  public async encrypter(dataToEncryp: any) {
    let jweToken;
    const encryptor = this.getEncryptKey();
    try {
      jweToken = await encryptor.update(JSON.stringify(dataToEncryp)).final();
    } catch (error) {
      console.log(`Encryptor.Update error: ${error}`);
    }
    return jweToken;
  }

  // ******************************************************
  // unencrypt data with frontend key
  // input: data Encrypted:string
  // return: data decrypted:json
  // ******************************************************
  public async unencrypter(tokenEncrypted: string) {
    const tokenParts = tokenEncrypted.split('.');
    const header = JSON.parse(
      jose.util.base64url.decode(tokenParts[0]).toString()
    );
    // const kid = header.kid;

    const decryptKey = this.getGeneralkeyFrontend();
    let decryptedPayload;
    try {
      const decryptor = this.getJoseJWECreateDecrypt(decryptKey);
      decryptedPayload = await decryptor.decrypt(tokenEncrypted);
    } catch (error) {
      console.log(`unencrypter error: ${error}`);
    }
    return JSON.parse(decryptedPayload.payload);
  }

  getJoseJWECreateDecrypt(decryptKey: any): any {
    return jose.JWE.createDecrypt(decryptKey);
  }

  // ******************************************************
  // Create internal fronend Keys
  // input: N/A
  // return: frontend public key:any
  // ******************************************************
  async keyCreator() {
    try {
      const frontStore = this.getJoseJWECreateKeyStore();
      const kid = Math.floor(new Date().getTime() / 1000).toString();
      const props = {
        kid,
        use: 'enc',
        alg: 'RSA-OAEP-256',
        key_ops: ['encrypt', 'wrap', 'verify']
      };

      await frontStore.generate('RSA', 1048, props);
      const key = frontStore.get(kid, { kty: 'RSA', use: 'enc' });
      this.setGeneralkeyFrontend(key);
      const pubKeyFront: any = key.toJSON();

      this.setPublickeyFrontend(pubKeyFront);

      const keymbaas = this.getPublickeyMbaas();

      this.createEncryptor(keymbaas);
    } catch (error) {
      console.log(`generate keys error: ${error}`);
    }
    return this.getPublickeyFrontend();
  }

  getJoseJWECreateKeyStore(): any {
    return jose.JWK.createKeyStore();
  }

  // ******************************************************
  // createEncryptor Keys front keymbaas
  // input: N/A
  // return: N/A
  // ******************************************************
  createEncryptor(keymbaas: any): void {
    let encryptor;
    try {
      encryptor = jose.JWE.createEncrypt(
        { format: 'compact', contentAlg: 'A256CBC-HS512' },
        {
          key: keymbaas,
          header: {
            kid: keymbaas.kid
          }
        }
      );
      this.setEncryptKey(encryptor);
    } catch (error) {
      console.log(`Create Encryptor error: ${error}`);
    }
  }

  // ******************************************************
  // get public key from MBAAS
  // input: N/A
  // return: mbaas public key:any [promise]
  // ******************************************************
  async getKeysRemote(): Promise<any> {
    const mbaasStore = jose.JWK.createKeyStore();
    const mbaasKeys: any = await this.http
      .get<any>(environment.jwk)
      .toPromise();
    if (mbaasKeys) {
      mbaasKeys.keys.forEach((key: jose.JWK.Key) => {
        if (key.use === 'enc') {
          // try {
          this.setPublickeyMbaas(key);
          // } catch (error) {
          //   console.log(`Key import error: ${error}`);
          // }
        }
      });
    }
    return this.getPublickeyMbaas();
  }
}
