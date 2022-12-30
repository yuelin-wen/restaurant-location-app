import { useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, Table, Pagination } from "react-bootstrap";
import queryString from "query-string";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);

    let history = useHistory();
    let queryStr = queryString.parse(useLocation().search);
    let location = queryStr.borough;


    useEffect(() => {
        let url = location
            ? `https://restaurant-location-api.vercel.app/api/restaurants?page=${page}&perPage=10&borough=${location}`
            : `https://restaurant-location-api.vercel.app/api/restaurants?page=${page}&perPage=10`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setRestaurants(data);
            })
            .catch(err => console.error(err))
    }, [location, page]);


    function previousPage() {
        setPage(page => page - 1);
        if (page < 2) {
            setPage(page);
        }
    }

    function nextPage() {
        setPage(page => page + 1);
    }

    if (restaurants !== null && restaurants.length > 0) {
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Restaurant List</Card.Title>
                        <Card.Text>
                            Full list of restaurants. Optionally sorted by borough
                        </Card.Text>
                    </Card.Body>
                </Card>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Borough</th>
                            <th>Cuisine</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map(restaurant => (
                            <tr onClick={() => { history.push(`/restaurant/${restaurant._id}`) }} key={restaurant._id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address.building} {restaurant.address.street}</td>
                                <td>{restaurant.borough}</td>
                                <td>{restaurant.cuisine}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <br />
                <Pagination className="mt-4">
                    <Pagination.Prev onClick={previousPage} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} />
                </Pagination>
            </>
        );
    }
    else {
        if (restaurants === null) {
            return (
                <>
                    <br /><Card>
                        <Card.Body>
                            <Card.Text>
                                Loading Restaurants
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </>)
        }else{
            return (
                <>
                    <br /><Card>
                        <Card.Body>
                            <Card.Text>
                                No Restaurants Found
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </>)
        }
    }


}