import { TestBed, inject } from '@angular/core/testing';

import { MessageResolverService } from './message-resolver.service';

describe('MessageResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageResolverService]
    });
  });

  it('should be created', inject([MessageResolverService], (service: MessageResolverService) => {
    expect(service).toBeTruthy();
  }));
});
