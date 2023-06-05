import { Diary } from '../models/schemas/diary';

interface CreateDiary {
  (
    date: Date,
    userId: string,
    tag: string[],
    imageUrl: string | undefined,
    title: string,
    content: string,
    shareStatus: boolean
  ): Promise<any>;
}

interface UpdateDiary {
  (
    date: Date,
    userId: string,
    tag: string[],
    imageUrl: string | undefined,
    title: string,
    content: string,
    shareStatus: boolean
  ): Promise<any>;
}

const Error_Message = {
  createDiaryError: '다이어리 생성에 실패했습니다.',
  updateDiaryError: '다이어리 수정에 실패했습니다.',
  deleteDiaryError: '다이어리 삭제에 실패했습니다.',
  getDiaryError: '다이어리를 불러오는 데에 실패했습니다.',
};

const createDiary: CreateDiary = async (
  date,
  userId,
  tag,
  imageUrl,
  title,
  content,
  shareStatus
) => {
  try {
    const createDiary = await Diary.create({
      date,
      userId,
      tag,
      imageUrl,
      title,
      content,
      shareStatus,
    });
    return createDiary;
  } catch (error) {
    throw new Error(Error_Message.createDiaryError);
  }
};

const updateDiary: UpdateDiary = async (
  date,
  userId,
  tag,
  imageUrl,
  title,
  content,
  shareStatus
) => {
  try {
    const updatedDiary = await Diary.findOneAndUpdate(
      { date, userId },
      { tag, imageUrl, title, content, shareStatus },
      { new: true }
    );
    return updatedDiary;
  } catch (error) {
    throw new Error(Error_Message.updateDiaryError);
  }
};

const diaryService = {
  async getAllDiariesByMonth(userId: string, startDate: Date, endDate: Date) {
    try {
      const allDiariesByMonth = await Diary.find({
        userId,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) }
      }).select('tag');
      
      const tags: string[] = [];

      allDiariesByMonth.forEach((diary) => {
        tags.push(...diary.tag);
      });
      return tags;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
  //diary 생성
  createDiary,
  //diary 수정
  updateDiary,
  //diary 삭제
  async deleteDiary(userId: string, date: Date) {
    try {
      const deletedDiary = await Diary.findOneAndDelete({ userId, date });
      return deletedDiary;
    } catch (error) {
      throw new Error(Error_Message.deleteDiaryError);
    }
  },
  //diary 조회
  async getDiary(userId: string, date: Date) {
    try {
      const getDiary = await Diary.findOne({ userId, date });
      return getDiary;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
};

export default diaryService;
