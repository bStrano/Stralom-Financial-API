import * as yup from 'yup';
import ISaveCategoryDTO from '../../../mappers/TransactionCategory/ISaveCategoryDTO';
import IUpdateCategoryDTO from '../../../mappers/TransactionCategory/IUpdateCategoryDTO';
import IDeleteCategoryDTO from '../../../mappers/TransactionCategory/IDeleteCategoryDTO';


class TransactionCategoryValidator{
  static colorValidation =  yup.string().matches(/^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, "Color is required in hexadecimal format #FFFFFF")
  static iconValidation =  yup.number()
  static nameValidation =  yup.string()

  static validateSave(value: ISaveCategoryDTO):  Promise<unknown>{
    const saveCategorySchema = yup.object().shape({
      _id: yup.string().uuid("UUID required").required('UUID required'),
      name: yup.string().required('Name is required'),
      icon: yup.number().required('Icon ID is required'),
      color: this.colorValidation.required('Color is required in hexadecimal format #123456')
    });

    return saveCategorySchema.validate(value)
  }

  static validateUpdate(value: IUpdateCategoryDTO): Promise<unknown>{
    const updateCategorySchema = yup.object().shape({
      id: yup.string().required("ID is required"),
      name: this.nameValidation,
      icon: this.iconValidation,
      color: this.colorValidation
    });

    return updateCategorySchema.validate(value);
  }

  static validateDelete(value: IDeleteCategoryDTO): Promise<unknown>{
    const deleteCategoryScheme = yup.object().shape({
      id: yup.string().required("ID is required"),
    });

    return deleteCategoryScheme.validate(value);
  }
}

export default TransactionCategoryValidator;
