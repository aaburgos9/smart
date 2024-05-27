import { Injectable } from '@angular/core';
import { CatalogoService } from '../catalogo/catalogo.service';
import { KINDS } from '../../../mbaas.kind.const';

@Injectable({
  providedIn: 'root'
})
export class GeographyService {

  private list: any[];
  constructor(
    private catalogoService: CatalogoService
  ) {
    const params = { pais: 'CO', modulo: 'MNUING', lenguaje: 'ES', kind: 'cuenta' };

    this.catalogoService.assetsText(KINDS.AREAS_GEOGRAFICAS, params).subscribe(response => {
      this.list = JSON.parse(response).pais.filter((country: any) => {
        return country.codigo !== '999' && country.codigo !== '000';
      });
      console.log('Areas geograficas:::', this.list);
    });
  }

  getCountries(filter?: Array<string>): any[] {
    if (filter) {
      const countries = [];
      this.list.forEach(country => {
        if (filter.indexOf(country.codigo) < 0) {
          countries.push({ dane: country.codigo, name: country.nombre });
        }
      });
      return countries;
    } else {
      return this.list.map((country: any) => {
        return { dane: country.codigo, name: country.nombre };
      });
    }
  }

  getDepartments(countryId: string): any[] {
    const country = this.list.find((c: any) => c.codigo === countryId);
    return country.departamento.map((depar: any) => {
      return { dane: depar.codigo, name: depar.nombre, ciudad: depar.ciudad };
    });
  }

  getCities(countryId: string, departmentId: string): any[] {
    const country = this.list.find((c: any) => c.codigo === countryId);
    const departamento = country.departamento.find((d: any) => d.codigo === departmentId);

    return departamento.ciudad.map((city: any) => {
      return {
        categoria: city.categoria,
        dane: city.codigo,
        name: city.nombre,
        nombreCategoria: city.nombreCategoria,
        codigo: city.codigo
      };
    });
  }

  getCitiesByCountry(countryId: string): any[] {
    const country = this.list.find((c: any) => c.codigo === countryId);
    if (!country) {
      return [];
    }
    const cities = [];
    country.departamento.map((depar: any) => {
      this.getCities(countryId, depar.codigo).map((c: any) => {
        cities.push(c);
      });
    });
    return cities;
  }

  getMunicipalities(countryId: string, departmentId: string, cityId: string): any[] {
    const country = this.list.find((c: any) => c.codigo === countryId);
    const departamento = country.departamento.find((d: any) => d.codigo === departmentId);
    const city = departamento.ciudad.find((c: any) => c.codigo === cityId);

    return city.municipio.map((municipio: any) => {
      return { dane: municipio.codigo, name: municipio.nombre };
    });

  }

  getCountryName(countryId: string, key = 'nombre'): string {
    return this.list.find((c: any) => c.codigo === countryId)[key];
  }

  getDepartamentName(countryId: string, departamentId: string, key = 'nombre'): string {
    const country = this.list.find((c: any) => c.codigo === countryId);
    return country.departamento.find((d: any) => d.codigo === departamentId)[key];
  }

  getCityName(countryId: string, departamentId: string, cityId: string, key = 'nombre'): string {
    const country = this.list.find((c: any) => c.codigo === countryId);
    const departament = country.departamento.find((d: any) => d.codigo === departamentId);
    return departament.ciudad.find((ci: any) => ci.codigo === cityId)[key];
  }

  getCityNameByCountry(countryId: string, cityId: string, key = 'nombre'): string {
    console.log('country....', countryId);
    console.log('cityId....', cityId);
    const country = this.list.find((c: any) => c.codigo === countryId);
    let name = '';
    country.departamento.forEach((d: any) => {
      const city = d.ciudad.find((c: any) => c.codigo === cityId);
      if (city) {
        name = city.nombre;
        return name;
      }
    });
    return name;
  }

