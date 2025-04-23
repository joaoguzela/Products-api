export class NotFoundError extends Error {
  constructor(entity: string, message: string = `${entity} not found`) {
    super(message);
  }
}
