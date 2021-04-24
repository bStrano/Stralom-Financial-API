import "reflect-metadata"
import TransactionCategoryService from '../../../useCases/implementations/TransactionCategoryService';
import TransactionCategoryController from '../implementations/TransactionCategoryController';
import TransactionCategoryRepository from '../../repositories/implementations/TransactionCategoryRepository';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import StringUtil from '../../../../../shared/utils/StringUtil';

import dbHandler from '../../../../../shared/infra/databases/mongodb/memory/db-handler';
import TransactionSubcategoryController from '../implementations/TransactionSubcategoryController';
import TransactionSubcategoryService from '../../../useCases/implementations/TransactionSubcategoryService';
import TransactionSubcategoryRepository from '../../repositories/implementations/TransactionSubcategoryRepository';
import TransactionSubcategory from '../../../entities/TransactionSubcategory/TransactionSubcategory';
import IUpdateSubcategoryDTO from '../../../mappers/TransactionSubcategory/IUpdateSubcategoryDTO';
import IDeleteSubcategoryDTO from '../../../mappers/TransactionSubcategory/IDeleteSubcategoryDTO';

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
export const createRandomSubcategory = (id?: string): TransactionSubcategory => {
  return {
    id,
    name: StringUtil.randomString(10),
    user: 2
  }
}
let setupCategory1 = createRandomCategory();
let setupCategory2 = createRandomCategory();
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

      const subcategory = await transactionSubcategoryController.save({
        ...subcategoryObject,
        category: <string>setupCategory1.id
      });
      expect(subcategory).toBeInstanceOf(TransactionSubcategory);
      expect(typeof subcategory.id === 'string').toBeTruthy();
      expect(subcategory).toMatchObject({...subcategoryObject, id: subcategory.id});
    }
  )


  test('delete', async () => {
      await transactionSubcategoryController.delete(<IDeleteSubcategoryDTO>{id: setupSubcategory1.id})
      const subcategories = await transactionSubcategoryController.findAll();
      expect(subcategories).toHaveLength(INITIAL_SETUP_ROWS - 1);
    }
  )

  test('update', async () => {
      const subcategoryObject = createRandomSubcategory(setupSubcategory2.id);
      await transactionSubcategoryController.update(<IUpdateSubcategoryDTO>subcategoryObject);
      const subcategories = await transactionSubcategoryController.findAll();
      const categoryUpdated = {...subcategories[1]}

      console.log(subcategoryObject,categoryUpdated)
      expect(subcategoryObject).toMatchObject(categoryUpdated);
    }
  )
})
