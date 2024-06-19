import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownSortOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(
    sortOrder,
  );
  return isKnownSortOrder ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    'name',
    'email',
    'phoneNumber',
    'isFavorite',
    'contactType',
  ];
  if (!keysOfContact.includes(sortBy)) {
    return '_id';
  }
  return sortBy;
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder); // Renamed to parseSortOrder
  return { sortBy: parsedSortBy, sortOrder: parsedSortOrder };
};
