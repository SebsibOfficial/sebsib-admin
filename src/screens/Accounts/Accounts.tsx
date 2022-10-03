import { Button, Col, Form, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Sb_Container from '../../components/Sb_Container/Sb_Container'
import Sb_List from '../../components/Sb_List/Sb_List'
import Sb_Main_Items from '../../components/Sb_Main_Items/Sb_Main_Item'
import Sb_Text from '../../components/Sb_Text/Sb_Text'
import './Accounts.css'

export function Accounts_Landing () {
    return (
        <>
            <Outlet/>
        </>
    )
}

export function Accounts () {
    return (
        <div>
            <Row className='mb-4'>
                <Col style={{'alignItems':'center', 'display':'flex'}}>
                    <Button variant='primary'>
                        <Sb_Text font={16} color="--lightGrey">Create New Account</Sb_Text>
                    </Button>
                </Col>
                <Col md="3">
                    <Form.Group className="mb-3" controlId="search">
						<Form.Label><Sb_Text font={16}>Search</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name"/>
					</Form.Group>
                </Col>
            </Row>
            {/* An Account */}
            <Row className="mb-5">
            <Col>
              <Row className='g-0 mb-2'>
                <Col md="10">
                  <Sb_Text font={16} weight={500}><p className='me-4 mb-0'>Account One</p></Sb_Text>
                  <Sb_Text font={16}>ID: HAFUYTGFJ</Sb_Text>
                </Col>
                <Col className='text-end'>
                  <Button variant="secondary" size="sm">
                    <Sb_Text font={12} color="--lightGrey">Edit Account</Sb_Text>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row className="g-0" style={{'minHeight':200}}>
                    <Col md="9">
                      <Sb_Container className="d-block mnh-100 ps-4 pt-4 pb-4">
                        {/* A Project */}
                        <div className='project_container'>
                            <Row className='mb-2'>
                                <Col>
                                    <Sb_Text font={16} weight={500}>Project One</Sb_Text>
                                </Col>
                            </Row>
                            <Row>
                            <Col className={`d-flex`}>
                                <Sb_Main_Items key={"index"} id={"survey._id"} text={"Agriculture STudy"} type='SURVEY' onClick={() => console.log("CLICK")}/>
                                <Sb_Main_Items key={"index"} id={"survey._id"} text={"Agriculture STudy"} type='SURVEY' onClick={() => console.log("CLICK")}/>
                            </Col>
                            {/* {
                                project.surveys.length < 1 &&
                                <Col className="d-flex mb-3 ms-4" style={{'opacity':'0.3'}}>
                                <Sb_Text font={48} weight={900}>No Surveys</Sb_Text>
                                </Col>
                            }               */}
                            </Row>
                        </div>

                        <div className='project_container'>
                            <Row className='mb-2'>
                                <Col>
                                    <Sb_Text font={16} weight={500}>Project Two</Sb_Text>
                                </Col>
                            </Row>
                            <Row>
                            <Col className={`d-flex`}>
                                <Sb_Main_Items key={"index"} id={"survey._id"} text={"Agriculture STudy"} type='SURVEY' onClick={() => console.log("CLICK")}/>
                            </Col>
                            {/* {
                                project.surveys.length < 1 &&
                                <Col className="d-flex mb-3 ms-4" style={{'opacity':'0.3'}}>
                                <Sb_Text font={48} weight={900}>No Surveys</Sb_Text>
                                </Col>
                            }               */}
                            </Row>
                        </div>
                      </Sb_Container>
                    </Col>
                    <Col style={{'minHeight':'100%'}}>
                      <Sb_Container  className="pt-4 pe-4 d-block min-height-inherit">
                        <div className='member_container'>
                            <Row>
                            <Col>
                            <Sb_List items={[{_id: "id", name: "name"}, {_id: "id", name: "name"}]} listType="MEMBER" compType='DISPLAY'/>
                            </Col>
                            {/* {
                                project.members.length < 1 && 
                                <Col style={{'opacity':'0.3'}}>
                                <Sb_Text font={20} weight={900}>No Enumerators</Sb_Text>
                                </Col>
                            } */}
                            </Row>
                        </div>
                      </Sb_Container>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
    )
}