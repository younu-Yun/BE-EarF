import { Calendar } from '../models/schemas/calendar';

const diaryService = {
  //calendar 날짜별 태그 노출??
  //Diary 생성
  async createDiary(date: Date, title: string, content: string) {
    try {
      const calendar = await Calendar.create({ date, title, content });
      return calendar;
    } catch (error) {
      throw new Error('다이어리 생성에 실패했습니다.');
    }
  },
  //Diary 수정
  async updateDiary(id: string, title: string, content: string) {
    try {
      const calendar = await Calendar.findOneAndUpdate(
          { _id: id }, { title, content }, { new: true }
        );
      return calendar;
    } catch (error) {
      throw new Error('다이어리 수정에 실패했습니다.');
    }
  },
  //Diary 삭제
  async deleteDiary(id: string) {
    try {
      const calendar = await Calendar.findOneAndDelete({ _id: id });
      return calendar;
    } catch (error) {
      throw new Error('다이어리 삭제에 실패했습니다.');
    }
  },
  //Diary 조회
  async readDiary(id: string) {
    try {
      const calendar = await Calendar.findOne({ _id: id });
      return calendar;
    } catch (error) {
      throw new Error('다이어리를 불러올 수 없습니다.');
    }
  },
}

export default diaryService;