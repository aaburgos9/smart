import { Injectable } from "@angular/core";
import { GtmService } from "../gtm/gtm.service";

@Injectable({
  providedIn: "root",
})
export class TaggingPlanService {
  constructor(private GTM: GtmService) {}

  /**
   * Funcion que en via un tagging plan customizado
   *
   *
   * @param {string}   tagKey clave con la que se buscara en el archivo assets/partner/taggin-plan.json los valores
   * correspondientes a esa etiqueta
   * @return {void} El valor de retorno es un void.
   */
  tag(buttonEventAction: string, buttonEventLabel: string, event?: string) {
    if (event) {
      this.consumirGTM({ buttonEventAction, buttonEventLabel, event });
    } else {
      this.consumirGTM({ buttonEventAction, buttonEventLabel });
    }
  }

  consumirGTM(eventData: any) {
    this.GTM.consumirGTM(
      eventData.buttonEventAction || "",
      eventData.buttonEventLabel || "",
      eventData.eventvalue || "",
      eventData.event || "eventClick"
    );
  }

  tagTitle(pageTitle: string, pageUrl: string) {
    this.GTM.consumirGTMTitle(pageTitle, pageUrl);
  }
}
