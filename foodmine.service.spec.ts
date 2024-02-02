import { Test, TestingModule } from '@nestjs/testing';
import { FoodmineService } from './foodmine.service';

describe('FoodmineService', () => {
  let service: FoodmineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodmineService],
    }).compile();

    service = module.get<FoodmineService>(FoodmineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
