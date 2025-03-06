import React from 'react';
import SectionTitle from './SectionTitle';

const Contact = () => {
  return (
    <div className=" min-h-screen   py-16 bg-transparent flex flex-col overflow-hidden" id='contact'>

      <SectionTitle
        text={"CONTACT"}
        percentage={50}
        backgroundText="LET'S TALK"
      />

    </div>
  );
};

export default Contact;