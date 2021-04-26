// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import "reflect-metadata"
import TransactionCategoryService from '../../../useCases/implementations/TransactionCategoryService';
import TransactionCategoryController from '../implementations/TransactionCategoryController';
import TransactionCategoryRepository from '../../repositories/implementations/TransactionCategoryRepository';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import StringUtil from '../../../../../shared/utils/StringUtil';
import IUpdateCategoryDTO from '../../../mappers/TransactionCategory/IUpdateCategoryDTO';

import dbHandler from '../../../../../shared/infra/databases/mongodb/memory/db-handler';
import {ValidationError} from 'yup';

const transactionCategoryController = new TransactionCategoryController(new TransactionCategoryService(new TransactionCategoryRepository()))
const INITIAL_SETUP_ROWS = 2;

export const createRandomCategory = (): TransactionCategory => {
  return {
    name: StringUtil.randomString(10),
    color: StringUtil.randomHexString(),
    icon: Number(StringUtil.randomString(3, 'n'))
  }
}
let setupCategoryObject = createRandomCategory();

let setupCategory1 = createRandomCategory();
let setupCategory2 = createRandomCategory();

beforeAll(async () => {
  await dbHandler.connect()
});
beforeEach(async () => {
  setupCategoryObject = createRandomCategory()
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

  describe("Save", () => {
    describe("Validation", () => {
      test('required fields', async () => {
          await expect(transactionCategoryController.save({...setupCategoryObject})).resolves.toBeInstanceOf(TransactionCategory)
          await expect(transactionCategoryController.save({...setupCategoryObject, color: undefined})).rejects.toThrowError(ValidationError)
          await expect(transactionCategoryController.save({...setupCategoryObject, icon: undefined})).rejects.toThrowError(ValidationError)
          await expect(transactionCategoryController.save({...setupCategoryObject, name: undefined})).rejects.toThrowError(ValidationError)
        }
      )
      test('color format', async () => {
          setupCategoryObject.color = 'x'
          await expect(transactionCategoryController.save(setupCategoryObject)).rejects.toThrowError(ValidationError)
        }
      )
    })

    test('Save', async () => {
        const category = await transactionCategoryController.save(setupCategoryObject);
        const categories = await transactionCategoryController.findAll();
        expect(categories).toHaveLength(INITIAL_SETUP_ROWS + 1);
        expect(category).toBeInstanceOf(TransactionCategory);
        expect(JSON.stringify(category.name)).toBe(JSON.stringify(setupCategoryObject.name));
        expect(typeof category.id === 'string').toBeTruthy();
      }
    )

  })


  describe("Delete", () => {
    describe("Validation", () => {
      test('required fields', async () => {
          await expect(transactionCategoryController.delete({setupCategoryObject})).rejects.toThrowError(ValidationError)
        }
      )
    })

    test('TransactionCategory:delete', async () => {
        await transactionCategoryController.delete({id: setupCategory1.id})
        const categories = await transactionCategoryController.findAll();
        expect(categories).toHaveLength(INITIAL_SETUP_ROWS - 1);
      }
    )
  })



  describe("Update", () => {
    describe("Validation", () => {
      test('required fields', async () => {
          await expect(transactionCategoryController.update(setupCategoryObject)).rejects.toThrowError(ValidationError)
        }
      )
    })

    test('TransactionCategory:update', async () => {
        setupCategory1.icon = setupCategoryObject.icon;
        const res1 = await transactionCategoryController.update(<IUpdateCategoryDTO> setupCategory1);
        expect(JSON.stringify(setupCategory1)).toBe(JSON.stringify(res1));
        setupCategory1.name = setupCategoryObject.name;
        const res2 = await transactionCategoryController.update(<IUpdateCategoryDTO> setupCategory1);
        expect(JSON.stringify(setupCategory1)).toBe(JSON.stringify(res2));
        setupCategory1.color = setupCategoryObject.color;
        const res3 = await transactionCategoryController.update(<IUpdateCategoryDTO> setupCategory1);
         expect(JSON.stringify(setupCategory1)).toBe(JSON.stringify(res3));
      }
    )
  })


})
