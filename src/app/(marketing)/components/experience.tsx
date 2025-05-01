import ExperiencesCard from "./experiences-card";

export interface Experiences {
  position: string;
  startDate: string;
  endDate: string;
  organization: string;
  jobdesc: string[];
  techstack: string[];
  image: string;
}
const experiences: Experiences[] = [
  {
    startDate: "Oct 2022",
    endDate: "0ct 2024",
    position: "Internship Web Developer",
    organization: "Putra Winata",
    jobdesc: [
      "Develop and landing Page",
      "Collaborate with the team to complete projects on time",
      "Implement new features based on user requirements",
      "optimize application performance and users experience",
    ],
    techstack: ["React", "Node.js", "Express", "Postgres", "Tailwind"],
    image: "/putrawinata-logo.png",
  },
  {
    startDate: "Oct 2022",
    endDate: "0ct 2024",
    position: "Internship Web Developer",
    organization: "Putra Winata",
    jobdesc: [
      "Develop and landing Page",
      "Collaborate with the team to complete projects on time",
      "Implement new features based on user requirements",
      "optimize application performance and users experience",
    ],
    techstack: ["React", "Node.js", "Express", "Postgres", "Tailwind"],
    image: "/putrawinata-logo.png",
  },
];
const ExperienceSection = () => {
  return (
    <div className="flex flex-col space-y-20  px-20 ">
      <h2 id="experiences" className="text-2xl font-bold ">
        Work Experiences:
      </h2>
      {experiences.map((experience, index) => (
        <ExperiencesCard key={index} {...experience} />
      ))}
    </div>
  );
};
export default ExperienceSection;
