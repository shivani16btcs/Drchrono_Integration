const express = require("express");
// const Token = require("../models/Token");
const Appointment=require("../models/appointment");
const axios = require('axios');
const router = express.Router();


const accesstoken="0v64je9SEBMIIt1YHxV1l4ijgX7t1T";

router.post('/appointment/create', async (req,res)=>{
    // console.log(req.body);
    const access=accesstoken||'0v64je9SEBMIIt1YHxV1l4ijgX7t1T';
    const Authorization='Bearer '+access;
    const  headers= {
        'Content-Type': 'application/json',
        'Authorization': Authorization
      }
    let p;
    await axios
    .post("https://drchrono.com/api/appointments", data=req.body, {
        headers: headers
      }
        )
    .then(async(res) => {
     console.log("RESPONSE RECEIVED: ", res.data.status_transitions[0].appointment); 
      let appointment= await new Appointment(
        {   appointment_id:res.data.status_transitions[0].appointment,
            doctor:res.data.doctor,
            duration:res.data.duration,
            office:res.data.office,
            patient:res.data.patient,
            scheduled_time:res.data.scheduled_time,
            exam_room:res.data.exam_room,
            created_at:res.data.created_at
       });
       p=appointment
    //  p=await appointment.save();
    })
    .catch((err) => {
      console.log("AXIOS1 ERROR: ", err);
    });

    if(p){
      console.log("DRchrono Appointment save successfully");
        return res.status(200).json({
            success:true,
            appointment:p
        })
    }
    else{
        return res.status(409).json({
            error:"Appointment overlaps"
        })
    }
    });


//-------------------------------------------------------------





    router.put('/appointment/update', async (req,res)=>{
      // console.log(req.body);
      const access=accesstoken||'udGdOi8MOi6sPVjJ4m4AXKr4Ed4GoV';
      const Authorization='Bearer '+access;
      const  headers= {
          'Content-Type': 'application/json',
          'Authorization': Authorization
        }
      let p;
      let id=req.body.appointment_id;
      await axios
      .put("https://drchrono.com/api/appointments/"+id, data=req.body, {
          headers: headers
        }
          )
      .then(async(res) => {
          p=1;
          

    //  const existing =await Appointment.findOne({appointment_id:id}) ;
    //  console.log("existing1>>"+existing);
    //       if(existing){
    //         // existing.duration=re.body.duration,
    //         // existing.data.scheduled_time=req.body.scheduled_time 
    //        }
    //        p=await existing.save();
      })
      .catch((err) => {
        console.log("AXIOS1 ERROR: ", err);
      });
  
      if(p){
        console.log("DRchrono Appointment updated successfully");
          return res.status(200).json({
              success:true,
              appointment:"updated"
          })
      }
      else{
          return res.status(409).json({
              error:"not saved in db"
          })
      }
      });
  


//-------------------------------------------------

      router.delete('/appointment/delete', async (req,res)=>{
        const access=accesstoken||'udGdOi8MOi6sPVjJ4m4AXKr4Ed4GoV';
        const Authorization='Bearer '+access;
        const  headers= {
            'Content-Type': 'application/json',
            'Authorization': Authorization
          }
        let p;
        let id=req.body.appointment_id;
        await axios
        .delete("https://drchrono.com/api/appointments/"+id, {
            headers: headers
          }
            )
        .then(async(res) => {
            p=1;
      //  p=await existing.save();

    })
    .catch((err) => {
      console.log("AXIOS1 ERROR: ", err);
    });

    if(p){
      console.log(" DRchrono Appointment deleted ");
        return res.status(200).json({
            success:true,
            appointment:"deleted"
        })
    }
    else{
        return res.status(409).json({
            error:"not deleted in db"
        })
    }

  })



//----------------------------------------------------




module.exports = router;
