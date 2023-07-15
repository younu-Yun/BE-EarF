import { User } from "../models";

export default class AdminUserService {
  // admin 전체 유저 조회
  public adminReadUser = async (page: number) => {
    const total = await User.countDocuments({});
    const userlist = await User.find({ isAdmin: false })
      .sort({ name: 1 })
      .skip(7 * (page - 1))
      .limit(7);
    return [userlist, { total: total }];
  };

  // admin 이름으로 유저 검색
  public adminReadUserByName = async (name: string) => {
    const user = await User.find({ name });
    return user;
  };

  // admin 유저정보 수정
  public adminUpdateUser = async (
    _id: string,
    {
      name,
      email,
      phoneNumber,
    }: { name: string; email: string; phoneNumber: string }
  ) => {
    const result = await User.updateOne(
      { _id },
      {
        name,
        email,
        phoneNumber,
      }
    );
    if (result.modifiedCount === 0) {
      throw new Error("수정할 내용이 없습니다.");
    }
    return {
      message: `해당 유저가 수정되었습니다. Update: ${result.acknowledged}, 수정된 attribute의 수: ${result.modifiedCount}`,
    };
  };

  // admin 유저 삭제
  public adminDeletedUser = async (_id: string) => {
    const deleteUser = await User.deleteOne({ _id });
    console.log(deleteUser);
    return {
      message: `해당 유저가 삭제되었습니다. Delete: ${deleteUser.acknowledged}, 삭제된 유저의 수: ${deleteUser.deletedCount}`,
    };
  };
}
