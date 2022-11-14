import { TestBed } from '@angular/core/testing';

import { UsuariosAPIService } from './usuarios-api.service';

describe('UsuariosAPIService', () => {
  let service: UsuariosAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
