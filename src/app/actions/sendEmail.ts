// "use server";

// import { EmailTemplate } from "@/components/ui/emailTemplate";
// import config from "@/config";
// import { Resend } from "resend";

// const resend = new Resend(config.RESEND_KEY);

// export const sendEmail = async (email: string) => {
//    try {
//       const { data, error } = await resend.emails.send({
//          // @ts-ignore
//          from: config.EMAIL_FROM,
//          to: email,
//          subject: "Verify your email address",
//          react: EmailTemplate({ firstName: "John" }),
//       });

//       if (error) {
//          return Response.json({ error }, { status: 500 });
//       }
//       return Response.json(data);
//    } catch (error) {
//       return Response.json({ error }, { status: 500 });
//    }
// };
