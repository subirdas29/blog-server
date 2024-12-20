import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400;

  const error: TErrorSources = 
    [{
      details: err?.message,
    }]


  return {
    statusCode,
    message: 'Invalid ID',
    error,
  };
};

export default handleCastError;
