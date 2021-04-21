abstract class RepositoryError extends Error{

  protected constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default RepositoryError;
