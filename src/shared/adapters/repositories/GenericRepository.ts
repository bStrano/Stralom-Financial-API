import RepositoryNotFound from '../../errors/repository/implementations/RepositoryNotFound';
import * as mongoose from 'mongoose';
import {injectable} from 'inversify';

@injectable()
abstract class GenericRepository<T,Z extends mongoose.Document>{
  private collection : mongoose.Model<Z>;

  abstract instantiateObject(props: unknown): T;
  abstract getCollection(): mongoose.Model<Z>;

  protected constructor() {
    this.collection = this.getCollection();
  }

  async delete(id: string): Promise<void> {
    // @ts-ignore
    await this.collection.deleteOne({_id: id});
  }

  async findAll(): Promise<T[]> {
    const objects = await this.collection.find();
    return objects.map( (objectValue) => {
      return this.instantiateObject({...objectValue.toObject(), id: objectValue._id.toString()})
    })
  }

  async save(objectParams: unknown): Promise<T> {
    const objectValue = await this.collection.create(objectParams)
    return this.instantiateObject({...objectValue.toObject(), id: objectValue._id.toString()})
  }

  async update(objectParams: unknown): Promise<void> {

    // @ts-ignore
    const objectValue = await this.collection.findOneAndUpdate({_id: objectParams.id},objectParams,{new: true})
    if(!objectValue) throw new RepositoryNotFound()
    // this.instantiateObject({...subcategory.toObject(), id: subcategory._id.toString()})
  }

}

export default GenericRepository;
