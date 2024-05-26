import { VNPay } from "vnpay";
import config from "../config";

const vnpay = new VNPay({
    tmnCode: config.payment.vnpay.tmnCode,
    secureSecret: config.payment.vnpay.secureSecret,
    api_Host: config.payment.vnpay.api_Host,
    testMode: config.payment.vnpay.api_Host.testMode,
    hashAlgorithm: config.payment.vnpay.api_Host.hashAlgorithm,
});

export default vnpay