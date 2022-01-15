import React from 'react';
import { useParams } from "react-router-dom";


export const DateContainer = () => {

  const { date } = useParams();
  const currentDate = new Date().toISOString().split('T')[0];


  if (Date.parse(date) <= Date.parse(currentDate))
  {
    return (
      <>
        Show date <br/>
        {date}
      </>
    );
  }
  else {
    return (
      <>
        Rejected
      </>
    );
  }
};