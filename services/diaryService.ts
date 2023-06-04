import { Diary } from '../models/schemas/diary';

interface CreateDiary {(
  userId: string,
  tag: string[],
  imageUrl: string | undefined,
  title: string,
  content: string): any; //any타입 수정
}

const Error_Message = {
  createDiaryError: '다이어리 생성에 실패했습니다.',
  updateDiaryError: '다이어리 수정에 실패했습니다.',
  deleteDiaryError: '다이어리 삭제에 실패했습니다.',
  getDiaryError: '다이어리를 불러오는 데에 실패했습니다.',
};

const createDiary: CreateDiary = async (userId, tag, imageUrl, title, content) => {
  try {
    const diary = await Diary.create({ userId, tag, imageUrl, title, content });
    return diary;
  } catch (error) {
    throw new Error(Error_Message.createDiaryError);
  }
};

const diaryService = {
  //calendar 날짜별 태그 노출??
  //Diary 생성
  createDiary,
  //Diary 수정
  async updateDiary(id: string, title: string, content: string) {
    try {
      const updatedDiary = await Diary.findByIdAndUpdate({ _id: id }, { title, content }, { new: true });
      return updatedDiary;
    } catch (error) {
      throw new Error(Error_Message.updateDiaryError);
    }
  },
  //Diary 삭제
  async deleteDiary(id: string) {
    try {
      const deletedDiary = await Diary.findOneAndDelete({ _id: id });
      return deletedDiary;
    } catch (error) {
      throw new Error(Error_Message.deleteDiaryError);
    }
  },
  //Diary 조회
  async getDiary(id: string) {
    try {
      const getDiary = await Diary.findById({ _id: id });
      return getDiary;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
}

export default diaryService;