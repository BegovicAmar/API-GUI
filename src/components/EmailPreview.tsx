/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ReservationsGroupCreateResponse } from '../api';

interface EmailPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    reservationDetails: ReservationsGroupCreateResponse;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ isOpen, onClose, children, reservationDetails }) => {
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
                               <p class="text-center" style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 400; text-align: center;">
                                <img class="flexibleLogo" style="border: 0; -ms-interpolation-mode: bicubic; height: auto; max-height: 48px; outline: none; text-decoration: none;" height="48" src="https://cdn.mews-develop.com/Media/Image/add03d91-d806-4fc2-80b3-b0660096da23?Mode=Fit&amp;Height=160&amp;Width=320" alt=""/>
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
                                Your reservation is confirmed!
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
                               <p style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 400; ">
                                Thanks for booking your stay at Mews Hotel. We hope you&#39;re just as excited as we are.
                               </p>
                               <div style="height: 0; overflow: hidden; margin-bottom: 16px; line-height: 0; font-size: 0;">
                                &nbsp;
                               </div>
                               <p style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 400; ">
                                Start getting ready now. Don&#39;t put away your travel documents just yet! When you stay with us, we need a little bit of info from you (sorry — it&#39;s the law).
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
                              <td align="center">
                               <strong style="font-size: 18px; line-height: 24px; font-weight: 600;">
                                Add your info now, so you won&#39;t have to when you arrive.
                               </strong>
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
                              <td align="center">
                               <table width="100%" height="16" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td align="center">
                                   &nbsp;
                                  </td>
                                 </tr>
                                </tbody>
                               </table>
                               <table class="ghostButton button" style="background-color: #FFFFFF; border: 1px solid; border-color: #3E3BD9; border-collapse: separate; border-radius: 6px;" width="260" height="0" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td class="ghostButtonContent" style="color: #3E3BD9; font-size: 18px; font-weight: bold; line-height: 100%; text-align: center;" align="center">
                                   <a style="color: #3E3BD9; display: block; text-decoration: none; padding: 16px;" href=""; class="disabled">
                                    Manage reservation
                                   </a>
                                  </td>
                                 </tr>
                                </tbody>
                               </table>
                               <table width="100%" height="16" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td align="center">
                                   &nbsp;
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
                              <td align="center">
                               <table width="100%" height="16" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td align="center">
                                   &nbsp;
                                  </td>
                                 </tr>
                                </tbody>
                               </table>
                               <table class="raisedButton button" style="background-color: #3E3BD9; border-collapse: separate; border-radius: 6px;" width="260" height="0" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td class="raisedButtonContent" style="color: #FFFFFF; font-size: 18px; font-weight: bold; line-height: 100%; text-align: center;" align="center">
                                   <a style="color: #FFFFFF; display: block; text-decoration: none; padding: 16px;" href=""; class="disabled">
                                    Add your info
                                   </a>
                                  </td>
                                 </tr>
                                </tbody>
                               </table>
                               <table width="100%" height="16" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td align="center">
                                   &nbsp;
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
                               <strong style="font-size: 18px; line-height: 24px; font-weight: 600;">
                                Reservation details
                               </strong>
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
                       <table class="flexibleContainer" style="border-radius: 4px;background: #ecf3fe;padding-top: 8px;" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                         <tr>
                          <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                           <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td>
                               <table class="content-table" style="width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr class="content-table-row">
                                  <td class="table-left-col" style="padding: 8px 0px; text-align: left;" align="left">
                                   <strong style="font-size: 18px; line-height: 24px; font-weight: 600;">
                                    Guests
                                   </strong>
                                  </td>
                                  <td class="table-right-col" style="padding: 8px 0px 8px 16px; text-align: right;" align="right">
                                   <strong style="font-size: 18px; line-height: 24px; font-weight: 600;">
                                    Total price
                                   </strong>
                                  </td>
                                 </tr>
                                 <tr class="content-table-row">
                                  <td class="table-left-col" style="padding: 8px 0px; text-align: left;" align="left">
                                   1
                                  </td>
                                  <td class="table-right-col" style="padding: 8px 0px 8px 16px; text-align: right;" align="right">
                                   €200.00
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
                   <tr>
                    <td align="center">
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
                                   <strong class="low" style="font-size: 16px; line-height: 24px; font-weight: 500;">
                                    ${formattedStartUtc} - ${formattedEndUtc}
                                   </strong>
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
                                   <div style="height: 0; overflow: hidden; margin-bottom: 8px; line-height: 0; font-size: 0;">
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
                           <table class="flexibleContainer" style="border-radius: 4px;border: 1px solid #e0e0e1;padding-top: 8px;" width="560" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody>
                             <tr>
                              <td class="flexibleContainerCell" style="padding-left: 8px; padding-right: 8px;" width="560" align="center">
                               <table width="100%" height="100%" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td>
                                   <strong style="font-size: 18px; line-height: 24px; font-weight: 600;">
                                    Room 1
                                   </strong>
                                   <div style="height: 0; overflow: hidden; margin-bottom: 8px; line-height: 0; font-size: 0;">
                                    &nbsp;
                                   </div>
                                   <table style="width: 100%; padding: 8px 0px; border-collapse: collapse; border-spacing: 0;" width="100%" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                     <tr style="border-collapse: collapse; border-spacing: 0;">
                                      <td style="padding: 0; border-collapse: collapse; border-spacing: 0;">
                                       <table style="width: 100%; padding: 0; border-collapse: collapse; border-spacing: 0;" width="100%">
                                        <tbody>
                                         <tr style="padding: 0; border-collapse: collapse; border-spacing: 0;">
                                          <td style="text-align: left; padding: 0; white-space: nowrap; border-collapse: collapse; border-spacing: 0;" align="left">
                                           <table>
                                            <tbody>
                                             <tr>
                                              <td>
                                               <img style="height: 12px; width: 12px;" width="12" height="12" src="https://cdn.mews-develop.com/Content/Platform/Images/adult-icon.png?v=0ef0a5e" alt="Adult"/>
                                              </td>
                                              <td>
                                               <span class="label" style="font-size: 14px; line-height: 21px; font-weight: 400;">
                                                1
                                               </span>
                                              </td>
                                             </tr>
                                            </tbody>
                                           </table>
                                          </td>
                                          <td style="text-align: right; padding: 0; white-space: nowrap; border-collapse: collapse; border-spacing: 0;" align="right">
                                           <span>
                                            <span class="label" style="font-size: 14px; line-height: 21px; font-weight: 400;">
                                             €200.00
                                            </span>
                                            <sup>
                                             <span class="label" style="font-size: 14px; line-height: 21px; font-weight: 400;">
                                              1
                                             </span>
                                            </sup>
                                           </span>
                                          </td>
                                         </tr>
                                        </tbody>
                                       </table>
                                      </td>
                                     </tr>
                                     <tr style="width: 100%; border-collapse: collapse; border-spacing: 0;">
                                      <td style="width: 100%; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;" width="100%">
                                       <span class="label secondary" style="font-size: 14px; line-height: 21px; font-weight: 400; color: #5F646D;">
                                        Confirmation number: ${Number}
                                       </span>
                                      </td>
                                     </tr>
                                     <tr style="width: 100%; border-collapse: collapse; border-spacing: 0;">
                                      <td style="width: 100%; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;" width="100%">
                                       <span class="label secondary" style="font-size: 14px; line-height: 21px; font-weight: 400; color: #5F646D;">
                                        ${LastName}
                                       </span>
                                      </td>
                                     </tr>
                                    </tbody>
                                   </table>
                                   <div style="height: 0; overflow: hidden; margin-bottom: 8px; line-height: 0; font-size: 0;">
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
                                  <td style="vertical-align: top;">
                                   <span class="caption secondary" style="font-size: 14px; line-height: 21px; font-weight: 400; color: #5F646D;">
                                    1
                                   </span>
                                  </td>
                                  <td style="padding-left: 8px; width: 100%;">
                                   <strong class="low" style="font-size: 16px; line-height: 24px; font-weight: 500;">
                                    Fully Flexible
                                   </strong>
                                  </td>
                                 </tr>
                                 <tr>
                                  <td>
                                   
