// src/middlewares/errorHandler.js

import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // console.error(
  //   `Error Handler: [${new Date().toISOString()}] ${err.status || 500} - ${
  //     err.message
  //   }`,
  // );

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.data || null,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
