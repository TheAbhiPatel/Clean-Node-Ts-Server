"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const testAccount = {
    user: config_1.EMAIL_USER,
    pass: config_1.EMAIL_PASS,
};
const sendVerificationMail = (name, email, token, isVerification) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass, // generated ethereal password
        },
    });
    const verifyMail = `<h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900" style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-shadow:0 0 #0000; --tw-ring-inset:var(--tw-empty, ); --tw-ring-offset-width:0px; --tw-ring-offset-color:#fff; --tw-ring-color:rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow:0 0 #0000; --tw-ring-shadow:0 0 #0000; margin: 0px; font-size: 1.5rem; font-weight: 500; flex-grow: 1; line-height: 2rem; --tw-text-opacity:1; color: rgba(17,24,39,var(--tw-text-opacity)); padding-right: 4rem; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">  Hey <b>${name}</b>, <br> Please  verify your Email .</h1><button class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-shadow:0 0 #0000; --tw-ring-inset:var(--tw-empty, ); --tw-ring-offset-width:0px; --tw-ring-offset-color:#fff; --tw-ring-color:rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow:0 0 #0000; --tw-ring-shadow:0 0 #0000; font-family: inherit; font-size: 1.125rem; line-height: 1.75rem; margin: 0px; text-transform: none; appearance: button; background-color: rgba(99,102,241,var(--tw-bg-opacity)); background-image: none; cursor: pointer; padding: 0.5rem 2rem; color: rgba(255,255,255,var(--tw-text-opacity)); --tw-bg-opacity:1; border-radius: 0.25rem; flex-shrink: 0; --tw-text-opacity:1; orphans: 2; white-space: normal; widows: 2; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><a style="text-decoration: none; color:white;"  href="${config_1.FRONTEND_URL}/verification-mail/${token}">Verify</a></button>`;
    const forgetMail = `<h1 class="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900" style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-shadow:0 0 #0000; --tw-ring-inset:var(--tw-empty, ); --tw-ring-offset-width:0px; --tw-ring-offset-color:#fff; --tw-ring-color:rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow:0 0 #0000; --tw-ring-shadow:0 0 #0000; margin: 0px; font-size: 1.5rem; font-weight: 500; flex-grow: 1; line-height: 2rem; --tw-text-opacity:1; color: rgba(17,24,39,var(--tw-text-opacity)); padding-right: 4rem; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">  Hey <b>${name}</b>, <br> Please  Forget your password Here .</h1><button class="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0" style="box-sizing: border-box; border-width: 0px; border-style: solid; border-color: rgb(229, 231, 235); --tw-shadow:0 0 #0000; --tw-ring-inset:var(--tw-empty, ); --tw-ring-offset-width:0px; --tw-ring-offset-color:#fff; --tw-ring-color:rgba(59, 130, 246, 0.5); --tw-ring-offset-shadow:0 0 #0000; --tw-ring-shadow:0 0 #0000; font-family: inherit; font-size: 1.125rem; line-height: 1.75rem; margin: 0px; text-transform: none; appearance: button; background-color: rgba(99,102,241,var(--tw-bg-opacity)); background-image: none; cursor: pointer; padding: 0.5rem 2rem; color: rgba(255,255,255,var(--tw-text-opacity)); --tw-bg-opacity:1; border-radius: 0.25rem; flex-shrink: 0; --tw-text-opacity:1; orphans: 2; white-space: normal; widows: 2; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><a style="text-decoration: none; color:white;" href="${config_1.FRONTEND_URL}/forgat-password/${token}"><b>Forget Password</></a></button>`;
    let info = yield transporter.sendMail({
        from: '"TheAbhiPatel" <abhi@patel.com>',
        to: email,
        subject: "Please verifi your email Theabhipatel.com",
        html: isVerification ? verifyMail : forgetMail,
    });
    const PreviewURL = nodemailer_1.default.getTestMessageUrl(info);
    return PreviewURL;
});
exports.sendVerificationMail = sendVerificationMail;
