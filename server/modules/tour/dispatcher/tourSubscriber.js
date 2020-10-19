import 'dotenv/config';
import amqplib from'amqplib';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';


// Setup nodemailer transport
const transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
}));


const tourSubscriber = async (next) => {
    try {
        // Name of queue
        const q = 'tour';

        // connect to amqplib server
        const conn = await amqplib.connect(process.env.amqplib);

        // Create channel
        const ch = await conn.createChannel();

        // Ensure queue for messages and Ensure that the queue is not deleted when server restarts
        await ch.assertQueue(q, {durable: true});

        // Only request 1 unacked message from queue
        // This value indicates how many messages we want to process in parallel
        await ch.prefetch(1);

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

        // Set up callback to handle messages received from the queue
        ch.consume(q, async function (msg) {
            console.log(" [x] Received %s", msg.content.toString());

            const qm = JSON.parse(msg.content.toString());

            const {user_name, customer_name, email, title, charges, date, time, phone, reference} = qm;

            const mailOption = {
                from: process.env.USER,
                to: `${email}`,
                subject: `${subject}`,
                text: `Hi, ${user_name}, 
                    Tour: 
                    Customer: ${customer_name}, 
                    Charge: ${charges},
                    Date: ${date}
                    Time: ${time}
                    Phone: ${phone}
                    Property:
                    Title: ${title}
                    Ref: ${reference}
                    `,
                html: `<html lang="en">
                <head>
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <!-- Facebook sharing information tags -->
                  <meta property="og:title" content="Inquiry Email" />
                  <title>Tour</title>
                  <style type="text/css">
                    #outlook a {
                      padding: 0;
                    }
                    body {
                      width: 100% !important;
                    }
                    .ReadMsgBody {
                      width: 100%;
                    }
                    .ExternalClass {
                      width: 100%;
                    }
                    body {
                      -webkit-text-size-adjust: none;
                    }
                    body {
                      margin: 0;
                      padding: 0;
                    }
                    img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                    }
                    table td {
                      border-collapse: collapse;
                    }
                    #backgroundTable {
                      height: 100% !important;
                      margin: 0;
                      padding: 0;
                      width: 100% !important;
                    }
                    /*
                  @tab Page
                  @section background color
                  @tip Set the background color for your email. You may want to choose one that matches your company's branding.
                  @theme page
                  */
                    body,
                    #backgroundTable {
                      /*@editable*/
                      background-color: #fafafa;
                    }
                    /*
                  @tab Page
                  @section email border
                  @tip Set the border for your email.
                  */
                    #templateContainer {
                      /*@editable*/
                      border: 1px none #dddddd;
                    }
                    /*
                  @tab Page
                  @section heading 1
                  @tip Set the styling for all first-level headings in your emails. These should be the largest of your headings.
                  @style heading 1
                  */
                    h1,
                    .h1 {
                      /*@editable*/
                      color: #202020;
                      display: block;
                      /*@editable*/
                      font-family: Arial;
                      /*@editable*/
                      font-size: 24px;
                      /*@editable*/
                      font-weight: bold;
                      /*@editable*/
                      line-height: 100%;
                      margin-top: 20px;
                      margin-right: 0;
                      margin-bottom: 20px;
                      margin-left: 0;
                      /*@editable*/
                      text-align: center;
                    }
                    /*
                  @tab Page
                  @section heading 2
                  @tip Set the styling for all second-level headings in your emails.
                  @style heading 2
                  */
                    h2,
                    .h2 {
                      /*@editable*/
                      color: #202020;
                      display: block;
                      /*@editable*/
                      font-family: Arial;
                      /*@editable*/
                      font-size: 30px;
                      /*@editable*/
                      font-weight: bold;
                      /*@editable*/
                      line-height: 100%;
                      margin-top: 0;
                      margin-right: 0;
                      margin-bottom: 10px;
                      margin-left: 0;
                      /*@editable*/
                      text-align: center;
                    }
                    /*
                  @tab Page
                  @section heading 3
                  @tip Set the styling for all third-level headings in your emails.
                  @style heading 3
                  */
                    h3,
                    .h3 {
                      /*@editable*/
                      color: #202020;
                      display: block;
                      /*@editable*/
                      font-family: Arial;
                      /*@editable*/
                      font-size: 26px;
                      /*@editable*/
                      font-weight: bold;
                      /*@editable*/
                      line-height: 100%;
                      margin-top: 0;
                      margin-right: 0;
                      margin-bottom: 10px;
                      margin-left: 0;
                      /*@editable*/
                      text-align: center;
                    }
                    /*
                  @tab Page
                  @section heading 4
                  @tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings.
                  @style heading 4
                  */
                    h4,
                    .h4 {
                      /*@editable*/
                      color: #202020;
                      display: block;
                      /*@editable*/
                      font-family: Arial;
                      /*@editable*/
                      font-size: 22px;
                      /*@editable*/
                      font-weight: bold;
                      /*@editable*/
                      line-height: 100%;
                      margin-top: 0;
                      margin-right: 0;
                      margin-bottom: 10px;
                      margin-left: 0;
                      /*@editable*/
                      text-align: center;
                    }
                    /*
                  @tab Header
                  @section preheader style
                  @tip Set the background color for your email's preheader area.
                  @theme page
                  */
                    #templatePreheader {
                      /*@editable*/
                      background-color: #fafafa;
                    }
                    /*
                  @tab Header
                  @section preheader text
                  @tip Set the styling for your email's preheader text. Choose a size and color that is easy to read.
                  */
                    .preheaderContent div {
                      /*@editable*/
                      color: #505050;
                      /*@editable*/
                      font-family: Arial;
                      /*@editable*/
                      font-size: 10px;
                      /*@editable*/
                      line-height: 100%;
                      /*@editable*/
                      text-align: left;
                    }
                    /*
                  @tab Header
                  @section preheader link
                  @tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text.
                  */
                    .preheaderContent div a:link,
                    .preheaderContent div a:visited,
                    .preheaderContent div a .yshortcuts {
                      /*@editable*/
                      color: #336699;
                      /*@editable*/
                      font-weight: normal;
                      /*@editable*/
                      text-decoration: underline;
                    }
                    .preheaderContent img {
                      display: inline;
                      height: auto;
                      margin-bottom: 10px;
                      max-width: 280px;
                    }
                    /*
                  @tab Header
                  @section header style
                  @tip Set the background color and border for your email's header area.
                  @theme header
                  */
                    #templateHeader {
                      /*@editable*/
                      background-color: #ffffff;
                      /*@editable*/
                      border-bottom: 0;
                    }
                    /*
                  @tab Header
                  @section header text
                  @tip Set the styling for your email's header text. Choose a size and color that is easy to read.
                  */
                    .headerContent {
                      /*@editable*/
                      color: #202020;
                      /*@editable*/
                      font-family: Arial;
                      /*@editable*/
                      font-size: 34px;
                      /*@editable*/
                      font-weight: bold;
                      /*@editable*/
                      line-height: 100%;
                      /*@editable*/
                      padding: 0;
                      /*@editable*/
                      text-align: left;
                      /*@editable*/
                      vertical-align: middle;
                      background-color: #fafafa;
                      padding-bottom: 14px;
                    }
                    /*
                  @tab Header
                  @section header link
                  @tip Set the styling for your email's header links. Choose a color that helps them stand out from your text.
                  */
                    .headerContent a:link,
                    .headerContent a:visited,
                    .headerContent a .yshortcuts {
                      /*@editable*/
                      color: #336699;
                      /*@editable*/
                      font-weight: normal;
                      /*@editable*/
                      text-decoration: underline;
                    }
                    #headerImage {
                      height: auto;
                      max-width: 400px !important;
                    }
                    /*
                  @tab Body
                  @section body style
                  @tip Set the background color for your email's body area.
                  */
                    #templateContainer,
                    .bodyContent {
                      /*@editable*/
                      background-color: #ffffff;
                    }
                    /*
                  @tab Body
                  @section body text
                  @tip Set the styling for your email's main content text. Choose a size and color that is easy to read.
                  @theme main
                  */
                    .bodyContent div {
                      /*@editable*/
                      color: #505050;
                      /*@editable*/
                      font-family: Arial;
                      /*@editable*/
                      font-size: 14px;
                      /*@editable*/
                      line-height: 150%;
                      /*@editable*/
                      text-align: left;
                    }
                    /*
                  @tab Body
                  @section body link
                  @tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text.
                  */
                    .bodyContent div a:link,
                    .bodyContent div a:visited,
                    .bodyContent div a .yshortcuts {
                      /*@editable*/
                      color: #336699;
                      /*@editable*/
                      font-weight: normal;
                      /*@editable*/
                      text-decoration: underline;
                    }
                    .bodyContent img {
                      display: inline;
                      height: auto;
                      margin-bottom: 10px;
                      max-width: 280px;
                    }
                    /*
                  @tab Footer
                  @section footer style
                  @tip Set the background color and top border for your email's footer area.
                  @theme footer
                  */
                    #templateFooter {
                      /*@editable*/
                      background-color: #ffffff;
                      /*@editable*/
                      border-top: 0;
                    }
                    /*
                  @tab Footer
                  @section footer text
                  @tip Set the styling for your email's footer text. Choose a size and color that is easy to read.
                  @theme footer
                  */
                    .footerContent {
                      background-color: #fafafa;
                    }
                    .footerContent div {
                      /*@editable*/
                      color: #707070;
                      /*@editable*/
                      font-family: Arial;
                      /*@editable*/
                      font-size: 11px;
                      /*@editable*/
                      line-height: 150%;
                      /*@editable*/
                      text-align: left;
                    }
                    /*
                  @tab Footer
                  @section footer link
                  @tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text.
                  */
                    .footerContent div a:link,
                    .footerContent div a:visited,
                    .footerContent div a .yshortcuts {
                      /*@editable*/
                      color: #336699;
                      /*@editable*/
                      font-weight: normal;
                      /*@editable*/
                      text-decoration: underline;
                    }
                    .footerContent img {
                      display: inline;
                    }
                    /*
                  @tab Footer
                  @section social bar style
                  @tip Set the background color and border for your email's footer social bar.
                  @theme footer
                  */
                    #social {
                      /*@editable*/
                      background-color: #fafafa;
                      /*@editable*/
                      border: 0;
                    }
                    /*
                  @tab Footer
                  @section social bar style
                  @tip Set the background color and border for your email's footer social bar.
                  */
                    #social div {
                      /*@editable*/
                      text-align: left;
                    }
                    /*
                  @tab Footer
                  @section utility bar style
                  @tip Set the background color and border for your email's footer utility bar.
                  @theme footer
                  */
                    #utility {
                      /*@editable*/
                      background-color: #ffffff;
                      /*@editable*/
                      border: 0;
                    }
                    /*
                  @tab Footer
                  @section utility bar style
                  @tip Set the background color and border for your email's footer utility bar.
                  */
                    #utility div {
                      /*@editable*/
                      text-align: left;
                    }
                    #monkeyRewards img {
                      display: inline;
                      height: auto;
                      max-width: 280px;
                    }
              
                    /*
                  ATAVIST CUSTOM STYLES 
                   */
              
                    .buttonText {
                      color: #4a90e2;
                      text-decoration: none;
                      font-weight: normal;
                      display: block;
                      border: 2px solid #585858;
                      padding: 10px 80px;
                      font-family: Arial;
                    }
              
                    #supportSection,
                    .supportContent {
                      background-color: white;
                      font-family: arial;
                      font-size: 12px;
                      border-top: 1px solid #e4e4e4;
                    }
              
                    .bodyContent table {
                      padding-bottom: 10px;
                    }
              
                    .footerContent p {
                      margin: 0;
                      margin-top: 2px;
                    }
              
                    .headerContent.centeredWithBackground {
                      background-color: #f4eee2;
                      text-align: center;
                      padding-top: 20px;
                      padding-bottom: 20px;
                    }
              
                    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
                      h1 {
                        font-size: 40px !important;
                      }
              
                      .content {
                        font-size: 22px !important;
                      }
              
                      .bodyContent p {
                        font-size: 22px !important;
                      }
              
                      .buttonText {
                        font-size: 22px !important;
                      }
              
                      p {
                        font-size: 16px !important;
                      }
              
                      .footerContent p {
                        padding-left: 5px !important;
                      }
              
                      .mainContainer {
                        padding-bottom: 0 !important;
                      }
                    }
                  </style>
                </head>
              
                <body
                  leftmargin="0"
                  marginwidth="0"
                  topmargin="0"
                  marginheight="0"
                  offset="0"
                  style="
                    width: 100%;
                    -webkit-text-size-adjust: none;
                    margin: 0;
                    padding: 0;
                    background-color: #fafafa;
                  "
                >
                  <center>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      height="100%"
                      width="100%"
                      id="backgroundTable"
                      style="
                        height: 100%;
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        background-color: #fafafa;
                      "
                    >
                      <tr>
                        <td align="center" valign="top" style="border-collapse: collapse">
                          <!-- // Begin Template Preheader \\ -->
                          <table
                            border="0"
                            cellpadding="10"
                            cellspacing="0"
                            width="450"
                            id="templatePreheader"
                            style="background-color: #fafafa"
                          >
                            <tr>
                              <td
                                valign="top"
                                class="preheaderContent"
                                style="border-collapse: collapse"
                              >
                                <!-- // Begin Module: Standard Preheader \\ -->
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  width="100%"
                                >
                                  <tr>
                                    <td valign="top" style="border-collapse: collapse">
                                      <!-- <div mc:edit="std_preheader_content">
                                                                   Use this area to offer a short teaser of your email's content. Text here will show in the preview area of some email clients.
                                                                </div>
                                                                -->
                                    </td>
                                  </tr>
                                </table>
                                <!-- // End Module: Standard Preheader \\ -->
                              </td>
                            </tr>
                          </table>
                          <!-- // End Template Preheader \\ -->
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="450"
                            id="templateContainer"
                            style="border: 1px none #dddddd; background-color: #ffffff"
                          >
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="border-collapse: collapse"
                              >
                                <!-- // Begin Template Header \\ -->
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="450"
                                  id="templateHeader"
                                  style="background-color: #ffffff; border-bottom: 0"
                                >
                                  <tr>
                                    <td
                                      class="headerContent centeredWithBackground"
                                      style="
                                        border-collapse: collapse;
                                        color: #202020;
                                        font-family: Arial;
                                        font-size: 34px;
                                        font-weight: bold;
                                        line-height: 100%;
                                        padding: 0;
                                        text-align: center;
                                        vertical-align: middle;
                                        background-color: #f4eee2;
                                        padding-bottom: 20px;
                                        padding-top: 20px;
                                      "
                                    >
                                      <!-- // Begin Module: Standard Header Image \\ -->
                                      <img
                                        width="130"
                                        src="https://res.cloudinary.com/abdraqeeb/image/upload/v1602156894/logo_efv2ye.svg"
                                        style="
                                          width: 130px;
                                          max-width: 130px;
                                          border: 0;
                                          height: auto;
                                          line-height: 100%;
                                          outline: none;
                                          text-decoration: none;
                                        "
                                        id="headerImage campaign-icon"
                                      />
                                      <!-- // End Module: Standard Header Image \\ -->
                                    </td>
                                  </tr>
                                </table>
                                <!-- // End Template Header \\ -->
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="border-collapse: collapse"
                              >
                                <!-- // Begin Template Body \\ -->
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="450"
                                  id="templateBody"
                                >
                                  <tr>
                                    <td
                                      valign="top"
                                      class="bodyContent"
                                      style="
                                        border-collapse: collapse;
                                        background-color: #ffffff;
                                      "
                                    >
                                      <!-- // Begin Module: Standard Content \\ -->
                                      <table
                                        border="0"
                                        cellpadding="20"
                                        cellspacing="0"
                                        width="100%"
                                        style="padding-bottom: 10px"
                                      >
                                        <tr>
                                          <td
                                            valign="top"
                                            style="
                                              padding-bottom: 1rem;
                                              border-collapse: collapse;
                                            "
                                            class="mainContainer"
                                          >
                                            <div
                                              style="
                                                text-align: center;
                                                color: #505050;
                                                font-family: Arial;
                                                font-size: 14px;
                                                line-height: 150%;
                                              "
                                            >
                                              <h3
                                                class="h1"
                                                style="
                                                  color: #202020;
                                                  display: block;
                                                  font-family: Arial;
                                                  font-size: 24px;
                                                  font-weight: bold;
                                                  line-height: 100%;
                                                  margin-top: 20px;
                                                  margin-right: 0;
                                                  margin-bottom: 20px;
                                                  margin-left: 0;
                                                  text-align: left;
                                                "
                                              >
                                                Hi, ${user_name}
                                              </h3>
              
                                              <!-- <h2 class="h2">Heading 2</h2>
                                                                              <h3 class="h3">Heading 3</h3>
                                                                              <h4 class="h4">Heading 4</h4> -->
                                              <p style="text-align: justify;">
                                               You have a new tour booking with your property: ${title} with reference ${reference}. <br/>
                                               Requester: ${customer_name} <br/>
                                               Charges: ${charges} <br/>
                                               Date: ${date} <br />
                                               Time: ${time} <br />
                                               Phone: ${phone} <br />
                                               Kindly accept or reject the tour
                                              </p
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            align="center"
                                            style="border-collapse: collapse"
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="padding-bottom: 10px"
                                            >
                                              <tbody>
                                                <tr align="center">
                                                  <td
                                                    align="center"
                                                    valign="middle"
                                                    style="border-collapse: collapse"
                                                  >
                                                    <a
                                                      class="buttonText"
                                                      href="#"
                                                      target="_blank"
                                                      style="
                                                        color: #4a90e2;
                                                        text-decoration: none;
                                                        font-weight: normal;
                                                        display: block;
                                                        border: 2px solid #585858;
                                                        padding: 10px 80px;
                                                        font-family: Arial;
                                                      "
                                                      >Accept</a
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            align="center"
                                            style="border-collapse: collapse"
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="padding-bottom: 10px"
                                            >
                                              <tbody>
                                                <tr align="center">
                                                  <td
                                                    align="center"
                                                    valign="middle"
                                                    style="border-collapse: collapse"
                                                  >
                                                    <a
                                                      class="buttonText"
                                                      href="#"
                                                      target="_blank"
                                                      style="
                                                        color: #4a90e2;
                                                        text-decoration: none;
                                                        font-weight: normal;
                                                        display: block;
                                                        border: 2px solid #585858;
                                                        padding: 10px 80px;
                                                        font-family: Arial;
                                                      "
                                                      >Reject</a
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            align="center"
                                            style="border-collapse: collapse"
                                          ></td>
                                        </tr>
                                      </table>
                                      <!-- // End Module: Standard Content \\ -->
                                    </td>
                                  </tr>
                                </table>
                                <!-- // End Template Body \\ -->
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="border-collapse: collapse"
                              >
                                <!-- // Begin Support Section \\ -->
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  width="450"
                                  id="supportSection"
                                  style="
                                    background-color: white;
                                    font-family: arial;
                                    font-size: 12px;
                                    border-top: 1px solid #e4e4e4;
                                  "
                                >
                                  <tr>
                                    <td
                                      valign="top"
                                      class="supportContent"
                                      style="
                                        border-collapse: collapse;
                                        background-color: white;
                                        font-family: arial;
                                        font-size: 12px;
                                        border-top: 1px solid #e4e4e4;
                                      "
                                    >
                                      <!-- // Begin Module: Standard Footer \\ -->
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            valign="top"
                                            width="100%"
                                            style="border-collapse: collapse"
                                          >
                                            <br />
                                            <div style="text-align: center; color: #c9c9c9">
                                              <p>
                                                Questions? Get your answers here:&nbsp;
                                                <a
                                                  href="#"
                                                  style="
                                                    color: #4a90e2;
                                                    font-weight: normal;
                                                    text-decoration: underline;
                                                    font-size: 12px;
                                                  "
                                                  >Help Center</a
                                                >.
                                              </p>
                                            </div>
                                            <br />
                                          </td>
                                        </tr>
                                      </table>
                                      <!-- // End Module: Standard Footer \\ -->
                                    </td>
                                  </tr>
                                </table>
                                <!-- // Begin Support Section \\ -->
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                valign="top"
                                style="border-collapse: collapse"
                              >
                                <!-- // Begin Template Footer \\ -->
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  width="450"
                                  id="templateFooter"
                                  style="background-color: #ffffff; border-top: 0"
                                >
                                  <tr>
                                    <td
                                      valign="top"
                                      class="footerContent"
                                      style="
                                        padding-left: 0;
                                        border-collapse: collapse;
                                        background-color: #fafafa;
                                      "
                                    >
                                      <div
                                        style="
                                          text-align: center;
                                          color: #c9c9c9;
                                          font-family: Arial;
                                          font-size: 11px;
                                          line-height: 150%;
                                        "
                                      >
                                        <p
                                          style="
                                            text-align: center;
                                            margin: 0;
                                            margin-top: 2px;
                                          "
                                        >
                                          &nbsp; Rent | Copyright © 2020 | All rights reserved
                                        </p>
                                      </div>
                                      <!-- // End Module: Standard Footer \\ -->
                                    </td>
                                  </tr>
                                </table>
                                <!-- // End Template Footer \\ -->
                              </td>
                            </tr>
                          </table>
                          <br />
                        </td>
                      </tr>
                    </table>
                  </center>
                </body>
              </html>
              `
            };

            // Send the message using the previously set up Nodemailer transport
            await transport.sendMail(mailOption, (err, info) => {
                if (err) {
                    console.error(err.stack);
                    // put the failed message item back to queue
                    return ch.nack(msg);
                }

                console.log('Delivered message %s', info.messageId);
                // remove message item from the queue
                ch.ack(msg);
            });
        });

    } catch (e) {
        return next(e);
    }
};

export default tourSubscriber;