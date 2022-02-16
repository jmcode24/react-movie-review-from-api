import React, {useState, useEffect} from 'react';
import Header from '../components/Navbar';
import { Helmet } from 'react-helmet';
import Foot from '../components/Footer';
import { Container, Row, Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import noImage from '../images/coming_soon.jpg';
import loader from '../images/pipe.gif';


function Reviews() {
  const apiKey = "lWXnU7HzKPILklQFZcCxqMk8hosGG6ih";
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${search}&api-key=${apiKey}`
    );

    setReviews(data.results);
    setLoading(false);
    setSearch("");
  };

  const fetchData = async () => {
    setLoading(true);
    // const { data } = await axios.get(
    //   `https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${apiKey}`
    // );

    // setReviews(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Movie Reviewer</title>
      </Helmet>
      <Header />

      <Container>
        <Card>
          <Card.Body>
            <h1>Search Movie Reviews</h1>
            <p className="lead">Enter a movie and submit to get reviews</p>
            <Form onSubmit={handleSubmit} >
            <InputGroup>
              <FormControl
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search For Movie..."
                aria-label="Search For Movie"
                aria-describedby="basic-addon2"
              />
              <Button variant="primary" id="button-addon2" type='submit'><FiSearch /> Search</Button>
            </InputGroup>
            </Form>
          </Card.Body>
        </Card>
        <br/> <br/>

        {!loading ? (
          reviews.map((review, index) => (
            <Container key={index}>
              <Row>
                <Col sm={4}>
                  {review?.multimedia?.src ? (
                    <img
                      className="img-fluid mb-3"
                      src={review?.multimedia?.src}
                      alt="review"
                    />
                  ) : (
                    <img
                      className="img-fluid mb-3"
                      src={noImage}
                      alt="review"
                    />
                  )}
                </Col>
                <Col sm={8}>
                  <h2 className="text-danger mb-3">
                    Title: <span className="text-white">{review.display_title}</span>
                  </h2>
                  <h5 className="text-primary mb-5">
                    Headline:{" "}
                    <span className="text-white">{review.headline}</span>
                  </h5>
                  <div className="d-flex justify-content-around">
                    <p className="text-muted">
                      Byline: <span className="text-white">{review.byline}</span>
                    </p>
                    <p className="text-muted">
                      Critic Pick:{" "}
                      <span className="text-white">{review.critics_pick}</span>
                    </p>
                  </div>
                </Col>
              </Row>
              <hr style={{height: "2px", backgroundColor: "#FFFF00", border: "none"}} />
            </Container>
          ))
        ) : (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              width: "100%",
              textAlign: "center",
              border: "none"
            }}
          >
            <img src={loader} alt="loader" />
          </div>
        )}
        
      </Container>

      <Foot />
    </>
  );
};

export default Reviews;