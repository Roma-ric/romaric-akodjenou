import React from "react";
import SectionTitle from "./SectionTitle";
import Social from "./Social";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("ContactSection");

  const contactData = {
    title: t("title"),
    subtitle: t("subtitle"),
    description: t("description"),
    formNotice: t("formNotice"),
    formFields: {
      firstName: t("formFields.firstName"),
      lastName: t("formFields.lastName"),
      email: t("formFields.email"),
      message: t("formFields.message"),
      submitButton: t("formFields.submitButton"),
    },
  };

  const contactMethods = [
    {
      title: t("contactMethods.email.type"),
      contact: t("contactMethods.email.value"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
      link: "mailto:romaricakodjenou54@gmail.com",
    },
    {
      title: t("contactMethods.phone.type"),
      contact: t("contactMethods.phone.value"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      link: "tel:+2290166474345",
    },
  ];

  return (
    <div
      className=" min-h-screen   py-16 bg-transparent flex flex-col overflow-hidden"
      id="contact"
    >
      <SectionTitle
        text={contactData.title}
        percentage={50}
        backgroundText="LET'S TALK"
      />

      <div className="w-[70%] scr_2_2:w-[88%] scr_4:w-[95%] px-3 mx-auto mt-5">
        <section className="w-full">
          <div className="pb-12 mx-auto w-full">
            <div>
              <h2 className="text-5xl scr_2_0:text-4xl scr_2_2:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mt-16 scr_2_0:mt-10">
                {contactData.subtitle}
              </h2>
              <p className="mt-3 text-gray-500 dark:text-gray-400">
                {contactData.description}
              </p>
            </div>

            <div className="flex scr_2_1:flex-col scr_1_2:space-x-24 scr_2_1:space-x-0 scr_2_1:items-center justify-around mt-10 items-start">
              <div className="grid grid-cols-1 h-max w-max">
                <div className="grid grid-cols-[minmax(16rem,1fr] scr_2_1:grid-cols-2 scr_3_1:grid-cols-1 gap-8 h-max mb-5">
                  {contactMethods.map((method, index) => (
                    <a href={method.link} key={index}>
                      <div className="bg-black/[0.8] dark:bg-white/[0.1] rounded-lg p-5 border">
                        <span className="inline-block p-3 text-yellow-500 rounded-full bg-yellow-100/[0.1] dark:bg-gray-800">
                          {method.icon}
                        </span>
                        <h2 className="mt-4 text-base font-medium text-white">
                          {method.title}
                        </h2>
                        {/* <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{method.description}</p> */}
                        <p className="mt-2 text-sm text-yellow-500 dark:text-yellow-400">
                          {method.contact}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mx-auto mb-4 scr_2_1:mb-10">
                  <Social />
                </div>
              </div>

              <div className="p-4 py-6 scr_3_1:w-full bg-black/[0.8] dark:bg-white/[0.1] border rounded-lg bg-gray-50 dark:bg-gray-800">
                <p className="pb-2 font-semibold text-white ">
                  {" "}
                  {contactData.formNotice}{" "}
                </p>
                <form className="">
                  <div className="-mx-2 flex scr_3_1:flex-col">
                    <div className="flex-1 px-2">
                      <label className="block mb-2 text-sm text-white">
                        {contactData.formFields.firstName}
                      </label>
                      <input
                        type="text"
                        placeholder={contactData.formFields.firstName}
                        className="block w-full text-black px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="flex-1 px-2">
                      <label className="block mb-2 text-sm text-white">
                        {contactData.formFields.lastName}
                      </label>
                      <input
                        type="text"
                        placeholder={contactData.formFields.lastName}
                        className="block w-full text-black px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block mb-2 text-sm text-white">
                      {contactData.formFields.email}
                    </label>
                    <input
                      type="email"
                      placeholder="adress@example.com"
                      className="block w-full text-black px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="w-full mt-4">
                    <label className="block mb-2 text-sm text-white">
                      {contactData.formFields.message}
                    </label>
                    <textarea
                      className="block w-full text-black h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-yellow-400 dark:focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Message"
                    ></textarea>
                  </div>

                  <button
                    disabled
                    className="w-full px-6 py-3 mt-4 text-black text-sm font-medium tracking-wide dark:text-white capitalize transition-colors duration-300 transform bg-yellow-500 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-50"
                  >
                    {contactData.formFields.submitButton}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
