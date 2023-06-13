import { Diary } from "../models/schemas/diary";
import { User } from "../models";
import { deleteDiaryImage } from "../utils/multer";

interface CreateDiary {
  (
    id: string,
    name: string,
    profileImage: string,
    checkedBadge: string,
    date: Date,
    tag: string[],
    title: string,
    content: string,
    shareStatus: boolean,
    likeIds: string[],
    imageUrl: string,
  ): Promise<any>;
}

interface UpdateDiary {
  (
    id: string,
    name: string,
    profileImage: string,
    checkedBadge: string,
    date: Date,
    tag: string[],
    title: string,
    content: string,
    shareStatus: boolean,
    likeIds: string[],
    imageUrl: string,
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
  name,
  profileImage,
  checkedBadge,
  date,
  tag,
  title,
  content,
  shareStatus,
  likeIds,
  imageUrl,
) => {
  try {
    const diaryToCreate = await Diary.findOne({ id, date });

    if (diaryToCreate) {
      throw new Error(
        Error_Message.createDiaryError + "이미 해당 일자의 Diary가 존재합니다.",
      );
    }

    const createDiary = await Diary.create({
      id,
      name,
      profileImage,
      checkedBadge,
      date,
      tag,
      title,
      content,
      shareStatus,
      likeIds,
      imageUrl,
    });

    if (tag.includes("텀블러")) {
      await User.updateOne({ id }, { $inc: { tumblerNum: 1 } });
    } else if (tag.includes("대중교통")) {
      await User.updateOne({ id }, { $inc: { transportNum: 1 } });
    } else if (tag.includes("장바구니")) {
      await User.updateOne({ id }, { $inc: { basketNum: 1 } });
    }

    return createDiary;
  } catch (error) {
    console.log(error);
    throw new Error(Error_Message.createDiaryError);
  }
};

const updateDiary: UpdateDiary = async (
  id,
  name,
  profileImage,
  checkedBadge,
  date,
  tag,
  title,
  content,
  shareStatus,
  likeIds,
  imageUrl,
) => {
  try {
    const diaryToUpdate = await Diary.findOne({ id, date });

    if (diaryToUpdate) {
      const previousFilePath = `public/${diaryToUpdate.imageUrl.split("/")[3]}`;
      deleteDiaryImage(previousFilePath);

      if (diaryToUpdate.tag.includes("텀블러")) {
        await User.updateOne({ id }, { $inc: { tumblerNum: -1 } });
      } else if (diaryToUpdate.tag.includes("대중교통")) {
        await User.updateOne({ id }, { $inc: { transportNum: -1 } });
      } else if (diaryToUpdate.tag.includes("장바구니")) {
        await User.updateOne({ id }, { $inc: { basketNum: -1 } });
      }
    }

    if (tag.includes("텀블러")) {
      await User.updateOne({ id }, { $inc: { tumblerNum: 1 } });
    } else if (tag.includes("대중교통")) {
      await User.updateOne({ id }, { $inc: { transportNum: 1 } });
    } else if (tag.includes("장바구니")) {
      await User.updateOne({ id }, { $inc: { basketNum: 1 } });
    }

    const updatedDiary = await Diary.findOneAndUpdate(
      { id, date },
      {
        name,
        profileImage,
        checkedBadge,
        tag,
        title,
        content,
        shareStatus,
        likeIds,
        imageUrl,
      },
      { new: true },
    );
    return updatedDiary;
  } catch (error) {
    throw new Error(Error_Message.updateDiaryError);
  }
};

const diaryService = {
  //월간 diary 조회
  async getAllDiariesByMonth(id: string, month: string) {
    try {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(`${month}-31`);
      const allDiariesByMonth = await Diary.find({
        id,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      }).select("date tag");

      const diaryData = allDiariesByMonth.map(diary => [
        diary.date.toISOString().split("T")[0],
        diary.tag.length,
      ]);

      return diaryData;
    } catch (error) {
      throw new Error(Error_Message.getDiaryError);
    }
  },
  //월간 diary 태그 조회
  async getAllDiariesTagByMonth(id: string, month: string) {
    try {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(`${month}-31`);
      const allDiariesByMonth = await Diary.find({
        id,
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      }).select("tag");

      const tags: string[] = [];

      allDiariesByMonth.forEach(diary => {
        diary.tag.forEach(tag => {
          const allTags = tag.split(",").map(t => t.trim());
          tags.push(...allTags);
        });
      });

      const tagsCount: { [key: string]: number } = {};

      tags.forEach(tag => {
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
      const diaryToDelete = await Diary.findOne({ id, date });

      if (diaryToDelete) {
        if (diaryToDelete.tag.includes("텀블러")) {
          await User.updateOne({ id }, { $inc: { tumblerNum: -1 } });
        } else if (diaryToDelete.tag.includes("대중교통")) {
          await User.updateOne({ id }, { $inc: { transportNum: -1 } });
        } else if (diaryToDelete.tag.includes("장바구니")) {
          await User.updateOne({ id }, { $inc: { basketNum: -1 } });
        }
      }

      const deletedDiary = await Diary.findOneAndDelete({ id, date });
      const filePath = `public/${deletedDiary?.imageUrl.split("/")[3]}`;
      deleteDiaryImage(filePath);
      console.log(`${id}님 ${date} 다이어리 삭제`);
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
