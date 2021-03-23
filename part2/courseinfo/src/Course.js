const Header = ({ text }) => <h2>{text}</h2>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
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
export const Course = ({ course }) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);
