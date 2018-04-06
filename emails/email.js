const moment = require('moment');

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
`;

const reminder = (firstName, company_name, interview_date, interview_time) => `
<table style = "background-color:#283c53; font-family:sans-serif; color:#fefefe; border-radius:4px;">
  <tr>
    <td style = "text-align:center;">
      <p style = "font-size:36px;"><img src="https://image.ibb.co/hMyhun/qK34BJA.png" style="height:32px; width:32px; padding:0 22px;"/>Elevate</p>
    </td>
  </tr>

  <tr style="font-size:16px">
    <td style="padding:22px 32px; line-height:1.8;">
      <p>${firstName},</p>
      <p>This is a reminder that your interview with ${company_name} is coming up on ${moment(interview_date).format('dddd, MMMM Do YYYY')} at ${moment(interview_time, 'HH:mm').format('hh:mm a')}.</p>
      <p>Here are some resources to check out while preparing for your interview:</p>

      <ul>
        <li><a href="https://www.themuse.com/advice/10-types-of-interviews-and-how-to-ace-them" target="_blank" style="color:#3498db; text-decoration:none;">Ten Types of Interviews (and How to Ace Them)</a></li>
        <li><a href="https://www.themuse.com/advice/your-interview-checklist-what-to-remember-before-during-and-after" target="_blank" style="color:#3498db; text-decoration:none;">Your Interview Checklist: What to Remember Before, During, and After</a></li>
        <li><a href="https://www.themuse.com/advice/the-10-rules-of-interview-etiquette" target="_blank" style="color:#3498db; text-decoration:none;">The 10 Rules of Interview Etiquette</a></li>
      </ul>
      
      <p>You got this!</p>
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
`;


module.exports = {
        welcomeEmail: welcomeEmail,
        reminder: reminder
};
