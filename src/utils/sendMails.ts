import nodemailer from 'nodemailer'

export const sendMail = async(email:string,otp:number)=>{
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.AUTH_EMAIL,
                pass:process.env.AUTH_PASS
            }
        })
        const mailOptions = {
            from:process.env.AUTH_EMAIL,
            to:email,
            subject:'Your OTP CODE',
            text:`Your OTP code is ${otp}`
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}