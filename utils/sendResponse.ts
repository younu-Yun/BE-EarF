import { Response } from "express";

const sendResponse = (
  res: Response,
  status: number,
  message?: string,
  data?: any
) => {
  res.status(status).json({ message, ...data });
};

export default sendResponse;
