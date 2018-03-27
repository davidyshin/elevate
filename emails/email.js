const welcomeEmail = firstName => `
<table style = "background-color:#32BBDA;  width:80%; height:1000px; border-radius: 25px">
        <tr>
               <td align="center" ><img src="https://image.ibb.co/hMyhun/qK34BJA.png" style="width:5%;  height:25%;" > </td>
        </tr>
        <tr style = "background-color:#E5F6FA;" >
               <td style = "padding:40px; border-radius: 25px" > 
               <p> Hello ${firstName} </p>
               Welcome to Elevate. Thank you for setting up your account! With Elevate you will be able to: </p>
<ul>
<li> Receive notifications for important dates </li>
<li> Track each job application progress </li>
<li> Earn points towards your success!</li>
</ul> <br>
<p> Cheers, <br> The Reactors </p> </td>
        </tr>
        <tr>
               <td align="center"><img src="https://image.ibb.co/n6dFEn/Git_Hub_Mark_Light_120px_plus.png" style="width:5%;height:25%;"></td>
        </tr>
</table>
`;

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
