/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReservationsGroupCreateResponse } from '../api';

interface EmailPreviewProps {
    isOpen: boolean;
    children: React.ReactNode;
    reservationDetails: ReservationsGroupCreateResponse;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ isOpen, children, reservationDetails }) => {
    if (!isOpen) return null;

    const { LastName, StartUtc, EndUtc, Number } = reservationDetails.Reservations[0];

    function formatUTCDate(utcDateString: string | number | Date) {
        const date = new Date(utcDateString);
        const dd = String(date.getUTCDate()).padStart(2, '0');
        const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = date.getUTCFullYear();
        return `${dd}-${mm}-${yyyy}`;
    }

    const formattedStartUtc = formatUTCDate(StartUtc);
    const formattedEndUtc = formatUTCDate(EndUtc);

    const emailHtml = `
    <head>
    <meta name="viewport" content="width=device-width"/>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
    <style>
     
              @font-face {
                  font-family: 'Montserrat';
                  src: url(https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600) format('woff2');
              }
              .raisedButtonContent a:visited {
                  color: #FFFFFF;
                  display: block;
                  text-decoration: none !important;
              }
              .ghostButtonContent a:visited {
                  color: #3E3BD9;
                  display: block;
                  text-decoration: none !important;
              }
              @media only screen and (max-width: 480px) {
                  body {
                      width: 100% !important;
                      min-width: 100% !important;
                  }
                  table#emailBody, table.flexibleContainer {
                      width: 100% !important;
                  }
                  img.flexibleImage {
                      height: auto !important;
                      width: 100% !important;
                  }
                  img.flexibleLogo {
                      height: 100% !important;
                      width: auto !important;
                  }
                  table.raisedButton {
                      width: 100% !important;
                  }
                  table.ghostButton {
                      width: 100% !important;
                  }
                  td.textContentLast, td.imageContentLast {
                      padding-top: 20px !important;
                  }
                  td.bodyCell {
                      padding-top: 16px !important;
                      padding-right: 16px !important;
                      padding-left: 16px !important;
                      padding-bottom: 16px !important;
                  }
                  h1 {
                      font-size: 30px;
                      line-height: 40px;
                  }
                  h2 {
                      text-align: center;
                      font-size: 24px;
                      line-height: 40px;
                  }
                  h3 {
                      text-align: left;
                      font-size: 18px;
                      line-height: 24px;
                  }
                  h4 {
                      text-align: left;
                      font-size: 16px;
                      line-height: 24px;
                  }
                  strong {
                      font-size: 24px;
                      line-height: 32px;
                      font-weight: 600;
                  }
              }
              a[x-apple-data-detectors], u + #body a, #MessageViewBody a, a[x-apple-data-detectors]:hover, u + #body a:hover, #MessageViewBody a:hover {
                  color: inherit !important;
                  text-decoration: inherit !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
              }
              .primaryLink, .primaryLink a {
                  font-weight: 600 !important;
                  -webkit-text-decoration: underline !important;
                  text-decoration: underline !important;
                  color: #3E3BD9 !important;
              }
              .primaryLink:hover, .primaryLink a:hover {
                  -webkit-text-decoration: none !important;
                  text-decoration: none !important;
              }
          
    </style>
    <!--[if mso 14]>
     <style>
      .flexibleContainer{display:block !important; width:100% !important;}
     </style>
    <![endif]-->
    <!--[if mso 12]>
     <style>
      .flexibleContainer{display:block !important; width:100% !important;}
     </style>
    <![endif]-->
    <!--[if mso]>
     <style>
      
              body {
                  font-family:SagoeUI, 'Helvetica Neue', sans-serif;
              }
              .raisedButtonContent {
                  padding: 16px !important;
              }
              .raisedButtonContent a {
                  color:#FFFFFF; display:block; text-decoration:none !important;
              }
              .raisedButtonContent a:visited {
                  color:#FFFFFF; display:block; text-decoration:none !important;
              }
              .ghostButtonContent {
                  padding: 16px !important;
              }
              .ghostButtonContent a {
                  color:#3E3BD9; display:block; text-decoration:none !important;
              }
              .ghostButtonContent a: visited {
                  color:#3E3BD9; display:block; text-decoration:none !important;
              }
          
     </style>
    <![endif]-->
   </head>
   <body style="margin: 0; padding: 0; background-color: #E5E5E5; font-family: &#39;Montserrat&#39;, &#39;Helvetica Neue&#39;, SagoeUI, sans-serif; color: #101B2C; height: 100%; width: 100%;">
    <script type="application/ld+json">
     [{"@context":"http://schema.org","@type":"LodgingReservation","reservationNumber":"249","reservationStatus":"http://schema.org/Confirmed","checkinDate":"2023-10-31T15:00:00Z","checkoutDate":"2023-11-02T12:00:00Z","modifiedTime":"2023-10-31T15:46:38Z","underName":{"@type":"Person","name":"${LastName}"},"reservationFor":{"@type":"LodgingBusiness","name":"Mews Hotel","telephone":"(555) 555-1234","address":{"@type":"PostalAddress","streetAddress":"Main Street 4860 test","addressLocality":"Berlin","addressRegion":"DE-BE","postalCode":"10557","addressCountry":"DE"}},"modifyReservationUrl":"https://app.mews-develop.com/User/SignIn/B73664CA4D5D46D28081B0AC010400B9-109631A64CB6D268C8B828E5B156564?utm_campaign=checkinCTA&utm_medium=email&utm_source=confirmation&language=en-US&enterpriseId=8d99755d-d50d-4c14-96fe-b06600962f8f"}]
    </script>
    <center>
     <table id="bodyTable" style="margin: 0; padding: 0; background-color: #E5E5E5; height: 100%; width: 100%;" width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
      <tbody>
       <tr>
        <td id="bodyCell" style="margin: 0; padding: 0; padding-top: 32px; padding-bottom: 32px; height: 100%; width: 100%;" width="100%" height="100%" align="center">
         <table id="emailBody" style="background-color: #FFFFFF; border-radius: 6px;" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tbody>
           <tr>
            <td id="bodyContent" style="padding-left: 16px; padding-right: 16px; height: 100%; width: 100%;" width="100%" height="100%" align="center">
             <table style="margin: 0; padding: 0; height: 100%; width: 100%;" width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
              <tbody>
               <tr>
                <td style="margin: 0; padding: 0; height: 100%; width: 100%;" width="100%" height="100%">
                 <tr>
                  <td style="padding-left: 24px; padding-right: 24px;" align="center">
                   <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                     <tr>
                      <td align="center">
                       <table class="flexibleContainer" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td/>
                             </tr>
                            </tbody>
                           </table>
                          </td>
                         </tr>
                        </tbody>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                 <tr>
                  <td align="center">
                   <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                     <tr>
                      <td align="center">
                       <table class="flexibleContainer" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td>
                               <div style="height: 0; overflow: hidden; margin-bottom: 24px; line-height: 0; font-size: 0;">
                                &nbsp;
                               </div>
                              </td>
                             </tr>
                            </tbody>
                           </table>
                          </td>
                         </tr>
                        </tbody>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                 <tr>
                  <td align="center">
                   <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                     <tr>
                      <td align="center">
                       <table class="flexibleContainer" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td>
                               <h2 style="margin: 0; padding: 0; text-align: center; font-size: 24px; line-height: 32px; font-weight: 600;">
                                Welcome to the Mews Kiosk Booth!
                               </h2>
                              </td>
                             </tr>
                            </tbody>
                           </table>
                          </td>
                         </tr>
                        </tbody>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                 <tr>
                  <td align="center">
                   <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                     <tr>
                      <td align="center">
                       <table class="flexibleContainer" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td align="center">
                               <div style="height: 0; overflow: hidden; margin-bottom: 16px; line-height: 0; font-size: 0;">
                                &nbsp;
                               </div>
                               <p style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 400; ">
                                This will be a demo displaying our new design and some great new features we have been working on!
                               </p>
                               <br>
                               <p style="margin: 0 0 8px 0; font-size: 16px; line-height: 24px; font-weight: 400;">
                                We have created a reservation for you starting from <b>${formattedStartUtc}</b> till <b>${formattedEndUtc}</b>
                               </p>
                               <p style="margin: 0 0 8px 0; font-size: 16px; line-height: 24px; font-weight: 400;">
                                Please tap on "<b>Check in</b>" on the kiosk to start the Check in flow.
                               </p>
                               <p style="margin: 0 8px 0; font-size: 16px; line-height: 24px; font-weight: 400;">
                                You can search for your reservation with your customers last name : <b>${LastName}</b>
                               </p>
                               <p style="margin: 0 8px 0; font-size: 16px; line-height: 24px; font-weight: 400;">
                                And if required the confirmation number which is : <b>${Number}</b>
                               </p>
                               <p style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 400; ">
                               Or
                               </p>
                               <p style="margin: 0 0 8px 0; font-size: 16px; line-height: 24px; font-weight: 400;">
                                You can tap on "<b>Search by QR code</b>" on the device and present it the QR code below.
                               </p>
                              </td>
                             </tr>
                            </tbody>
                           </table>
                          </td>
                         </tr>
                        </tbody>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                 </tr>
                 <tr>
                  <td align="center">
                   <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                     <tr>
                      <td align="center">
                       <table class="flexibleContainer" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                            </tbody>
                           </table>
                          </td>
                         </tr>
                        </tbody>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                 <tr>
                  <td align="center">
                   <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                     <tr>
                      <td align="center">
                       <table class="flexibleContainer" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td align="center">
                              </td>
                             </tr>
                            </tbody>
                           </table>
                          </td>
                         </tr>
                        </tbody>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                 <tr>
                  <td align="center">
                   <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                     <tr>
                      <td align="center">
                       <table class="flexibleContainer" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td align="center">
                              ${ReactDOMServer.renderToString(
                                  children as React.ReactElement<any, string | React.JSXElementConstructor<any>>
                              )}  
                              </td>
                             </tr>
                            </tbody>
                           </table>
                          </td>
                         </tr>
                        </tbody>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                
                 <tr>
                  <td align="center">
                   <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                     <tr>
                      <td align="center">
                       <table class="flexibleContainer" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td>
                               <div style="height: 0; overflow: hidden; margin-bottom: 16px; line-height: 0; font-size: 0;">
                                &nbsp;
                               </div>
                              </td>
                             </tr>
                            </tbody>
                           </table>
                          </td>
                         </tr>
                        </tbody>
                       </table>
                      </td>
                     </tr>
                    </tbody>
                   </table>
                  </td>
                 </tr>
                </td>
               </tr>
              </tbody>
             </table>
            </td>
           </tr>
          </tbody>
         </table>
        </td>
       </tr>
      </tbody>
     </table>
    </center>
   </body>
  </html>
  `;

    return (
        <div className="overlay">
            <div className="content">
                <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
            </div>
        </div>
    );
};

export default EmailPreview;