                                  </td>
                                  <td style="padding-left: 8px; width: 100%;">
                                   <span class="caption secondary" style="font-size: 14px; line-height: 21px; font-weight: 400; color: #5F646D;">
                                    
                                   </span>
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
                              <td align="center">
                               <strong style="font-size: 18px; line-height: 24px; font-weight: 600;">
                                Need anything?
                               </strong>
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
                              <td align="center">
                               <table width="100%" height="16" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td align="center">
                                   &nbsp;
                                  </td>
                                 </tr>
                                </tbody>
                               </table>
                               <table class="ghostButton button" style="background-color: #FFFFFF; border: 1px solid; border-color: #3E3BD9; border-collapse: separate; border-radius: 6px;" width="260" height="0" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td class="ghostButtonContent" style="color: #3E3BD9; font-size: 18px; font-weight: bold; line-height: 100%; text-align: center;" align="center">
                                   <a style="color: #3E3BD9; display: block; text-decoration: none; padding: 16px;" href=""; class="disabled">
                                    Chat with us
                                   </a>
                                  </td>
                                 </tr>
                                </tbody>
                               </table>
                               <table width="100%" height="16" role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                 <tr>
                                  <td align="center">
                                   &nbsp;
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
                              <td align="center">
                               <strong style="font-size: 18px; line-height: 24px; font-weight: 600;">
                                Use a self-serve kiosk to check in fast
                               </strong>
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
                               <p style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 400; ">
                                Scan this QR code on arrival.
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
                               <p style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 400; ">
                                Kind regards,
                                <br/>
                                Mews Hotel
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
                              <td align="center">
                               <a href=""; class="disabled">
                                <img style="border: 0; -ms-interpolation-mode: bicubic; height: auto; max-width: 120px; width: 120px; outline: none; text-decoration: none;" width="120" src="https://cdn.mews-develop.com/Content/Platform/Images/add-to-apple-wallet-logo.png?v=0ef0a5e" alt="Add to apple wallet"/>
                               </a>
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
                               <span class="caption secondary" style="font-size: 14px; line-height: 21px; font-weight: 400; color: #5F646D;">
                                Don&#39;t share or forward this email, it allows access to your profile and personal information.
                               </span>
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
                <button onClick={onClose} className="close-button">
                    &#10006;
                </button>
                <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
            </div>
        </div>
    );
};

export default EmailPreview;
