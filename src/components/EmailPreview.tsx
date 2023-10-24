/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
/* eslint-disable react/no-danger */
import React from 'react';

interface EmailPreviewProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const emailHtml = `
    ﻿<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
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
   [{"@context":"http://schema.org","@type":"LodgingReservation","reservationNumber":"195","reservationStatus":"http://schema.org/Confirmed","checkinDate":"2023-10-23T15:00:00Z","checkoutDate":"2023-10-25T12:00:00Z","modifiedTime":"2023-10-23T15:23:10Z","underName":{"@type":"Person","name":"New"},"reservationFor":{"@type":"LodgingBusiness","name":"Mews Hotel","telephone":"(555) 555-1234","address":{"@type":"PostalAddress","streetAddress":"Main Street 4860 test","addressLocality":"Berlin","addressRegion":"DE-BE","postalCode":"10557","addressCountry":"DE"}},"modifyReservationUrl":"https://app.mews-develop.com/User/SignIn/3E57DEEC4A274CCCA11AB0A400FD8E44-DFCA3158B3C3647CA41109760A035B4?utm_campaign=checkinCTA&utm_medium=email&utm_source=confirmation&language=en-US&enterpriseId=8d99755d-d50d-4c14-96fe-b06600962f8f"},{"@context":"http://schema.org","@type":"LodgingReservation","reservationNumber":"196","reservationStatus":"http://schema.org/Confirmed","checkinDate":"2023-10-27T15:00:00Z","checkoutDate":"2023-10-28T12:00:00Z","modifiedTime":"2023-10-23T15:23:10Z","underName":{"@type":"Person","name":"New"},"reservationFor":{"@type":"LodgingBusiness","name":"Mews Hotel","telephone":"(555) 555-1234","address":{"@type":"PostalAddress","streetAddress":"Main Street 4860 test","addressLocality":"Berlin","addressRegion":"DE-BE","postalCode":"10557","addressCountry":"DE"}},"modifyReservationUrl":"https://app.mews-develop.com/User/SignIn/3E57DEEC4A274CCCA11AB0A400FD8E44-DFCA3158B3C3647CA41109760A035B4?utm_campaign=checkinCTA&utm_medium=email&utm_source=confirmation&language=en-US&enterpriseId=8d99755d-d50d-4c14-96fe-b06600962f8f"},{"@context":"http://schema.org","@type":"LodgingReservation","reservationNumber":"197","reservationStatus":"http://schema.org/Confirmed","checkinDate":"2023-10-29T15:00:00Z","checkoutDate":"2023-10-30T12:00:00Z","modifiedTime":"2023-10-23T15:23:10Z","underName":{"@type":"Person","name":"New"},"reservationFor":{"@type":"LodgingBusiness","name":"Mews Hotel","telephone":"(555) 555-1234","address":{"@type":"PostalAddress","streetAddress":"Main Street 4860 test","addressLocality":"Berlin","addressRegion":"DE-BE","postalCode":"10557","addressCountry":"DE"}},"modifyReservationUrl":"https://app.mews-develop.com/User/SignIn/3E57DEEC4A274CCCA11AB0A400FD8E44-DFCA3158B3C3647CA41109760A035B4?utm_campaign=checkinCTA&utm_medium=email&utm_source=confirmation&language=en-US&enterpriseId=8d99755d-d50d-4c14-96fe-b06600962f8f"}]
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
                              <img class="flexibleLogo" style="border: 0; -ms-interpolation-mode: bicubic; height: auto; max-height: 48px; outline: none; text-decoration: none;" height="48" src="" alt=""/>
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
                                 6
                                </td>
                                <td class="table-right-col" style="padding: 8px 0px 8px 16px; text-align: right;" align="right">
                                 €400.00
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
                                  Oct 23 2023 - Oct 25 2023
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
                                             <img style="height: 12px; width: 12px;" width="12" height="12" src="https://cdn.mews-develop.com/Content/Platform/Images/adult-icon.png?v=79e64f8a" alt="Adult"/>
                                            </td>
                                            <td>
                                             <span class="label" style="font-size: 14px; line-height: 21px; font-weight: 400;">
                                              2
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
                                      Confirmation number: 195
                                     </span>
                                    </td>
                                   </tr>
                                   <tr style="width: 100%; border-collapse: collapse; border-spacing: 0;">
                                    <td style="width: 100%; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;" width="100%">
                                     <span class="label secondary" style="font-size: 14px; line-height: 21px; font-weight: 400; color: #5F646D;">
                                      New
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
                                <td>
                                 <strong class="low" style="font-size: 16px; line-height: 24px; font-weight: 500;">
                                  Oct 27 2023 - Oct 28 2023
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
                                             <img style="height: 12px; width: 12px;" width="12" height="12" src="https://cdn.mews-develop.com/Content/Platform/Images/adult-icon.png?v=79e64f8a" alt="Adult"/>
                                            </td>
                                            <td>
                                             <span class="label" style="font-size: 14px; line-height: 21px; font-weight: 400;">
                                              2
                                             </span>
                                            </td>
                                           </tr>
                                          </tbody>
                                         </table>
                                        </td>
                                        <td style="text-align: right; padding: 0; white-space: nowrap; border-collapse: collapse; border-spacing: 0;" align="right">
                                         <span>
                                          <span class="label" style="font-size: 14px; line-height: 21px; font-weight: 400;">
                                           €100.00
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
                                      Confirmation number: 196
                                     </span>
                                    </td>
                                   </tr>
                                   <tr style="width: 100%; border-collapse: collapse; border-spacing: 0;">
                                    <td style="width: 100%; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;" width="100%">
                                     <span class="label secondary" style="font-size: 14px; line-height: 21px; font-weight: 400; color: #5F646D;">
                                      New
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
                                <td>
                                 <strong class="low" style="font-size: 16px; line-height: 24px; font-weight: 500;">
                                  Oct 29 2023 - Oct 30 2023
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
                                             <img style="height: 12px; width: 12px;" width="12" height="12" src="https://cdn.mews-develop.com/Content/Platform/Images/adult-icon.png?v=79e64f8a" alt="Adult"/>
                                            </td>
                                            <td>
                                             <span class="label" style="font-size: 14px; line-height: 21px; font-weight: 400;">
                                              2
                                             </span>
                                            </td>
                                           </tr>
                                          </tbody>
                                         </table>
                                        </td>
                                        <td style="text-align: right; padding: 0; white-space: nowrap; border-collapse: collapse; border-spacing: 0;" align="right">
                                         <span>
                                          <span class="label" style="font-size: 14px; line-height: 21px; font-weight: 400;">
                                           €100.00
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
                                      Confirmation number: 197
                                     </span>
                                    </td>
                                   </tr>
                                   <tr style="width: 100%; border-collapse: collapse; border-spacing: 0;">
                                    <td style="width: 100%; margin: 0; padding: 0; border-collapse: collapse; border-spacing: 0;" width="100%">
                                     <span class="label secondary" style="font-size: 14px; line-height: 21px; font-weight: 400; color: #5F646D;">
                                      New
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
                            <td>
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
                             <img style="width:276px;height:276px" src="data: image/png; base64,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" alt="QR code"/>
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
                              <img style="border: 0; -ms-interpolation-mode: bicubic; height: auto; max-width: 120px; width: 120px; outline: none; text-decoration: none;" width="120" src="https://cdn.mews-develop.com/Content/Platform/Images/add-to-apple-wallet-logo.png?v=79e64f8a" alt="Add to apple wallet"/>
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
                    Close
                </button>
                <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
            </div>
        </div>
    );
};

export default EmailPreview;
