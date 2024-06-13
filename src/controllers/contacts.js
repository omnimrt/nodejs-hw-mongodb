import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    data: contacts,
    message: 'Successfully found contacts!',
    status: 200,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(createHttpError(400, 'Invalid contact id!'));
  }

  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found!'));
  }

  res.status(200).json({
    status: 200,
    data: contact,
    message: `Successfully found contact with id ${contactId}!`,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;

  const result = await updateContact(contactId, body);

  if (!result) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  res.status(204).send();
};
