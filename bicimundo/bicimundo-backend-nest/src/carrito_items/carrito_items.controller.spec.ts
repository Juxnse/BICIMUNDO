import { Test, TestingModule } from '@nestjs/testing';
import { CarritoItemsController } from './carrito_items.controller';

describe('CarritoItemsController', () => {
  let controller: CarritoItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarritoItemsController],
    }).compile();

    controller = module.get<CarritoItemsController>(CarritoItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
