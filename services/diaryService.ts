import { Diary } from '../models/schemas/diary';

interface CreateDiary {
  (
    date: Date,
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
  tag,
  imageUrl,
  title,
  content,
  shareStatus
) => {
  try {
    const createDiary = await Diary.create({
      date,
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
  tag,
  imageUrl,
  title,
  content,
  shareStatus
) => {
  try {
    const updatedDiary = await Diary.findOneAndUpdate(
      { date },
      { tag, imageUrl, title, content, shareStatus },
      { new: true }
    );
    return updatedDiary;
  } catch (error) {
    throw new Error(Error_Message.updateDiaryError);
  }
};

const diaryService = {
  //월간 diary 태그 조회
  async getAllDiariesByMonth(startDate: Date, endDate: Date) {
    try {
      const allDiariesByMonth = await Diary.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) }
      }).select('tag');
      
      const tags: string[] = [];

      allDiariesByMonth.forEach((diary) => {
        tags.push(...diary.tag);
      });

      const tagsCount: {[key: string]: number} 
        = tags.reduce((accumulator: { [key: string]: number }, currentValue: string) => {
        accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
        return accumulator;
      }, {});
      return tagsCount;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
  //diary 생성
  createDiary,
  //diary 수정
  updateDiary,
  //diary 삭제
  async deleteDiary(date: Date) {
    try {
      const deletedDiary = await Diary.findOneAndDelete({ date });
      return deletedDiary;
    } catch (error) {
      throw new Error(Error_Message.deleteDiaryError);
    }
  },
  //diary 조회
  async getDiary(date: Date) {
    try {
      const getDiary = await Diary.findOne({ date });
      return getDiary;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
};

export default diaryService;