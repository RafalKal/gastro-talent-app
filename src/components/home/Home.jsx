import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Dropdown, Button } from 'react-bootstrap';
import './home.css';
import JobCard from './JobCard';
import Filter from './Filter';
import axios from '../../api/axios';
import Pagination from '../Pagination';



function Home() {
    const [cooks, setCooks] = useState([]);
    const [originalCooks, setOriginalCooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // maksymalnie 5 obiektów na stronę
    const [users, setUsers] = useState([]);
    const [sortOrder, setSortOrder] = useState(''); 
    const [searchText, setSearchText] = useState('');

    
    useEffect(() => {
        const fetchCooksAndUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('JWT token is missing');
                    return;
                }

                const cooksResponse = await axios.get('http://localhost:8080/api/v1/cooks/is-visible', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const cooks = cooksResponse.data;
                const cooksDataWithUser = [];

                for (let cook of cooks) {
                    try {
                        const userResponse = await axios.get(`http://localhost:8080/api/v1/users/${cook.empId}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        console.log(userResponse.data);
                        cooksDataWithUser.push({ ...cook, user: userResponse.data });
                    } catch (error) {
                        console.error(`Error fetching user data for empId ${cook.empId}:`, error);
                        cooksDataWithUser.push({ ...cook, user: null });
                    }
                }
               
                console.log(cooks);
                setCooks(cooksDataWithUser);
                setOriginalCooks(cooksDataWithUser);
            } catch (error) {
                console.error('Error fetching cooks data:', error);
            }
          
        };

        fetchCooksAndUserData();
        
    }, []);


 

    const handleSortChange = (order) => {
        setSortOrder(order);
        const sortedCooks = sortCooks(order, cooks);
        setCooks(sortedCooks);
    };
    

    const sortCooks = (order, cooksToSort) => {
        return [...cooksToSort].sort((a, b) => {
            switch (order) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
            case 'name-asc':
              return a.user.firstname.localeCompare(b.user.firstname) ||
                     a.user.lastname.localeCompare(b.user.lastname);
            case 'name-desc':
              return b.user.firstname.localeCompare(a.user.firstname) ||
                     b.user.lastname.localeCompare(a.user.lastname);
            case 'experience-asc':
              return a.yearsOfExperience - b.yearsOfExperience;
            case 'experience-desc':
              return b.yearsOfExperience - a.yearsOfExperience;
            default:
              return 0;
          }
        });
        
      };


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Obliczanie liczby stron
    const totalPages = Math.ceil(cooks.length / itemsPerPage);


    const cooksOnCurrentPage = cooks.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handleSearchButtonClick = () => {
        // Logika filtrowania po tekście, używając oryginalnej listy kucharzy
        const filtered = originalCooks.filter(cook => (
            cook.profession.toLowerCase().includes(searchText.toLowerCase()) ||
            cook.user?.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
            cook.user?.lastname.toLowerCase().includes(searchText.toLowerCase()) ||
            cook.user?.address?.city.toLowerCase().includes(searchText.toLowerCase()) ||
            cook.signatureDishes.some(dish => dish.toLowerCase().includes(searchText.toLowerCase()))
        ));
        setCooks(filtered);
    };

    return (
        <Container fluid className="px-4">
            <Row className="mt-5 topContainer ">
                <Col className="welcomeDiv">
                    <h2 className="padding-items1">
                        Znajdź <span className="blue-text">nową pracę</span> już dzisiaj!
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col className="welcomeDiv">
                    <p className="padding-items2">Tysiące ofert pracy czeka na Ciebie!</p>
                </Col>
            </Row>
            <Row className="searchTop">
                <InputGroup className="mb-3 inputSearch">
                    <Form.Control
                        type="text"
                        placeholder="Jakiej pracy szukasz"
                        aria-label="Job search input"
                        aria-describedby="basic-addon1"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={handleSearchButtonClick}>
                        Szukaj
                    </Button>
                </InputGroup>
            </Row>
            <Row className="px-5 customFilterRow">
                <Filter /> {/* Filter component */}
                <Col>
                    <Row>
                        <Col xs={6}>
                            <h3 className="jobCount">3177 Ofert Pracy</h3>
                        </Col>
                        <Col xs={6} className="text-end">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Sortuj po
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleSortChange('newest')}>Od najnowszych</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortChange('oldest')}>Od najstarszych</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortChange('name-asc')}>Imię A-Z</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortChange('name-desc')}>Imię Z-A</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortChange('experience-asc')}>Najmniej doświadczenia</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleSortChange('experience-desc')}>Najwięcej doświadczenia</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        {cooksOnCurrentPage.map(cook => (
                            <JobCard key={cook.id} cookData={cook} />
                        ))}
                    </Row>
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
                <Col className="col-3">
                    <div className="customEmail">
                        <h3>Email me for jobs</h3>
                        <p>Short description</p>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Subscribe
                            </Button>
                        </Form>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}

export default Home