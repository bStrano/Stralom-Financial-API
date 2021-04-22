import "reflect-metadata"
import TransactionCategoryService from '../../../useCases/implementations/TransactionCategoryService';
import TransactionCategoryController from '../implementations/TransactionCategoryController';
import TransactionCategoryRepository from '../../repositories/implementations/TransactionCategoryRepository';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import StringUtil from '../../../../../shared/utils/StringUtil';

import dbHandler from '../../../../../shared/utils/tests/db-handler';
import TransactionSubcategoryController from '../implementations/TransactionSubcategoryController';
import TransactionSubcategoryService from '../../../useCases/implementations/TransactionSubcategoryService';
import TransactionSubcategoryRepository from '../../repositories/implementations/TransactionSubcategoryRepository';
import TransactionSubcategory from '../../../entities/TransactionSubcategory/TransactionSubcategory';
import IUpdateSubcategoryDTO from '../../../mappers/TransactionSubcategory/IUpdateSubcategoryDTO';

const transactionCategoryController = new TransactionCategoryController(new TransactionCategoryService(new TransactionCategoryRepository()))
const transactionSubcategoryController = new TransactionSubcategoryController(new TransactionSubcategoryService(new TransactionSubcategoryRepository()))
const INITIAL_SETUP_ROWS = 3;
export const createRandomCategory = (): TransactionCategory => {
  return {
    name: StringUtil.randomString(10),
    color: StringUtil.randomHexString(),
    icon: Number(StringUtil.randomString(3, 'n'))
  }
}

let setupCategory1 = createRandomCategory();
let setupCategory2 = createRandomCategory();

export const createRandomSubcategory = (): TransactionSubcategory => {
  return {
    name: StringUtil.randomString(10),
    user: 2
  }
}

let setupSubcategory1 = createRandomSubcategory();
let setupSubcategory2 = createRandomSubcategory();
let setupSubcategory3 = createRandomSubcategory();

beforeAll(async () => {
  await dbHandler.connect()
});
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());


describe('TransactionSubcategory', () => {
  beforeEach(async () => {
    setupCategory1 = <TransactionCategory>await transactionCategoryController.save(setupCategory1);
    setupCategory2 = <TransactionCategory>await transactionCategoryController.save(setupCategory2);

    setupSubcategory1 = await transactionSubcategoryController.save({
      ...setupSubcategory1,
      category: <string>setupCategory1.id
    })
    setupSubcategory2 = await transactionSubcategoryController.save({
      ...setupSubcategory2,
      category: <string>setupCategory1.id
    })
    setupSubcategory3 = await transactionSubcategoryController.save({
      ...setupSubcategory3,
      category: <string>setupCategory2.id
    })

  })


  test('findAll', async () => {
      const subcategories = await transactionSubcategoryController.findAll();
      expect(subcategories).toHaveLength(INITIAL_SETUP_ROWS);
    }
  )

  test('save', async () => {
      const subcategoryObject = createRandomSubcategory();
      const subcategories = await transactionSubcategoryController.findAll();
      expect(subcategories).toHaveLength(INITIAL_SETUP_ROWS);
      const subcategory = await transactionSubcategoryController.save({
        ...subcategoryObject,
        category: <string>setupCategory1.id
      });
      expect(subcategory).toBeInstanceOf(TransactionSubcategory);
      expect(typeof subcategory.id === 'string').toBeTruthy();
      expect(JSON.stringify(subcategory)).toBe(JSON.stringify({id: subcategory.id, ...subcategoryObject}));
    }
  )


  test('delete', async () => {
      let subcategories = await transactionSubcategoryController.findAll();
      expect(subcategories).toHaveLength(INITIAL_SETUP_ROWS);
      const subcategory = {...subcategories[0]}
      if (!subcategory.id) throw Error();
      await transactionSubcategoryController.delete({id: subcategory.id})
      subcategories = await transactionSubcategoryController.findAll();
      expect(subcategories).toHaveLength(INITIAL_SETUP_ROWS - 1);
    }
  )

  test('update', async () => {
      const subcategoryObject = createRandomSubcategory();
      let subcategories = await transactionSubcategoryController.findAll();
      const subcategory = {...subcategories[1]}
      if (!subcategory.id) throw Error();
      subcategory.name = subcategoryObject.name;
      await transactionCategoryController.update(<IUpdateSubcategoryDTO>subcategory);

      subcategories = await transactionSubcategoryController.findAll();
      const categoryUpdated = {...subcategories[1]}


      expect(JSON.stringify(subcategory)).toBe(JSON.stringify(categoryUpdated));
    }
  )
})
