import axios from 'axios';

/*
badge_id: 1 === Account Created
badge_id: 2 === 1st job app logged
badge_id: 3 === 25 job app logs 
badge_id: 4 === 50 job app logs 
badge_id: 5 === 100 job app logs 
badge_id: 6 === 200 job app logs 
badge_id: 7 === 300 job app logs 
badge_id: 8 === 400 job app logs 
badge_id: 9 === 500 job app logs
badge_id: 10 === 1st saved
badge_id: 11 === 5 interviews saved
badge_id: 12 === 15 interviews saved
*/
/* Takes a badge_id as an argument and makes a post request 
adds logged in user_id and badge_id into the achievement_badges_earned table
*/
const addAchievement = badge_id => {
  axios
    .post('/users/addAchievement', {
      badge_id: badge_id /* Badge_id */
    })
    .catch(err => {
      console.log(err);
    });
};

/*
checkJobNumber is to check the number of the job apps submitted, there is
a switch statement for each case

Function will be called as soon as user clicks "Save" on the first state of the AddJobForm
*/
const checkJobNumber = () => {
  axios
    .get('/users/getAllUserApps')
    .then(res => {
      let jobs = res.data.apps;
      console.log(jobs.length);
      switch (jobs.length) {
        case 1:
          console.log(jobs.length);
          addAchievement(2); // badge_id for 1st job app submitted
          console.log('First Job Application Logged');
          break;
        case 25: // badge_id for 25 job apps submitted
          addAchievement(3);
          console.log('25th Job Application Logged');
          break;
        case 50: // badge_id for 50 job apps submitted
          addAchievement(4);
          console.log('50th Job Application Logged');
          break;
        case 100: // badge_id for 100 job apps submitted
          addAchievement(5);
          console.log('100th Job Application Logged');
          break;
        case 200: // badge_id for 200 job apps submitted
          addAchievement(6);
          console.log('200th Job Application Logged');
          break;
        case 300: // badge_id for 300 job apps submitted
          addAchievement(7);
          console.log('300th Job Application Logged');
          break;
        case 400: // badge_id for 400 job apps submitted
          addAchievement(8);
          console.log('400th Job Application Logged');
          break;
        case 500: // badge_id for 500 job apps submitted
          addAchievement(9);
          console.log('500th Job Application Logged');
          break;
        default:
          console.log('No Achievements earned for jobs logged');
          break;
      }
    })
    .catch(err => {
      console.log(`Error getting all user job applications: `, err);
    });
};

/* 
checkInterviewNumber is to check the number of the interviews saved, 
there is a switch statement for each case

Function will be called as soon as user clicks "Save" on interview stage
*/

const checkInterviewNumber = () => {
  axios
    .get('/users/getUserInterviews')
    .then(res => {
      let interviews = res.data.interviews;
      console.log(interviews.length);
      switch (interviews.length) {
        case 1:
          console.log('First Interview Logged');
          addAchievement(10); // badge_id for 1st interview saved
          break;
        case 5: // badge_id for 5 interviews saved
          console.log('5th Interview Logged');
          addAchievement(11);
          break;
        case 10: // badge_id for 10 interviews saved
          console.log('10th Interview Logged');
          addAchievement(12);
          break;
        default:
          console.log('No Achievements earned for interviews saved');
          break;
      }
    })
    .catch(err => {
      console.log(`Error getting all user job applications: `, err);
    });
};

const checkForFirstRejection = () => {
  axios
    .get('/users/getAllUserApps')
    .then(data => {
      let jobs = data.data.apps;
      jobs.forEach(job => {
        if (job.job_status === 'rejected') {
          return;
        } else {
          axios
            .get('/users/getUserAchieves')
            .then(res => {
              let { achieves } = res.data;
              if (!achieves.find(achieve => achieve.badge_id === 14)) {
                console.log('First Rejection!')
                addAchievement(14);
              } else {
                return;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export default {
  checkJobNumber,
  checkInterviewNumber,
  addAchievement,
  checkForFirstRejection
};
