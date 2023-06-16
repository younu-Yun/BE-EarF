export const randomPassword = (): string => {
  const ranValue1: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];
  const ranValue2: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const ranValue3: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const ranValue4: string[] = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
  ];

  let tempPw: string = "";

  for (let i = 0; i < 2; i++) {
    const ranPick1: number = Math.floor(Math.random() * ranValue1.length);
    const ranPick2: number = Math.floor(Math.random() * ranValue2.length);
    const ranPick3: number = Math.floor(Math.random() * ranValue3.length);
    const ranPick4: number = Math.floor(Math.random() * ranValue4.length);
    tempPw +=
      ranValue1[ranPick1] +
      ranValue2[ranPick2] +
      ranValue3[ranPick3] +
      ranValue4[ranPick4];
  }

  // 문자열을 배열로 변환하여 재섞음
  const tempPwArray: string[] = tempPw.split("");
  for (let i = tempPwArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [tempPwArray[i], tempPwArray[j]] = [tempPwArray[j], tempPwArray[i]];
  }

  return tempPwArray.join("");
};
