

const welcomeEmail = (firstName) => `
<table style = "background-color:#32BBDA;  width:80%; height:1000px; border-radius: 25px">
        <tr>
               <td align="center" ><img src="https://image.ibb.co/hMyhun/qK34BJA.png" style="width:5%;  height:25%;" > </td>
        </tr>
        <tr style = "background-color:#E5F6FA;" >
               <td style = "padding:40px; border-radius: 25px" > 
               <p> Hello ${firstName} </p>
               Welcome to Elevate. thank you for setting up your account with elevate you will be able to </p>
<ul>
<li> recieve notification for important dates </li>
<li> always follow up after interviews </li>
<li> track each job application progress </li>
<li> and earn points towards your success!!</li>
</ul> <br>
<p> all the best <br> the reactors </p> </td>
        </tr>
        <tr>
               <td align="center"><img src="https://image.ibb.co/n6dFEn/Git_Hub_Mark_Light_120px_plus.png" style="width:5%;height:25%;"></td>
        </tr>
</table>
`




const reminder = (firstName , company_name , interview_date , interview_time) => {

    `<table style = "background-color:#32BBDA;  width:80%; height:1000px; border-radius: 25px">
        <tr>
               <td align="center" ><img src="https://image.ibb.co/hMyhun/qK34BJA.png" style="width:5%;  height:25%;" > </td>
        </tr>
        <tr style = "background-color:#E5F6FA;" >
               <td style = "padding:40px; border-radius: 25px" > 
               <p> Hello ${firstName} </p>
               <p> This is a reminder that your interview with ${company_name} is next week ${interview_date} at ${interview_time}<p>
              </td>
        </tr>
        <tr>
               <td align="center"><img src="https://image.ibb.co/n6dFEn/Git_Hub_Mark_Light_120px_plus.png" style="width:5%;height:25%;"></td>
        </tr>
</table>
`

}


module.exports = {
    welcomeEmail: welcomeEmail,
    reminder:reminder
}