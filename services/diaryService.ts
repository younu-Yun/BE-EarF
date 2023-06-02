import { Diary } from '../models/schemas/diary';

const diaryService = {
  //calendar 날짜별 태그 노출??
  //Diary 생성
  async createDiary(userId: string, tag: string[], imageUrl: string | undefined, title: string, content: string) {
    try {
      const diary = await Diary.create({ userId, tag, imageUrl, title, content });
      return diary;
    } catch (error) {
      throw new Error('다이어리 생성에 실패했습니다.');
    }
  },  
  //Diary 수정
  async updateDiary(id: string, title: string, content: string) {
    try {
      const diary = await Diary.findByIdAndUpdate({ _id: id }, { title, content }, { new: true });
      return diary;
    } catch (error) {
      throw new Error('다이어리 수정에 실패했습니다.');
    }
  },
  //Diary 삭제
  async deleteDiary(id: string) {
    try {
      const diary = await Diary.findOneAndDelete({ _id: id });
      return diary;
    } catch (error) {
      throw new Error('다이어리 삭제에 실패했습니다.');
    }
  },
  //Diary 조회
  async readDiary(id: string) {
    try {
      const diary = await Diary.findById({ _id: id });
      return diary;
    } catch (error) {
      throw new Error('다이어리를 불러올 수 없습니다.');
    }
  },
}

export default diaryService;