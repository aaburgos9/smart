import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CriptoService } from '../encryption/cripto.service';
import { AuthService } from '../authentication/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CatalogoService } from '../catalogo/catalogo.service';
import {
	ONCALL, MBAAS_STEPS, LOGGER, STATE_SUCESS, PAYLOAD, MODAL, MBAAS_ROUTING, STEP_ID,
	CLIENT_ID, CALLBACK_WF, MODULO, PAIS, LENGUAJE, KIND, LOADER, DEFAULT_ERR_MESSAGE, POST_TOKEN, CANAL, ZONE, ERROR_MESSAGE, ERR_INVALID_PLATFORM
} from 'src/mbaas/mbaas.const';
import { SendInformationService } from '../SendInformation/send-information.service';
import { ModalBuilderService } from '../ModalBuilder/modal-builder.service';
import { Modal } from '../../components/modal/modal';
import { Logger } from 'src/mbaas/logger/logger/logger';
import { debounceTime } from 'rxjs/operators';
import { GtmService } from '../gtm/gtm.service';

@Injectable({
	providedIn: 'root'
})
export class WorkflowService {
	pro: boolean;
	payload: any;
	constructor(
		private setPayload: SendInformationService<{ [key: string]: any }>,
		private setCurrentStep: SendInformationService<string>,
		private modalService: SendInformationService<Modal>,
		private obser: SendInformationService<boolean>,
		private obserStr: SendInformationService<string>,
		private logger: SendInformationService<Logger>,
		private router: Router,
		private http: HttpClient,
		private cripto: CriptoService,
		private auth: AuthService,
		private catalogo: CatalogoService,
		private modalBuilder: ModalBuilderService,
		private gtm: GtmService
	) {
		this.pro = environment.production;
	}

	workflow(stepId: string, data: any, modulo?: string): void {
		console.log(data);
		this.payload = this.cleanUpSpecialChars(data);
		console.log('Datos del contrato:' + JSON.stringify(this.payload));
		console.log('Datos del contrato::::', this.payload);
		this.logger.sendData({ title: 'Envio a Workflow', data: this.payload }, LOGGER);
		this.cripto.createEncryptor(this.cripto.getPublickeyMbaas());
		this.cripto.encrypter(this.payload).then(
			response => this.continueCallWorkflow(stepId, response, modulo)
		).catch(err => {
			console.log("Muere workflow")
			this.logger.sendData({ title: 'ERROR CRIPTO', data: err }, LOGGER);
			this.errorGeneralWorflow()(err);
		});
	}

	private continueCallWorkflow(stepId: string, encPayload: any, modulo?: string): void {
		const clientAux = this.obserStr.lastValue(CLIENT_ID);
		const module = modulo ? modulo : this.obser.lastValue(MODULO) ? this.obser.lastValue(MODULO) : 'POC';
		const workflowInterface: any = {
			stepId,
			payload: encPayload,
			clientId: clientAux,
			status: 1,
			module,
		};
		const httpOptions = this.auth.headerTokenInjector();
		const strObj = JSON.stringify(workflowInterface);

		this.http.post<any>(environment.workflow, strObj, { headers: httpOptions })
			.pipe(debounceTime(45000))
			.subscribe(this.successWorkflow(), this.errorGeneralWorflow());
	}

	successWorkflow(): (response: any) => void {
		return response => {
			this.logger.sendData({ title: 'Response payload', data: response }, LOGGER);
			this.obser.sendData(false, LOADER);
			if (this.pro) {
				this.cripto
					.unencrypter(response.data.payload)
					.then(this.successUncrypter(response))
					.catch(this.catchUncrypter());
				return;
			}
			this.successUncrypter(response)(response.data.payload);
		};
	}

	successUncrypter(response: any): (data: any) => void {
		return data => {
			data = this.cleanCharactersToUncripter(data);
			this.logger.sendData({ title: 'Response WF Uncrypter', data }, LOGGER);
			data.hasOwnProperty('token') ? this.obser.sendData(data.token, POST_TOKEN) : this.obser.sendData(false, POST_TOKEN);
			[MODULO, PAIS, LENGUAJE, CANAL].forEach(key => {
				if (data[key]) {
					this.obserStr.sendData(data[key], key);
				}
			});
			if (response.data.status === STATE_SUCESS) {
				console.log('data:::', data);
				console.log('response', response.data);
				this.setPayload.sendData(data, PAYLOAD);
				this.setCurrentStep.sendData(response.data.stepId, STEP_ID);
				console.log('route::', [this.getRoute(response.data.stepId)]);
				this.router.navigate([this.getRoute(response.data.stepId)]).then(() => {
					this.obser.sendData(false, ONCALL);
				});
				return;
			}
			if (response.data.status === 0) {
				window.open(data.urlProducto, '_self');
				return;
			}
			this.obserStr.sendData('cdt-movilempresas', KIND.KEY);
			if (data.esCliente !== undefined) {
				this.obserStr.sendData(data.esCliente, ZONE);
			}
			const dataFilter = {
				modulo: this.obserStr.lastValue(MODULO),
				pais: this.obserStr.lastValue(PAIS),
				lenguaje: this.obserStr.lastValue(LENGUAJE),
				canal: this.obserStr.lastValue(CANAL),
				kind: 'cdt-movilempresas'
			};

			this.obser.sendData(data.callbackUrl, CALLBACK_WF);
			this.catalogo.data(data.message, Object.assign(
				{ limit: -1 }, dataFilter))?.subscribe((_response: any) => {
				if (response.data.status === 3) {
					this.obser.sendData(false, LOADER);
					this.obser.sendData(false, ONCALL);
				}
				this.modalService.sendData(
					this.modalBuilder.getModalData(_response[0], response.data.status, data),
					MODAL
				);
			}, this.errorGeneralWorflow());
		};
	}

