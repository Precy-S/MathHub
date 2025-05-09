# Project Update Plan

This project will be updated to include persistent data. This persistent data shall be user account login data to be used by the server to log the user back into their own account: to be able to review back mistakes and their correct answers, and associate scores with their usernames.

To execute the gathering of this data, we will have a 'sign up' and 'log in' portion in our website, modifying MathHub's header. Additionally, we would convert all of the .html files we have into .hbs. This is so that we can make use of handlebars to incorporate the histroy of scores of the user.

The history of the user's scores in the game will be in a separate webpage. The user can access their scores by logging in to their account and clicking the "your scores" section in the game which will direct them to their score history.

## Data

Type of data: User account login data<br>
Purpose: To log in to the site; have access to history, and have scores links to own username

Structure in JSON format:<br>
"accounts": {<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "username": {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"password": text-string, <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email": email-formatted-text-string, <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"profile": first-two-letters-of-username-as-text-string<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"scores": numerical-array<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "username2": {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"password": text-string, <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email": email-formatted-text-string, <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"profile": first-two-letters-of-username-as-text-string<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"scores": numerical-array<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
}
   
example:<br>
"accounts": {<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "Math Nerd": {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"password": "ultr4m4thm4thn3rdthr33th0us4nd", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email": "hubforhighschoolmath@gmail.com", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"profile": "Ma"<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"scores": [4,2,6,9,10,14,15]<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "OtherNerd": {<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"password": "0th3erN3rd", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"email": "otherthernerd@yahoo.com", <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"profile": "Ot"<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"scores": [1,4,3,5,7,8,10]<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>
}

   
## Wireframes

![Glitch](https://cdn.glitch.global/7919643d-61cc-4c44-b0db-a7659a47c000/a34c0065-3e7f-4c69-a080-eeed4cf053b6.image.png?v=1742997318244)
![Glitch](https://cdn.glitch.global/7919643d-61cc-4c44-b0db-a7659a47c000/375a8f3e-8b50-4ee9-a656-40c067d130a2.image.png?v=1742997337679)
![Glitch](https://cdn.glitch.global/7919643d-61cc-4c44-b0db-a7659a47c000/c775b581-47f3-43f0-bbe7-4c381c4a2bf8.image.png?v=1742997348441)
![Glitch](https://cdn.glitch.global/7919643d-61cc-4c44-b0db-a7659a47c000/958c8df3-5797-4096-954d-e8c14860637a.image.png?v=1742997363793)
![Glitch](https://cdn.glitch.global/7919643d-61cc-4c44-b0db-a7659a47c000/9c90921c-f91c-47a3-892d-eb040d242328.image.png?v=1742998666576)


