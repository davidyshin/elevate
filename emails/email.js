const welcomeEmail = firstName => `
<table style = "background-color:#283c53; font-family:sans-serif; color:#fefefe; border-radius:4px;">
  <tr>
    <td style = "text-align:center;">
      <p style = "font-size:36px;"><img src="https://image.ibb.co/hMyhun/qK34BJA.png" style="height:32px; width:32px; padding:0 22px;"/>Elevate</p>
    </td>
  </tr>

  <tr style="font-size:16px">
    <td style="padding:22px 32px; line-height:1.8;">
      <p>${firstName},</p>
      <p>Thank you for signing up with Elevate. Now you'll be able to easily organize your job applications and manage your job search process. On top of that, you will:</p>
      
      <ul>
        <li>Receive reminders on your phone and/or email for important interview dates</li>
        <li>Track each job application progress</li>
        <li>Earn points and level up towards your success!</li>
      </ul>

      <p>Go ahead and <a href="http://elevate-ny.herokuapp.com/" target="_blank" style = "color:#3498db; text-decoration:none;">log your first job application.</a> Good luck on your job search journey.</p>

      <p>Cheers,</p>
      <p>Team Elevate</p>
    </td>
  </tr>

  <tr>
    <td style="text-align:center; padding:22px;">
      <a href="https://github.com/davidyshin/elevate" target="_blank">
        <img src="https://image.ibb.co/n6dFEn/Git_Hub_Mark_Light_120px_plus.png" style="height:40px; width:40px;"/>
        </a>
    </td>
  </tr>
</table>
`

// const welcomeEmail = firstName => `
// <table style = "background-color:#32BBDA;  width:80%; height:1000px; border-radius: 25px">
//   <tr>
//     <td align="center">
//       <img src="https://image.ibb.co/hMyhun/qK34BJA.png" style="width:5%;  height:25%;">
//     </td>
//   </tr>
//   <tr style = "background-color:#E5F6FA;">
//     <td style = "padding:40px; border-radius: 25px">
//       <p> Hello ${firstName} </p>
//       <p>Welcome to Elevate. Thank you for setting up your account! With Elevate you will be able to: </p>
//       <ul>
//         <li> Receive notifications for important dates </li>
//         <li> Track each job application progress </li>
//         <li> Earn points towards your success!</li>
//       </ul>
//       <br/>
//       <p> Cheers, 
//       <br/> 
//       Team Elevate
//       </p>
//   </td>
// </tr>
//         <tr>
//                <td align="center"><img src="https://image.ibb.co/n6dFEn/Git_Hub_Mark_Light_120px_plus.png" style="width:5%;height:25%;"></td>
//         </tr>
// </table>
// `;

const reminder = (firstName, company_name, interview_date, interview_time) =>
        `<table style = "background-color:#32BBDA;  width:80%; height:1000px; border-radius: 25px">
        <tr>
               <td align="center" ><img src="https://image.ibb.co/hMyhun/qK34BJA.png" style="width:5%;  height:25%;" > </td>
        </tr>
        <tr style = "background-color:#E5F6FA;" >
               <td style = "padding:40px; border-radius: 25px" > 
               <p> Hello ${firstName}</p>
               <p> This is a reminder for your interview with ${company_name} on ${interview_date} at ${interview_time}.<p>
               <p> Good Luck! </p>
               <p> -Team Elevate </p>
              </td>
        </tr>
        <tr>
               <td align="center"><img src="https://image.ibb.co/n6dFEn/Git_Hub_Mark_Light_120px_plus.png" style="width:5%;height:25%;"></td>
        </tr>
</table>
`;

module.exports = {
        welcomeEmail: welcomeEmail,
        reminder: reminder
};
