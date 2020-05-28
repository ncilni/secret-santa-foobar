import { TestBed } from '@angular/core/testing';

import { OrganizeActivityService } from './organize-activity.service';

describe('OrganizeActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizeActivityService = TestBed.get(OrganizeActivityService);
    expect(service).toBeTruthy();
  });
});
