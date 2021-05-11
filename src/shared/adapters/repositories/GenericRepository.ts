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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.collection.deleteOne({_id: id});
  }

  async findAll(): Promise<T[]> {
    const objects = await this.collection.find();
    return objects.map( (objectValue) => {
      return this.instantiateObject(objectValue.toObject())
    })
  }

  async save(objectParams: unknown): Promise<T> {
    await this.collection.create(objectParams)
    return this.instantiateObject(objectParams)
  }

  async update(objectParams: unknown): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const objectValue = await this.collection.findOneAndUpdate({_id: objectParams.id},objectParams,{new: true})
    if(!objectValue) throw new RepositoryNotFound()
    return this.instantiateObject(objectValue.toObject())
  }

}

export default GenericRepository;
