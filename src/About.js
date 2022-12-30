import { Card } from 'react-bootstrap'

export default function About() {
    return (<div>
        <Card className='mt-4'>
            <Card.Body>
                <Card.Title>About</Card.Title>
                <Card.Text>
                    This is a restaurant API sample project that I made, I complete it by using react to fetch data from the MongoDB sample database then render it on the web. Hope you like my work and to be continued :)
                </Card.Text>
                <Card.Text>
                    <a href="https://github.com/yuelin-wen/restaurant-location-app">Github Source Code</a>

                </Card.Text>
            </Card.Body>
        </Card>
    </div>)
}