export default function Course ({course}){
    const Header = () => <h1>{course.name}</h1>

    const Content = () => {
        return course.parts.map((part, index) => (
            <Part key={index} part={part} />
        ))
    }

    const Part = ({part}) => {
        return (<p>
            {part.name} {part.exercises}
        </p>)
    }

    const Total = () => {
        return (
            <div>
                <b>Total of {course.parts.reduce((sum,part) => sum+part.exercises,0)} exercises.</b>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Content/>
            <Total />
        </div>
    )
}