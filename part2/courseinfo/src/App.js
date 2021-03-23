const Header = ({ text }) => <h1>{text}</h1>;
const Course = ({ course }) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);
const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} />
    ))}
    {/* <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} /> */}
  </div>
);
const Part = ({ part }) => (
  <div>
    <p>
      {part.name} {part.exercises}
    </p>
  </div>
);
const Total = ({ parts }) => (
  <div>
    <p>
      <b>
        Number of exercises{" "}
        {parts.reduce((sum, part) => sum + part.exercises, 0)}
      </b>
    </p>
  </div>
);

export const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};
