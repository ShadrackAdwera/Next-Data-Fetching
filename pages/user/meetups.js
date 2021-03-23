import { useState, useEffect } from 'react';

const MeetUps = props => {
const [meetups, setMeetUps] = useState([]);

useEffect(()=>{
    fetch('https://react-refresher-37760-default-rtdb.firebaseio.com/meetups.json').then(response=>{
        return response.json();
    }).then(resData=>{
        const newArray = [];
        for(const res in resData) {
            newArray.push({id: res, ...resData[res]});
        }
        setMeetUps(newArray);
    }).catch(error=>console.log(error));
},[]);

return meetups.length>0? <ul>
    {meetups.map((meetup,index)=><li key={index}>{meetup.title}</li>)}
</ul> : <p className='centered'>Loading...</p>

}

export default MeetUps;