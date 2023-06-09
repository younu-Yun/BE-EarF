import nodemailer, { SentMessageInfo } from "nodemailer";
import mjml2html from "mjml";
import dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER_ID,
    pass: process.env.MAILER_PWD,
  },
});

let contentMessage = "";

const setMailOption = (
  to: string,
  subject: string,
  text: string
): Promise<string | undefined> => {
  const { html } = mjml2html(
    `
<mjml>
  <mj-head>
    <mj-font
      name="Pretendard"
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
    />

    <mj-attributes>
      <mj-all font-family="Pretendard, Arial" color="#404040" />
    </mj-attributes>

    <mj-style>
      * { word-break: keep-all; } a { color: #2563eb !important; }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <!-- Header -->
        <mj-image
          width="150px"
          src="https://user-images.githubusercontent.com/20244536/148511699-e4d03a86-7b71-40c4-9cda-975e64687ff0.png"
        ></mj-image>
        <mj-spacer height="20px"></mj-spacer>

        <!-- Main -->
        <mj-text font-size="16px" line-height="1.5">
          안녕하세요 EarF입니다!
        </mj-text>

        <mj-text font-size="16px" line-height="1.5">
          임시 비밀번호를 발급해드리겠습니다! <br>
          ${text} <br>
          ${contentMessage}
        </mj-text>

        <mj-text font-size="16px" line-height="1.5"> 지구를 지키자! EarF </mj-text>

        <!-- Footer -->
        <mj-divider border-color="#E5E7EB" border-width="1px"></mj-divider>

        <mj-text align="center" font-size="12px" line-height="1.75">
          <a
            href="https://www.peterkimzz.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            >웹사이트</a
          >
          <span>·</span>
          <a
            href="https://www.instagram.com/peterkimzz"
            target="_blank"
            rel="noopener noreferrer nofollow"
            >인스타그램</a
          >
        </mj-text>

        <mj-text
          align="center"
          font-family="Pretendard, Arial"
          font-size="12px"
          line-height="1"
        >
          © Peter Kim. All Rights Reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `
  );

  return new Promise((resolve, reject) => {
    const message = {
      from: process.env.MAILER_ID,
      to,
      subject,
      text,
      html: html,
    };

    transport.sendMail(message, (err, info: SentMessageInfo) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(info);
    });
  });
};

export default setMailOption;
