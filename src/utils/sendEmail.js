import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export async function sendConfirmationEmail(to, confirmLink) {
    await transporter.sendMail({
        from: `"Ecommerce App" <${process.env.EMAIL_USER}>`,
        to,
        subject: "أكّد إيميلك",
        html: `
            <h2>أهلاً بيك!</h2>
            <p>دوس على اللينك ده عشان تأكد إيميلك:</p>
            <a href="${confirmLink}">${confirmLink}</a>
            <p>اللينك ده صالح لمدة يوم واحد بس.</p>
        `
    })
}
