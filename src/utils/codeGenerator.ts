export  function generateVerificationCode():number{
    const verificationCode = Math.floor(10000 +Math.random() * 90000)
    return verificationCode
}