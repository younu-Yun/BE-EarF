import { Request } from 'express';
import multer, { FileFilterCallback, Multer } from 'multer';
import fs from 'fs';

const storageOptions: multer.StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
    callback(null, 'public/');
  },
  filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
    const extension = file.originalname.split('.').pop();
    callback(null, Date.now() + '.' + extension);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('이미지 파일만 업로드 가능합니다.'));
  }
  cb(null, true);
};

const upload: Multer = multer({ storage: storageOptions, fileFilter });

const deleteDiaryImage = (filePath: string | undefined): void => {
  if (filePath) {
    try {
      fs.unlinkSync(filePath);
      console.log('사진이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.log(error);
    }
  }
} 

export { upload, deleteDiaryImage };