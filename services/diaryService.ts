import { Diary } from "../models/schemas/diary";

interface CreateDiary {
  (
    id: string,
    date: Date,
    tag: string[],
    title: string,
    content: string,
    shareStatus: boolean,
    imageUrl: string
  ): Promise<any>;
}

interface UpdateDiary {
  (
    id: string,
    date: Date,
    tag: string[],
    title: string,
    content: string,
    shareStatus: boolean,
    imageUrl: string
  ): Promise<any>;
}

const Error_Message = {
  createDiaryError: "다이어리 생성에 실패했습니다.",
  updateDiaryError: "다이어리 수정에 실패했습니다.",
  deleteDiaryError: "다이어리 삭제에 실패했습니다.",
  getDiaryError: "다이어리를 불러오는 데에 실패했습니다.",
};

const createDiary: CreateDiary = async (
  id,
  date,
  tag,
  title,
  content,
  shareStatus,
  imageUrl
) => {
  try {
    const createDiary = await Diary.create({
      id,
      date,
      tag,
      title,
      content,
      shareStatus,
      imageUrl,
    });
    return createDiary;
  } catch (error) {
    console.log(error);
    throw new Error(Error_Message.createDiaryError);
  }
};

const updateDiary: UpdateDiary = async (
  id,
  date,
  tag,
  title,
  content,
  shareStatus,
  imageUrl
) => {
  try {
    const updatedDiary = await Diary.findOneAndUpdate(
      { id, date },
      { tag, title, content, shareStatus, imageUrl },
      { new: true }
    );
    return updatedDiary;
  } catch (error) {
    throw new Error(Error_Message.updateDiaryError);
  }
};

const diaryService = {
  //월간 diary 태그 조회
  async getAllDiariesByMonth(id: string, startDate: Date, endDate: Date) {
    try {
      const allDiariesByMonth = await Diary.find({
        id,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      }).select("tag");

      const tags: string[] = [];

      allDiariesByMonth.forEach((diary) => {
        diary.tag.forEach((tag) => {
          const allTags = tag.split(",").map((t) => t.trim());
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
  //diary 수정
  updateDiary,
  //diary 삭제
  async deleteDiary(id: string, date: Date) {
    try {
      const deletedDiary = await Diary.findOneAndDelete({ id, date });
      return deletedDiary;
    } catch (error) {
      throw new Error(Error_Message.deleteDiaryError);
    }
  },
  //diary 조회
  async getDiary(id: string, date: Date) {
    try {
      const getDiary = await Diary.findOne({ id, date });
      return getDiary;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
};

export default diaryService;
