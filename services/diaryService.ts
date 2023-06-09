import { Diary } from '../models/schemas/diary';

interface CreateDiary {
  (
    _id: string,
    date: Date,
    tag: string[],
    title: string,
    content: string,
    shareStatus: boolean
  ): Promise<any>;
}

interface UpdateDiary {
  (
    _id: string,
    date: Date,
    tag: string[],
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
  _id,
  date,
  tag,
  title,
  content,
  shareStatus
) => {
  try {
    const createDiary = await Diary.create({
      _id,
      date,
      tag,
      title,
      content,
      shareStatus,
    });
    return createDiary;
  } catch (error) {
    console.log(error)
    throw new Error(Error_Message.createDiaryError);
  }
};

const updateDiary: UpdateDiary = async (
  _id,
  date,
  tag,
  title,
  content,
  shareStatus
) => {
  try {
    const updatedDiary = await Diary.findOneAndUpdate(
      { _id, date },
      { tag, title, content, shareStatus },
      { new: true }
    );
    return updatedDiary;
  } catch (error) {
    throw new Error(Error_Message.updateDiaryError);
  }
};

const diaryService = {
  //월간 diary 태그 조회
  async getAllDiariesByMonth(_id: string, startDate: Date, endDate: Date) {
    try {
      const allDiariesByMonth = await Diary.find({
        _id,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) }
      }).select('tag');
      
      const tags: string[] = [];

      allDiariesByMonth.forEach((diary) => {
        diary.tag.forEach((tag) => {
          const allTags = tag.split(',').map((t) => t.trim());
          tags.push(...allTags);
        });
      });

      const tagsCount: { [key: string]: number } = {};

      tags.forEach((tag) => {
        if (tagsCount[tag]) {
          tagsCount[tag] += 1;
        } else {
          tagsCount[tag] = 1;
        }
      });
      return tagsCount;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
  //diary 생성
  createDiary,
  //diary 사진 등록
  async photoRegisterInDiary(_id:string, date: Date, image: string) {
    try {
      const photoRegisterInDiary = await Diary.findOneAndUpdate(
        { _id, date },
        { image });
      return photoRegisterInDiary;
    } catch (error) {
      throw new Error(Error_Message.updateDiaryError);
    }
  },
  //diary 수정
  updateDiary,
  //diary 삭제
  async deleteDiary(_id: string, date: Date) {
    try {
      const deletedDiary = await Diary.findOneAndDelete({ _id, date });
      return deletedDiary;
    } catch (error) {
      throw new Error(Error_Message.deleteDiaryError);
    }
  },
  //diary 조회
  async getDiary(_id: string, date: Date) {
    try {
      const getDiary = await Diary.findOne({ _id, date });
      return getDiary;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
};

export default diaryService;