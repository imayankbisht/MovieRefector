import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';
import { LoadingOutlined } from '@ant-design/icons';

const MovieList = () => {
  const Global = useContext(GlobalContext);
  const { movieResult, searchMovie, loading, mode } = Global;
  return (
    <>
      {loading ? (
        <div
          className={`${mode ? 'bg-dark' : 'bg-light'} text-center`}
          style={{ height: '94vh' }}>
          <Container style={{ padding: '1rem' }}>
            <LoadingOutlined
              style={{ fontSize: '3rem', color: '#40a9ff' }}
              spin
            />
          </Container>
        </div>
      ) : (
        <div className={`${mode ? 'bg-dark' : 'bg-light'}`}>
          <Container>
            <Row>
              {searchMovie &&
                movieResult &&
                movieResult.map((e) => {
                  return (
                    <Col key={e.imdbID} xs={4} className="mb-2">
                      <Card>
                        <Card.Img src={e.Poster} />
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default MovieList;
