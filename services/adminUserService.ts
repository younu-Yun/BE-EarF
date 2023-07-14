import { User } from "../models";

export default class AdminService {
  public adminReadUser = async (page: number) => {
    const total = await User.countDocuments({});
    const userlist = await User.find({ isAdmin: false })
      .sort({ name: 1 })
      .skip(7 * (page - 1))
      .limit(7);
    return [userlist, { total: total }];
  };
}