  getMunicipalityName(countryId: string, departamentId: string, cityId: string, muniId: string, key = 'nombre'): string {
    const country = this.list.find((c: any) => c.codigo === countryId);
    const departament = country.departamento.find((d: any) => d.codigo === departamentId);
    const cities = departament.ciudad.find((ci: any) => ci.codigo === cityId);
    return cities.municipio.find((m: any) => m.codigo === muniId)[key];
  }

  /**
   * Función que busca y retorna un objeto con los datos de una ciudad según su dane
   * NOTA: tener en cuenta que el dane de una ciudad se componen de el numero de pais (3 dígitos)
   *  el número del departamento (2 dígitos) y el numero de ciudad (3 dígitos)
   * @param cityId string dane de la ciudad a buscar
   */
  getCityById(cityId: string): any {
    return this.getCitiesByCountry(cityId.substring(0, 3)).find(c => c.dane === cityId);
  }

  /**
   * Función que busca y retorna un objeto con los datos de un departamento según su dane
   * NOTA: tener en cuenta que el dane de una ciudad se componen de el numero de pais (3 dígitos)
   *  el número del departamento (2 dígitos) y el numero de ciudad (3 dígitos)
   * @param departamentId string dane del departamento a buscar
   */
  getDepartamentById(departamentId: string): any {
    const country = departamentId.substring(0, 3);
    return this.getDepartments(country).find(d => d.dane === departamentId);
  }

  /**
   * Función que busca y retorna un objeto con los datos de un municipio según el dane de la ciudad
   * si no encuantra un municipio retorna un objeto con datos vacios
   * NOTA: tener en cuenta que el dane de una ciudad se componen de el numero de pais (3 dígitos)
   *  el número del departamento (2 dígitos) y el numero de ciudad (3 dígitos)
   * @param cityId string dane del municipio a buscar
   */
  getMunicipalityByCity(cityId: string): any {
    if (cityId !== '') {
      const country = cityId.substring(0, 3);
      const departament = cityId.substring(0, 5);
      return this.getMunicipalities(country, departament, cityId)[0];
    }
    return { dane: '', name: '' };
  }

  /**
   * Función que busca y retorna un objeto con los datos de un pais según su dane
   * @param countryId string número dane del pais a buscar
   */
  getCountryById(countryId: string): any {
    return this.getCountries().find(c => c.dane === countryId);
  }

  /**
   * Función que busca un país en la lista de países según su nombre
   * @param countryName string nombre de país a buscar
   * @returns string referente al codigo DANE del país o null
   */
  getCountryCodeByName(countryName: string): string {
    if (countryName === '') { return ''; }
    try {
      console.log('getCountryCodeByName: ', countryName);
      const codeCountry = this.list.find(country => country.nombre.includes(countryName));
      return codeCountry.codigo;
    } catch (err) {
      return '';
    }
  }

  /**
   * Función que busca un departamento, dentro de un país, según su nombre
   * @param countryCode string codigo del país por defecto es Colombia (169)
   * @param departamentName string nombre del departamento
   * @returns string codigo DANE del departamento
   */
  getDepartamentCodeByName(departamentName: string, countryCode: string): string {
    if (departamentName === '') { return ''; }
    try {
      console.log('getDepartamentCodeByName: ', departamentName, countryCode);
      const depart = this.getDepartments(countryCode === '' ? '169' : countryCode).find(depto => depto.name.includes(departamentName));
      return depart.dane;
    } catch (err) {
      return '';
    }
  }

  /**
   * Función que retorna el código DANE de una ciudad por el nombre, según el pais, por defecto Colombia (169)
   * @param cityName string nombre de la ciudad a buscar
   * @param countryCode codigo del país
   * @returns string código DANE de la ciudad o null
   */
  getCityCodeByName(cityName: string, countryCode: string): string {
    if (cityName === '') { return ''; }
    try {
      const cityResponse = this.getCitiesByCountry(countryCode === '' ? '169' : countryCode).find(city => city.name.includes(cityName));
      return cityResponse.dane;
    } catch (err) {
      return '';
    }
  }

}
