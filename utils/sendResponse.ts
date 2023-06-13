import { Response } from "express";

const sendResponse = (
  res: Response,
  status: number,
  message?: string,
  data?: any
) => {
  const response: any = { status };

  if (message) {
    response.message = message;
  }

  if (data) {
    response.data = data;
  }

  res.status(status).json(response);
};

export default sendResponse;
