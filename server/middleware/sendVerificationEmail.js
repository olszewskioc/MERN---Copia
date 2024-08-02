import nodemailer from 'nodemailer';

// sspw khnl fhlo qkgu
// thiagotechlines@gmail.com
export const sendVerificationEmail = (token, email, name) => {
    const html = `
    <html>
    <head>
    <title>Verify Email</title>
    </head>
    <body>
        <h3>Dear ${name},</h3>
        <p>Thanks for subscribe in Tech Lines!</p> <br>
        <p>Please click on the given link to verify your email.</p>
        <a href="http://localhost:3000/email-verify/${token}">Click Here</a>
        <p>If the link doesn't work copy and paste this link in your browser:</p>
        <p>http://localhost:3000/email-verify/${token}</p>
        <p>Thanks,</p>
        <p>Team</p>
    </body>
    </html>
    `;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "thiagotechlines@gmail.com",
            pass: "sspw khnl fhlo qkgu",
        },
    });

    const mailOptions = {
        from: '"Techlines Support 💻" <thiagotechlines@gmail.com>',
        to: email,
        subject: "Verify Email",
        html: html,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent to ${email}`);
            console.log(`${info.response}`);
        };
    })

}