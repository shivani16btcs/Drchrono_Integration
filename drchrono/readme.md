change 
1 create ngrok public url
2 replaces redirect url in routes auth.js at 2 places 

#  Authentication :
get api:
http://localhost:1234/redirect
then we get access token
which get save in db inside token collection

#  webhook:
when selected event trigger then we get information here

# appointment
for appointment create :
POST:  localhost:1234/appointment/create
with body:  
 {
   "doctor": "285645",
   "duration": "30",
   "office":  "303442",
   "patient": "91327797",
   "scheduled_time":"2021-05-02T06:00:00",
   "exam_room":1
}


for appointment update
PUT:  localhost:1234/appointment/update
with body:  
 {
   "appointment_id":"",
   "doctor": "285645",
   "duration": "30",
   "office":  "303442",
   "patient": "91327797",
   "scheduled_time":"2021-05-02T06:00:00",
   "exam_room":1
}

for appointment delete
PUT:  localhost:1234/appointment/delete
with body:  
 {
   "appointment_id":"",
 }

# To register a doctor with your application,
 make a POST request to the /api/iframe_integration



1) bring patient + docter 





