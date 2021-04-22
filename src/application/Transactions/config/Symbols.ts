const Symbols = {
  TransactionCategoryController: Symbol.for("TransactionCategoryController"),
  TransactionCategoryRepository: Symbol.for("TransactionCategoryRepository"),
  TransactionCategoryRepositoryMemory: Symbol.for("TransactionCategoryRepositoryMemory"),
  TransactionCategoryService: Symbol.for("TransactionCategoryService"),

  TransactionSubcategoryController: Symbol.for("TransactionSubcategoryController"),
  TransactionSubcategoryRepository: Symbol.for("TransactionSubcategoryRepository"),
  TransactionSubcategoryService: Symbol.for("TransactionSubcategoryService")
}

export default Symbols;
