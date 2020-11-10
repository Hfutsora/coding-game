const SMSClient = require('@alicloud/sms-sdk');
const accessKeyId = '';
const secretAccessKey = '';
const smsClient = new SMSClient({
    accessKeyId,
    secretAccessKey
});

const sendMessage = async function(type, tel, code) {
    const TemplateCode = 'SMS_129320007';
    const res = await smsClient.sendSMS({
        PhoneNumbers: tel,
        SignName: '编码青蛙',
        TemplateCode: TemplateCode,
        TemplateParam: `{"code": "${code}"}`
    });

    return res;
};


module.exports = {
    sendMessage
};
