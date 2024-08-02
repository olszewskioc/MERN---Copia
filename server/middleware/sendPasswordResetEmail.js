import nodemailer from 'nodemailer';

// sspw khnl fhlo qkgu
// thiagotechlines@gmail.com
export const sendPasswordResetEmail = (token, email, name, id) => {
    const html = `
    <html>
    <head>
    <title>Change Password</title>
    </head>
    <body>
        <h3>Dear ${name},</h3>
        <p>Please click on the given link to verify your email.</p>
        <a href="http://localhost:3000/password-reset/${token}">Click Here</a>
        <p>If the link doesn't work copy and paste this link in your browser:</p>
        <p>http://localhost:3000/password-reset/${token}</p>
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
        subject: "Reset Password Request",
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