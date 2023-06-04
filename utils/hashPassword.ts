import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("비밀번호를 해싱하는 동안 오류가 발생했습니다.");
  }
};
