import "reflect-metadata"
import TransactionCategoryService from '../../../useCases/implementations/TransactionCategoryService';
import TransactionCategoryController from '../implementations/TransactionCategoryController';
import TransactionCategoryRepository from '../../repositories/implementations/TransactionCategoryRepository';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import StringUtil from '../../../../../shared/utils/StringUtil';
import IUpdateCategoryDTO from '../../../mappers/TransactionCategory/IUpdateCategoryDTO';

import dbHandler from '../../../../../shared/utils/tests/db-handler';

const transactionCategoryController = new TransactionCategoryController(new TransactionCategoryService(new TransactionCategoryRepository()))
const INITIAL_SETUP_ROWS = 2;

export const createRandomCategory = (): TransactionCategory => {
  return {
    name: StringUtil.randomString(10),
    color: StringUtil.randomHexString(),
    icon: Number(StringUtil.randomString(3, 'n'))
  }
}
let setupCategory1 = createRandomCategory();
let setupCategory2 = createRandomCategory();

beforeAll(async () => {
  await dbHandler.connect()
});
beforeEach(async () => {
  setupCategory1 = await transactionCategoryController.save(setupCategory1);
  setupCategory2 = await transactionCategoryController.save(setupCategory2);
})
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('TransactionCategory', () => {
  beforeEach(async () => {
    await dbHandler.clearDatabase()
    setupCategory1 = await transactionCategoryController.save(setupCategory1);
    setupCategory2 = await transactionCategoryController.save(setupCategory2);
  })
  test('TransactionCategory:findAll', async () => {
      const categories = await transactionCategoryController.findAll();
      expect(categories).toHaveLength(INITIAL_SETUP_ROWS);
      const firstCategory = categories[0];
      expect(JSON.stringify((firstCategory))).toBe(JSON.stringify(setupCategory1));

    }
  )

  test('TransactionCategory:save', async () => {
      const categoryObject = createRandomCategory();
      const category = await transactionCategoryController.save(categoryObject);
      const categories = await transactionCategoryController.findAll();
      expect(categories).toHaveLength(INITIAL_SETUP_ROWS + 1);
      expect(category).toBeInstanceOf(TransactionCategory);
      expect(JSON.stringify(category.name)).toBe(JSON.stringify(categoryObject.name));
      expect(typeof category.id === 'string').toBeTruthy();
    }
  )


  test('TransactionCategory:delete', async () => {
      let categories = await transactionCategoryController.findAll();
      expect(categories).toHaveLength(INITIAL_SETUP_ROWS);
      const category = {...categories[0]}
      if (!category.id) throw Error();
      await transactionCategoryController.delete({id: category.id})
      categories = await transactionCategoryController.findAll();
      expect(categories).toHaveLength(INITIAL_SETUP_ROWS - 1);
    }
  )

  test('TransactionCategory:update', async () => {
      const categoryUpdate = createRandomCategory();
      let categories = await transactionCategoryController.findAll();
      const category = {...categories[1]}
      if (!category.id) throw Error();

      category.icon = categoryUpdate.icon;
      category.name = categoryUpdate.name;
      category.color = categoryUpdate.color;
      await transactionCategoryController.update(<IUpdateCategoryDTO> category);

      categories = await transactionCategoryController.findAll();
      const categoryUpdated = {...categories[1]}

      expect(JSON.stringify(category)).toBe(JSON.stringify(categoryUpdated));
    }
  )

})
