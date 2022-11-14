import { TestBed } from '@angular/core/testing';

import { NotLogedGuard } from './not-loged.guard';

describe('NotLogedGuard', () => {
  let guard: NotLogedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotLogedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
