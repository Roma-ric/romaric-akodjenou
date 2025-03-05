import { cn } from "lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CircleArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Carousel } from "./carousel";

interface HoverEffectProps {
  items: {
    title: string;
    description: string;
    fileSrc: string;
    link: string;
  }[];
  className?: string;
}

export const HoverEffect = ({
  items,
  className,
}: HoverEffectProps) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-3 lg-max:grid-cols-2 gap-5 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >

          <Dialog>
            <DialogTrigger>
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    className="absolute z-30 mt-[0.355rem] cursor-pointer px-4 flex flex-col pb-4 justify-end text-center h-full w-full bg-neutral-800/[0.7] dark:bg-yellow-500/[0.5] rounded-xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.05 },
                    }}
                  >
                    <div className="py-2 px-4 w-full flex justify-between rounded-lg text-start bg-white dark:bg-white dark:text-black">
                      <div className="flex-1">
                        <h1 className="font-bold text-xl"> {item?.title} </h1>
                        <p> {item?.description} </p>
                      </div>
                      <div className="w-8 h-8 cursor-pointer flex justify-center items-center bg-yellow-500 rounded-full text-white">
                        <CircleArrowOutUpRight className="w-5 h-5 -ml-[0.05rem] -mb-0.5" />
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </DialogTrigger>
            <DialogContent className="min-w-full min-h-full">
              <DialogHeader>
                <DialogTitle className="hidden">Details</DialogTitle>
                <DialogDescription>
                  <Carousel slides={items} currentIndex={idx} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Card>
            <Image
              src={item?.fileSrc}
              width={500}
              height={500}
              className="w-full h-full aspect-square object-cover"
              alt=""
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl z-20 aspect-square h-full w-full overflow-hidden bg-black border border-dashed dark:border-white/[0.2] group-hover:border-slate-700 relative",
        className
      )}
    >
      {children}
    </div>
  );
};