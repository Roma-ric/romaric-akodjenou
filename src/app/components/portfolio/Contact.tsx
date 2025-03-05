import React from 'react';
import SectionTitle from './SectionTitle';

const Contact = () => {
  return (
    <div className="min-w-[20rem] min-h-screen border-b dark:border-b-stone-800  py-16 bg-transparent flex flex-col overflow-hidden" id='contact'>

      <SectionTitle
        text={"CONTACT"}
        percentage={50}
        backgroundText="LET'S TALK"
      />

    </div>
  );
};

export default Contact;