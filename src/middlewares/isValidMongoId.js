import createHttpError from 'http-errors';
import { Types } from 'mongoose';

export const isValidMongoId = (req, res, next) => {
  const { contactId } = req.params;
  if (!Types.ObjectId.isValid(contactId)) {
    next(createHttpError(400, 'Invalid contact id!'));
  }
  next();
};
