import RepositoryError from '../RepositoryError';

class RepositoryNotFound implements RepositoryError{
  name = "Repository: Not Found";
  message = "Object not found.";
  stack?: string | undefined;

  constructor() {
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default RepositoryNotFound;
