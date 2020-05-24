var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
const nodemailer = require("nodemailer");

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const emailTemplate= `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"> <head><!--[if gte mso 9]><xml ><o:OfficeDocumentSettings ><o:AllowPNG/><o:PixelsPerInch >96</o:PixelsPerInch ></o:OfficeDocumentSettings ></xml ><! [endif]--> <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/> <meta content="width=device-width" name="viewport"/> <meta content="IE=edge" http-equiv="X-UA-Compatible"/> <title></title> <style type="text/css"> body{margin: 0; padding: 0;}table, td, tr{vertical-align: top; border-collapse: collapse;}*{line-height: inherit;}a[x-apple-data-detectors="true"]{color: inherit !important; text-decoration: none !important;}</style> <style id="media-query" type="text/css"> @media (max-width: 660px){.block-grid, .col{min-width: 320px !important; max-width: 100% !important; display: block !important;}.block-grid{width: 100% !important;}.col{width: 100% !important;}.col > div{margin: 0 auto;}img.fullwidth, img.fullwidthOnMobile{max-width: 100% !important;}.no-stack .col{min-width: 0 !important; display: table-cell !important;}.no-stack.two-up .col{width: 50% !important;}.no-stack .col.num4{width: 33% !important;}.no-stack .col.num8{width: 66% !important;}.no-stack .col.num4{width: 33% !important;}.no-stack .col.num3{width: 25% !important;}.no-stack .col.num6{width: 50% !important;}.no-stack .col.num9{width: 75% !important;}.video-block{max-width: none !important;}.mobile_hide{min-height: 0px; max-height: 0px; max-width: 0px; display: none; overflow: hidden; font-size: 0px;}.desktop_hide{display: block !important; max-height: none !important;}}</style> </head> <body class="clean-body" style=" margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f8f8f9; " > <table bgcolor="#f8f8f9" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style=" table-layout: fixed; vertical-align: top; min-width: 320px; margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top;" valign="top"> <div style="background-color: #b01c1c;"> <div class="block-grid" style=" margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #b01c1c; " > <div style=" border-collapse: collapse; display: table; width: 100%; background-color: #b01c1c; " > <div class="col num12" style=" min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 0px; padding-bottom: 0px; padding-right: 0px; padding-left: 0px; " > <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 4px solid #b01c1c; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div><div style="background-color: #fff;"> <div class="block-grid" style=" margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #fff; " > <div style=" border-collapse: collapse; display: table; width: 100%; background-color: #fff; " > <div class="col num12" style=" min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 0px; padding-bottom: 0px; padding-right: 0px; padding-left: 0px; " > <div align="center" class="img-container center autowidth" style="padding-right: 0px; padding-left: 0px;" > <div style="font-size: 1px; line-height: 22px;"></div><!-- <img align="center" alt="I'm an image" border="0" class="center autowidth" src="cid:Companify-Logo" style=" text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 149px; display: block; " title="I'm an image" width="149"/> --> <div style="font-size: 1px; line-height: 25px;"></div></div></div></div></div></div></div></div><div style="background-color: transparent;"> <div class="block-grid" style=" margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f8f8f9; " > <div style=" border-collapse: collapse; display: table; width: 100%; background-color: #f8f8f9; " > <div class="col num12" style=" min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 5px; padding-bottom: 5px; padding-right: 0px; padding-left: 0px; " > <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #bbbbbb; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div><div style="background-color: transparent;"> <div class="block-grid" style=" margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #fff; " > <div style=" border-collapse: collapse; display: table; width: 100%; background-color: #fff; " > <div class="col num12" style=" min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 0px; padding-bottom: 0px; padding-right: 0px; padding-left: 0px; " > <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 60px; padding-right: 0px; padding-bottom: 12px; padding-left: 0px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #bbbbbb; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> <div align="center" class="img-container center fixedwidth" style="padding-right: 40px; padding-left: 40px;" ><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 40px;padding-left: 40px;" align="center"><! [endif]--><img align="center" alt="I'm an image" border="0" class="center fixedwidth" src="cid:Img62x" style=" text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 352px; display: block; " title="I'm an image" width="352"/> </div><table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 50px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #bbbbbb; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> <div style=" color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; line-height: 1.2; padding-top: 10px; padding-right: 25px; padding-bottom: 10px; padding-left: 25px; " > <div style=" line-height: 1.2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px; " > <p style=" font-size: 30px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 36px; margin: 0; " > <span style="font-size: 30px; color: #b01c1c;" ><strong >We’d love to hear your thoughts</strong ></span > </p></div></div><div style=" color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; line-height: 1.5; padding-top: 10px; padding-right: 40px; padding-bottom: 10px; padding-left: 40px; " > <div style=" line-height: 1.5; font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; mso-line-height-alt: 18px; " > <p style=" font-size: 15px; line-height: 1.5; text-align: center; word-break: break-word; font-family: inherit; mso-line-height-alt: 23px; margin: 0; " > <span style="color: #808389; font-size: 15px;" >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodati mat tempor incididunt ut labore et dolore magna aliqua.</span > </p></div></div><table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 30px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #bbbbbb; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div><div style="background-color: transparent;"> <div class="block-grid three-up no-stack" style=" margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #fff; " > <div style=" border-collapse: collapse; display: table; width: 100%; background-color: #fff; " > <div class="col num4" style=" max-width: 320px; min-width: 213px; display: table-cell; vertical-align: top; width: 213px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 5px; padding-bottom: 5px; padding-right: 0px; padding-left: 20px; " > <div align="center" class="img-container center fixedwidth" style="padding-right: 0px; padding-left: 0px;" ><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><! [endif]--><img align="center" alt="I'm an image" border="0" class="center fixedwidth" src="cid:Horrible2x" style=" text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 144px; display: block; " title="I'm an image" width="144"/> </div><div style=" color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; line-height: 1.2; padding-top: 15px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; " > <div style=" line-height: 1.2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px; " > <p style=" font-size: 15px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 18px; margin: 0; " > <span style="font-size: 15px; color: #b01c1c;" ><strong>Horrible</strong></span > </p></div></div></div></div></div><div class="col num4" style=" max-width: 320px; min-width: 213px; display: table-cell; vertical-align: top; width: 213px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 5px; padding-bottom: 5px; padding-right: 10px; padding-left: 10px; " > <div align="center" class="img-container center fixedwidth" style="padding-right: 0px; padding-left: 0px;" ><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><! [endif]--><img align="center" alt="I'm an image" border="0" class="center fixedwidth" src="cid:Good" style=" text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 144px; display: block; " title="I'm an image" width="144"/> </div><div style=" color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; line-height: 1.2; padding-top: 15px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; " > <div style=" line-height: 1.2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px; " > <p style=" font-size: 15px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 18px; margin: 0; " > <span style="font-size: 15px; color: #b01c1c;" ><strong>Was OK</strong></span > </p></div></div></div></div></div><div class="col num4" style=" max-width: 320px; min-width: 213px; display: table-cell; vertical-align: top; width: 213px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 5px; padding-bottom: 5px; padding-right: 20px; padding-left: 0px; " > <div align="center" class="img-container center fixedwidth" style="padding-right: 0px; padding-left: 0px;" ><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><! [endif]--><img align="center" alt="I'm an image" border="0" class="center fixedwidth" src="cid:Brilliant2x" style=" text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 144px; display: block; " title="I'm an image" width="144"/> </div><div style=" color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; line-height: 1.2; padding-top: 15px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; " > <div style=" line-height: 1.2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px; " > <p style=" font-size: 15px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 18px; margin: 0; " > <span style="font-size: 15px; color: #b01c1c;" ><strong>Brilliant</strong></span > </p></div></div></div></div></div></div></div></div><div style="background-color: transparent;"> <div class="block-grid" style=" margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #fff; " > <div style=" border-collapse: collapse; display: table; width: 100%; background-color: #fff; " > <div class="col num12" style=" min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 0px; padding-bottom: 0px; padding-right: 0px; padding-left: 0px; " > <div align="center" class="button-container" style=" padding-top: 40px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px; " > <div style=" text-decoration: none; display: inline-block; color: #ffffff; background-color: #b01c1c; border-radius: 60px; -webkit-border-radius: 60px; -moz-border-radius: 60px; width: auto; width: auto; border-top: 1px solid #b01c1c; border-right: 1px solid #b01c1c; border-bottom: 1px solid #b01c1c; border-left: 1px solid #b01c1c; padding-top: 15px; padding-bottom: 15px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all; " > <span style=" padding-left: 30px; padding-right: 30px; font-size: 16px; display: inline-block; " ><span style=" font-size: 16px; margin: 0; line-height: 2; word-break: break-word; mso-line-height-alt: 32px; " ><strong>Share Your Feedback</strong></span ></span > </div></div><table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 60px; padding-right: 0px; padding-bottom: 12px; padding-left: 0px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #bbbbbb; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div><div style="background-color: transparent;"> <div class="block-grid" style=" margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f8f8f9; " > <div style=" border-collapse: collapse; display: table; width: 100%; background-color: #f8f8f9; " > <div class="col num12" style=" min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 5px; padding-bottom: 5px; padding-right: 0px; padding-left: 0px; " > <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #bbbbbb; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> </div></div></div></div></div></div><div style="background-color: transparent;"> <div class="block-grid" style=" margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #b01c1c; " > <div style=" border-collapse: collapse; display: table; width: 100%; background-color: white; " > <div class="col num12" style=" min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px; " > <div style="width: 100% !important;"> <div style=" border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top: 0px; padding-bottom: 0px; padding-right: 0px; padding-left: 0px; " > <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 4px solid #b01c1c; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> <div align="center" class="img-container center autowidth" style="padding-right: 0px; padding-left: 0px;" ><!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><! [endif]--><img align="center" alt="I'm an image" border="0" class="center autowidth" src="cid:footer" style=" text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: 100px; width: 100%; max-width: 640px; object-fit: cover; display: block; " title="I'm an image" width="640"/> </div><div align="center" class="img-container center autowidth" style="padding-right: 0px; padding-left: 0px;" > <div style="font-size: 1px; line-height: 40px;"></div><!-- <img align="center" alt="Alternate text" border="0" class="center autowidth" src="cid:Logo-white" style=" text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 149px; display: block; " title="Alternate text" width="149"/> --> </div><table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td style=" word-break: break-word; vertical-align: top; padding-top: 28px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px; " valign="top" > <table align="center" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0; " valign="top" > <tbody> <tr align="center" style=" vertical-align: top; display: inline-block; text-align: center; " valign="top" > <td style=" word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 5px; padding-left: 5px; " valign="top" > <a href="https://www.facebook.com/" target="_blank" ><img alt="Facebook" height="32" src="cid:facebook2x" style=" text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block; " title="Facebook" width="32"/></a> </td><td style=" word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 5px; padding-left: 5px; " valign="top" > <a href="https://twitter.com/" target="_blank" ><img alt="Twitter" height="32" src="cid:twitter2x" style=" text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block; " title="Twitter" width="32"/></a> </td><td style=" word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 5px; padding-left: 5px; " valign="top" > <a href="https://instagram.com/" target="_blank" ><img alt="Instagram" height="32" src="cid:instagram2x" style=" text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block; " title="Instagram" width="32"/></a> </td><td style=" word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 5px; padding-left: 5px; " valign="top" > <a href="https://www.linkedin.com/" target="_blank" ><img alt="LinkedIn" height="32" src="cid:linkedin2x" style=" text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block; " title="LinkedIn" width="32"/></a> </td></tr></tbody> </table> </td></tr></tbody> </table> <div style=" color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; line-height: 1.5; padding-top: 15px; padding-right: 40px; padding-bottom: 10px; padding-left: 40px; " > <div style=" line-height: 1.5; font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; mso-line-height-alt: 18px; " > <p style=" font-size: 12px; line-height: 1.5; word-break: break-word; text-align: left; font-family: inherit; mso-line-height-alt: 18px; margin: 0; " > <span style="color: #b01c1c; font-size: 12px;" >Secret Santa is Foobar initiative. Let's spread happiness this Holiday Season!</span > </p></div></div><table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top"> <td class="divider_inner" style=" word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 25px; padding-right: 40px; padding-bottom: 10px; padding-left: 40px; " valign="top" > <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style=" table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #555961; width: 100%; " valign="top" width="100%" > <tbody> <tr style="vertical-align: top;" valign="top" > <td style=" word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; " valign="top" > <span></span> </td></tr></tbody> </table> </td></tr></tbody> </table> <div style=" color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; line-height: 1.2; padding-top: 20px; padding-right: 40px; padding-bottom: 30px; padding-left: 40px; " > <div style=" line-height: 1.2; font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; mso-line-height-alt: 14px; " > <p style=" font-size: 12px; line-height: 1.2; word-break: break-word; text-align: left; font-family: inherit; mso-line-height-alt: 14px; margin: 0; " > <span style="color: #b01c1c; font-size: 12px;" >Secret Santa Copyright © 2020</span > </p></div></div></div></div></div></div></div></div></td></tr></tbody> </table> </body></html>`,
const emailAssets = [
    {
      filename: "images/secret-santa.jpg",
      path: "./email-assets/images/secret-santa.jpg",
      cid: "Img62x",
    },
    {
      filename: "images/Horrible2x.jpg",
      path: "./email-assets/images/Horrible2x.jpg",
      cid: "Horrible2x",
    },
    {
      filename: "images/Good.jpg",
      path: "./email-assets/images/Good.jpg",
      cid: "Good",
    },
    {
      filename: "images/Brilliant2x.jpg",
      path: "./email-assets/images/Brilliant2x.jpg",
      cid: "Brilliant2x",
    },
    {
      filename: "images/banner-1.png",
      path: "./email-assets/images/banner-1.png",
      cid: "footer",
    },
    {
      filename: "images/facebook2x.png",
      path: "./email-assets/images/facebook2x.png",
      cid: "facebook2x",
    },
    {
      filename: "images/twitter2x.png",
      path: "./email-assets/images/twitter2x.png",
      cid: "twitter2x",
    },
    {
      filename: "images/instagram2x.png",
      path: "./email-assets/images/instagram2x.png",
      cid: "instagram2x",
    },
    {
      filename: "images/linkedin2x.png",
      path: "./email-assets/images/linkedin2x.png",
      cid: "linkedin2x",
    },
  ];
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Creating the Gmail transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  requireTLS: true,
  auth: {
    user: "secret.santa.foobar@gmail.com",
    pass: "Karuna@1912",
  },
});

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
      var port = server.address().port;
      console.log("App now running on port", port);
    });
  }
);

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function (req, res) {
  db.collection(CONTACTS_COLLECTION)
    .find({})
    .toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get contacts.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/api/contacts", function (req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (
      err,
      doc
    ) {
      if (err) {
        handleError(res, err.message, "Failed to create new contact.");
      } else {
        let mailOptions = {
          from: "secret.santa.foobar@gmail.com",
          to: newContact.email,
          subject: "HO HO HO!",
        //   text: `Hi ${newContact.name}! Welcome to Secret Santa`,
          html: emailTemplate,
          attachments: emailAssets
        };
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log("error occurred", err);
          } else {
            console.log("Email sent!");
          }
        });
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function (req, res) {
  db.collection(CONTACTS_COLLECTION).findOne(
    { _id: new ObjectID(req.params.id) },
    function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get contact");
      } else {
        res.status(200).json(doc);
      }
    }
  );
});

app.put("/api/contacts/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne(
    { _id: new ObjectID(req.params.id) },
    updateDoc,
    function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update contact");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    }
  );
});

app.delete("/api/contacts/:id", function (req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne(
    { _id: new ObjectID(req.params.id) },
    function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(req.params.id);
      }
    }
  );
});
