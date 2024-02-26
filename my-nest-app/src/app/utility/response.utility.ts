export const successResponse = (message: string, data?: any) => {
  return {
    message,
    data,
  };
}

export const errorResponse = (message: string, statusCode: number) => {
  return {
    message,
    error: "Bad Request",
    statusCode,
  };
}

