import { cn } from "@/lib/utils";
import { Experiences } from "./experience";

const ExperiencesCard = (experience: Experiences) => {
  return (
    <div
      className={cn(
        "bg-bone dark:bg-gray-800  px-6 py-10 rounded-md ",
        "shadow-lg/10 shadow-gray-900 "
      )}
    >
      <div className="flex px-5 gap-10">
        <div className="flex items-center justify-center w-25 h-25 min-w-25 min-h-25 rounded-md  bg-bone">
          <img
            src={experience.image}
            className="aspect-square max-w-20"
            alt="work"
          />
        </div>
        <div className="flex justify-between w-full ">
          <div className="flex flex-col space-y-5">
            <div className="">
              <p className="text-xl font-bold">{experience.position}</p>
              <p className="text-green-500">{experience.organization}</p>
            </div>
            <div className="space-y-5">
              <div className="">
                <ul className="list-disc px-5">
                  {experience.jobdesc.map((data, index) => (
                    <li key={index}>{data}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 text-gray-600">
                {experience.techstack.map((tech, index) => (
                  <span
                    className="px-3 py-1 bg-gray-400 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-100 dark:text-gray-400"
                    key={index}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p>{`${experience.startDate} - ${experience.endDate}`}</p>
        </div>
      </div>
    </div>
  );
};
export default ExperiencesCard;
