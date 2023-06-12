import Boast, { IBoast } from "../models/schemas/boast";
import { Diary } from "../models/schemas/diary";

const boastService = {
  // shareStatus가 true인 다이어리 찾기
  async loadBoast(): Promise<IBoast[]> {
    try {
      const diaries = await Diary.find({ shareStatus: true });

      const boasts: IBoast[] = [];
      for (let diary of diaries) {
        const boast = new Boast({
          name: diary.name,
          profileImage: diary.profileImage,
          checkedBadge: diary.checkedBadge,
          tag: diary.tag,
          title: diary.title,
          content: diary.content,
          likeIds: diary.likeIds,
          createdAt: diary.createdAt,
          imageUrl: diary.imageUrl,
          date: diary.date,
          diaryId: diary._id,
        });
        await boast.save();
        boasts.push(boast);
      }

      boasts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return boasts;
    } catch (error) {
      console.error(error);
      throw new Error("자랑하기 게시글을 불러오는데 실패했습니다.");
    }
  },
};

export default boastService;
