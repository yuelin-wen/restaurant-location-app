import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Card, CardDeck } from "react-bootstrap";
import Moment from "react-moment";

export default function Restaurant() {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`https://frozen-hamlet-75254.herokuapp.com/api/restaurants/${id}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.hasOwnProperty("_id")) {
                    setRestaurant(data);
                } else {
                    setRestaurant(null);
                }
            });
    }, [id])

    if (!loading) {
        if (restaurant) {
            return (<>
                <Card >
                    <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Text>
                            {restaurant.address.building} {restaurant.address.street}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <MapContainer style={{ "height": "400px" }} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
                </MapContainer>
                <br />
                <h3>Ratings</h3>
                <hr />
                <CardDeck>
                    {restaurant.grades.map(grade =>
                        <Card>
                            <Card.Body>
                                <Card.Title>Grade: {grade.grade}</Card.Title>
                                <Card.Text>
                                    Completed:
                                    <Moment date={grade.date} format="YYYY/MM/DD" />
                                </Card.Text>
                            </Card.Body>
                        </Card>)}
                </CardDeck>
            </>)
        }
        else {
            return (<>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Text>
                            Unable to find Restaurant with id: {id}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>)
        }
    } else {
        return null;
    }
}