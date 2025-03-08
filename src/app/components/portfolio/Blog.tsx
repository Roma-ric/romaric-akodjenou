import React from 'react';
import SectionTitle from './SectionTitle';
import { TracingBeam } from '../aceternity/tracing-beam';
import Image from 'next/image';
import dayjs from "dayjs";
import day_js_utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(day_js_utc);
dayjs.extend(timezone);

const Blog = () => {

  const blogList = [
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      description: (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nihil mollitia delectus nisi repellendus maxime optio vero fugit ullam, perferendis dignissimos nulla enim cumque, eaque aut nemo eveniet quaerat excepturi!
          </p>
        </>
      ),
      date: "2025/02/18",
      image:
        "/maquette/portfolio-details.png",
    },
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      description: (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nihil mollitia delectus nisi repellendus maxime optio vero fugit ullam, perferendis dignissimos nulla enim cumque, eaque aut nemo eveniet quaerat excepturi!
          </p>
        </>
      ),
      date: "2025/02/27",
      image:
        "/maquette/blog1.png",
    },
    {
      title: "Lorem Ipsum Dolor Sit Amet",
      description: (
        <>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nihil mollitia delectus nisi repellendus maxime optio vero fugit ullam, perferendis dignissimos nulla enim cumque, eaque aut nemo eveniet quaerat excepturi!
          </p>
        </>
      ),
      date: "2025/01/13",
      image:
        "/maquette/portfolio3.png",
    },
  ];

  return (
    <div className=" bg-black dark:bg-white dark:border-white/[0.2] dark:bg-opacity-5 min-h-screen py-16 bg-transparent flex flex-col overflow-hidden" id='blog'>

      <SectionTitle
        text={"BLOG"}
        percentage={50}
        backgroundText='POSTS'
      />

      <div className='w-[70%] scr_2_2:w-[88%] scr_4:w-[95%] px-3 mx-auto mt-20'>
        
        <TracingBeam className="">
          <div className='w-full grid grid-cols-3 scr_2:grid-cols-2 scr_3_0:grid-cols-1 gap-5'>
            {
              [0, 1, 2].map((item, index) => (
                <div key={index}>
                  {blogList.map((item, index) => (
                    <div key={`content-${index}`} className="mb-10 border group overflow-hidden relative rounded-lg w-full bg-white/[0.1]">
                      <div className='absolute max-w-[2.65rem] top-0 z-40 right-0 m-3 bg-yellow-500 rounded-md p-2 uppercase'>
                        {dayjs(item?.date)
                          .local()
                          .format("DD MMM")}
                      </div>
                      <div className='overflow-hidden'>
                        <Image
                          src={item?.image}
                          alt="blog thumbnail"
                          height="1000"
                          width="1000"
                          className="rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-110 aspect-video object-cover"
                        />
                      </div>
                      <div className='py-0.5 bg-yellow-500' />
                      <div className='px-3 pb-5'>
                        <p className="text-xl my-3 font-semibold">
                          {item?.title}
                        </p>
                        <p>
                          {item?.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        </TracingBeam>
      </div>

    </div>
  );
};

export default Blog;