	catchUncrypter(): (err: any) => void {
		return err => {
			console.log('Error Cripto.unEncrypter', err);
		};
	}

	errorGeneralWorflow(): (err: any) => void {
		return err => {
			console.error(err);
			if (err.status == 403 && err.error.errors[0] == 'invalid_channel') {
				this.makeRequest(ERR_INVALID_PLATFORM)
			} else if (err.status == 404 && err.error.errors[0] == 'data_not_found') {
				this.makeRequest(DEFAULT_ERR_MESSAGE)
			} else {
				this.makeRequest(DEFAULT_ERR_MESSAGE)
			}
		};
	}

	getRoute(stepID: string): string {
		const routes = {};
    routes[MBAAS_STEPS.LOGIN001.STEP] = {route: `${MBAAS_ROUTING.PROYECTO}/${MBAAS_STEPS.LOGIN001.ROUTE}`, routeId: MBAAS_STEPS.LOGIN001.ROUTE_ID};
		routes[MBAAS_STEPS.MTS001.STEP] = {route: `${MBAAS_ROUTING.PROYECTO}/${MBAAS_STEPS.MTS001.ROUTE}`, routeId: MBAAS_STEPS.MTS001.ROUTE_ID};
		routes[MBAAS_STEPS.RESETPASS001.STEP] = {route: `${MBAAS_ROUTING.PROYECTO}/${MBAAS_STEPS.RESETPASS001.ROUTE}`, routeId: MBAAS_STEPS.RESETPASS001.ROUTE_ID};
		routes[MBAAS_STEPS.NEWPASS001.STEP] = {route: `${MBAAS_ROUTING.PROYECTO}/${MBAAS_STEPS.NEWPASS001.ROUTE}`, routeId: MBAAS_STEPS.NEWPASS001.ROUTE_ID};

		console.log('MODULO::::: ', this.obserStr.lastValue(MODULO));
		this.gtm.setStep(routes[stepID].routeId.split('/').pop());
		return routes[stepID].route || MBAAS_ROUTING.FORBBIDEN;
	}

	cleanUpSpecialChars(data: any): any {
		return JSON.parse(
			JSON.stringify(data)
				.replace(new RegExp('&', 'g'), 'y')
				.replace(new RegExp('ñ', 'g'), 'n')
				.replace(new RegExp('Ñ', 'g'), 'N')
				.replace(new RegExp('Á', 'g'), 'A')
				.replace(new RegExp('á', 'g'), 'a')
				.replace(new RegExp('É', 'g'), 'E')
				.replace(new RegExp('é', 'g'), 'e')
				.replace(new RegExp('Í', 'g'), 'I')
				.replace(new RegExp('í', 'g'), 'i')
				.replace(new RegExp('Ó', 'g'), 'O')
				.replace(new RegExp('ó', 'g'), 'o')
				.replace(new RegExp('ú', 'g'), 'u')
				.replace(new RegExp('Ú', 'g'), 'U')
		);
	}

	cleanCharactersToUncripter(payload: any) {
		const strPayload = JSON.stringify(payload);
		const clenPayload = strPayload
			.replace(/aacutembaas/g, 'á')
			.replace(/eacutembaas/g, 'é')
			.replace(/iacutembaas/g, 'í')
			.replace(/oacutembaas/g, 'ó')
			.replace(/uacutembaas/g, 'ú')
			.replace(/Aacutembaas/g, 'Á')
			.replace(/Eacutembaas/g, 'É')
			.replace(/Iacutembaas/g, 'Í')
			.replace(/Oacutembaas/g, 'Ó')
			.replace(/Uacutembaas/g, 'Ú')
			.replace(/nacutembaas/g, 'ñ')
			.replace(/Nacutembaas/g, 'Ñ');
		return JSON.parse(clenPayload);
	}

	makeRequest(keyCatalogo: any) {
		const filterCatalogo = {
			modulo: this.obserStr.lastValue(MODULO) === null ? 'smart-jungle-peacock' : this.obserStr.lastValue(MODULO),
			pais: this.obserStr.lastValue(PAIS) === null ? 'CO' : this.obserStr.lastValue(PAIS),
			lenguaje: this.obserStr.lastValue(LENGUAJE) === null ? 'ES' : this.obserStr.lastValue(LENGUAJE),
			kind: this.obserStr.lastValue(KIND.KEY) === null ? 'crrt' : this.obserStr.lastValue(KIND.KEY),
			canal: this.obserStr.lastValue(CANAL) === null ? '37' : this.obserStr.lastValue(CANAL)
		};
		this.catalogo.data(keyCatalogo, Object.assign(
			{ limit: -1 }, filterCatalogo
			// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
		)).subscribe((_response: any) => {
			console.log(_response)
			this.obser.sendData(false, LOADER);
			this.obser.sendData(false, ONCALL);
			this.modalService.sendData(
				this.modalBuilder.getModalData(_response[0], 3, ''),
				MODAL
			);
		}, () => {
			this.obser.sendData(false, LOADER);
			this.obser.sendData(false, ONCALL);
			this.modalService.sendData(
				this.modalBuilder.getModalData(ERROR_MESSAGE, 3), MODAL);
		});
	}
}
