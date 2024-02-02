import { Test, TestingModule } from '@nestjs/testing';
import { FoodmineResolver } from './foodmine.resolver';
import { FoodmineService } from './foodmine.service';

describe('FoodmineResolver', () => {
  let resolver: FoodmineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodmineResolver, FoodmineService],
    }).compile();

    resolver = module.get<FoodmineResolver>(FoodmineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
