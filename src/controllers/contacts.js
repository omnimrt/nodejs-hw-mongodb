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
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  console.log(`Controller: Fetching contact with ID: ${contactId}`);

  if (!isValidObjectId(contactId)) {
    return next(createHttpError(400, 'Invalid contact id!'));
  }

  const contact = await getContactById(contactId);
  console.log(`Controller: Fetched contact: ${contact}`);

  if (!contact) {
    console.log('Controller: Contact not found');

    return next(
      createHttpError({
        status: 404,
        message: `Contact not found!`,
        data: null,
      }),
    );
  }

  res.status(200).json({
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
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(
      createHttpError({
        status: 404,
        message: `Contact not found!`,
        data: null,
      }),
    );
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(
      createHttpError({
        status: 404,
        message: `Contact not found!`,
        data: null,
      }),
    );
    return;
  }

  res.status(204).send();

  // res.status(204).json({
  //   status: 204,
  //   message: 'Successfully deleted a contact!',
  //   data: null,
  // });
};
