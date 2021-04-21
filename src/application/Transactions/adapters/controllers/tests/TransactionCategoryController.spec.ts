import "reflect-metadata"
import TransactionCategoryService from '../../../useCases/implementations/TransactionCategoryService';
import TransactionCategoryRepositoryMemory from '../../repositories/memory/TransactionCategoryRepositoryMemory';
import TransactionCategoryController from '../implementations/TransactionCategoryController';
import TransactionCategoryRepository from '../../repositories/implementations/TransactionCategoryRepository';
import TransactionCategory from '../../../entities/TransactionCategory/TransactionCategory';
import StringUtil from '../../../../../shared/utils/StringUtil';
import RepositoryNotFound from '../../../../../shared/errors/repository/implementations/RepositoryNotFound';
import IUpdateCategoryDTO from '../../../mappers/IUpdateCategoryDTO';

const dbHandler = require('../../../../../shared/utils/tests/db-handler');

const transactionCategoryController = new TransactionCategoryController(new TransactionCategoryService(new TransactionCategoryRepository()))
const INITIAL_SETUP_ROWS = 2;

const createRandomCategory = () => {
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

test('TransactionCategory:findAll', async () => {
    let categories = await transactionCategoryController.findAll();
    expect(categories).toHaveLength(INITIAL_SETUP_ROWS);
    let firstCategory = categories[0];
    expect(JSON.stringify((firstCategory))).toBe(JSON.stringify(setupCategory1));

  }
)

test('TransactionCategory:save', async () => {
    let categoryObject = createRandomCategory();
    let category = await transactionCategoryController.save(categoryObject);
    let categories = await transactionCategoryController.findAll();
    expect(categories).toHaveLength(INITIAL_SETUP_ROWS + 1);
    expect(category).toBeInstanceOf(TransactionCategory);
    expect(JSON.stringify(category.name)).toBe(JSON.stringify(categoryObject.name));
    expect(typeof category.id === 'string').toBeTruthy();
  }
)


test('TransactionCategory:delete', async () => {
    let categories = await transactionCategoryController.findAll();
    expect(categories).toHaveLength(INITIAL_SETUP_ROWS);
    let category = {...categories[0]}
    if (!category.id) throw Error();
    await transactionCategoryController.delete({id: category.id})
    categories = await transactionCategoryController.findAll();
    expect(categories).toHaveLength(INITIAL_SETUP_ROWS - 1);
  }
)

test('TransactionCategory:update', async () => {
    let categoryUpdate = createRandomCategory();
    let categories = await transactionCategoryController.findAll();
    let category = {...categories[1]}
    if (!category.id) throw Error();

    category.icon = categoryUpdate.icon;
    category.name = categoryUpdate.name;
    category.color = categoryUpdate.color;
    await transactionCategoryController.update(<IUpdateCategoryDTO> category);

    categories = await transactionCategoryController.findAll();
    let categoryUpdated = {...categories[1]}

    expect(JSON.stringify(category)).toBe(JSON.stringify(categoryUpdated));
  }
)
