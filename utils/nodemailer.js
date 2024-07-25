const nodemailer = require("nodemailer");

const sendmail = async (res, user, url) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "radheshyamlodhi48@gmail.com",
                pass: "ubgr biga fiiq pnrf",
            },
        });

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: "radheshyamlodhi48@gmail.com", // sender address
                to: user.email, // list of receivers
                subject: "click below to change the password ", // Subject line
                text: "", // plain text body
                html: `<a href="${url}">reset password </a>`, // html body
            });
            user.resetToken = 1;
            await user.save();
            res.send("Message sent  check your spam");
            // console.log(user.resetToken);
        }
        main().catch(console.error);
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = sendmail;
