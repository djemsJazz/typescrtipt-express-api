import HttpException from './HttpException';

class EntityNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Entity with id ${id} was not found`);
  }
}

export default EntityNotFoundException;
