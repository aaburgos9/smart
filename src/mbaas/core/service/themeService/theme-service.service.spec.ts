import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ThemeServiceService } from './theme-service.service';

describe('ThemeServiceService', () => {
  let rendererSpy: { createRenderer: jasmine.Spy };
  let renderSpy: { setAttribute: jasmine.Spy, removeChild: jasmine.Spy };
  let service: ThemeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: document }, { provide: Renderer2, useValue: renderSpy }]
    });
    rendererSpy = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    renderSpy = jasmine.createSpyObj('Renderer2', ['setAttribute', 'removeChild']);
    service = new ThemeServiceService(TestBed.inject(DOCUMENT), rendererSpy);
    service['renderer'] = TestBed.inject(Renderer2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test for addTheme', () => {
    const link = service['document'].createElement('link');
    link.setAttribute('id', 'theme');
    service['document'].head.appendChild(link);
    service.addTheme('');
    expect(service).toBeTruthy();
  });

  it('test for removeTheme', () => {
    const link = service['document'].createElement('link');
    link.setAttribute('rel', 'stylesheet');
    service['document'].head.appendChild(link);
    service.removeTheme();
    expect(service).toBeTruthy();
  });

  it('test for removeTheme multiple elements', () => {
    const link = service['document'].createElement('link');
    const link_uno = service['document'].createElement('link');
    const link_dos = service['document'].createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link_uno.setAttribute('rel', 'stylesheet');
    link_dos.setAttribute('rel', 'stylesheet');
    service['document'].head.appendChild(link);
    service['document'].head.appendChild(link_uno);
    service['document'].head.appendChild(link_dos);
    service.removeTheme();
    expect(service).toBeTruthy();
  });

  it('test for addTheme branche else', () => {
    const link = service['document'].createElement('link');
    link.setAttribute('id', 'other');
    service['document'].head.appendChild(link);
    service.addTheme('');
    expect(service).toBeTruthy();
  });

});
