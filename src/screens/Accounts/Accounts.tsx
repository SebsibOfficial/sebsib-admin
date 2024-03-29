import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router-dom'
import Sb_Container from '../../components/Sb_Container/Sb_Container'
import Sb_List from '../../components/Sb_List/Sb_List'
import Sb_Loader from '../../components/Sb_Loader'
import Sb_Main_Items from '../../components/Sb_Main_Items/Sb_Main_Item'
import Sb_Text from '../../components/Sb_Text/Sb_Text'
import { GetAllAccountInfo } from '../../utils/api'
import './Accounts.css'

export function Accounts_Landing() {
  return (
    <>
      <Outlet />
    </>
  )
}

interface Account {
  id: string,
  name: string,
  orgId: string,
  projects: { 
    id: string,
    name: string, 
    surveys: { _id: string, name: string }[],
    members: { _id: string, firstName: string, lastName: string }[]
  }[]
}

export function Accounts() {
  let navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([
    // {
    //   id: "634e92b292a008f91a1ba964",
    //   name: "XAccount One",
    //   orgId: "ACC21",
    //   projects: [{ 
    //     id: "String",
    //     name: "Project1",
    //     surveys: [{ _id: "String", name: "Survey1" }],
    //     members: [{ _id: "String", name: "Member1" }]
    //   }]
    // },
    // {
    //   id: "String",
    //   name: "Account Two",
    //   orgId: "ACC222",
    //   projects: [{ 
    //     id: "String", 
    //     name: "Project1",
    //     surveys: [{ _id: "String", name: "Survey1" }],
    //     members: []
    //   },
    //   { 
    //     id: "String", 
    //     name: "Project2",
    //     surveys: [{ _id: "String", name: "Survey1" }, { _id: "String", name: "Survey2" }],
    //     members: [{ _id: "String", name: "Member1" }, { _id: "String", name: "Member2" }]
    //   }
    //   ]
    // }
  ]);

  interface concatI { _id: string, firstName: string, lastName: string }
  interface afterconI { _id: string, name: string }
  
  function concat (data: concatI[]):afterconI[] {
    var newArr: afterconI[] = []
    data.forEach((item:concatI) => {
      newArr.push({_id: item._id, name: item.firstName + ' ' + item.lastName})
    })
    return newArr;
  }

  useEffect(() => {
		GetAllAccountInfo().then(result => {
      if (result.code == 200) {
        //setAccounts(convertToAccount(result.data))
        var list:[] = result.data;
        var accs:Account[] = [];

        list.forEach((account:any) => {
          accs.push({id: account._id, name: account.name, orgId: account.orgId, projects: account.projects})
        })
        setAccounts(accs);
        console.log(result.data)
      }
      else console.log(result)
    })
	}, [])

  return (
    <>
    {
      pageLoading ? <Sb_Loader full/> :
      <div>
      <Row className='mb-4'>
        <Col style={{ 'alignItems': 'center', 'display': 'flex' }}>
          <Button variant='primary' onClick={() => navigate('add', {state:true})}>
            <Sb_Text font={16} color="--lightGrey">Create New Account</Sb_Text>
          </Button>
        </Col>
        <Col md="3">
          <Form.Group className="mb-3" controlId="search">
            <Form.Label><Sb_Text font={16}>Search</Sb_Text></Form.Label>
            <Form.Control size="sm" type="text" placeholder="Name" onChange={(e) => setSearch(e.target.value)}/>
          </Form.Group>
        </Col>
      </Row>
      {
        accounts.filter((account:Account) => account.name.includes(search)).map((account:Account) => (
          <Row className="mb-5">
            <Col>
              <Row className='g-0 mb-2'>
                <Col md="10">
                  <Sb_Text font={16} weight={500}><p className='me-4 mb-0'>{account.name}</p></Sb_Text>
                  <Sb_Text font={16}>ID: {account.orgId}</Sb_Text>
                </Col>
                <Col className='text-end'>
                  <Button variant="secondary" size="sm" onClick={() => navigate('edit/'+account.id, {state:true})}>
                    <Sb_Text font={12} color="--lightGrey">Edit Account</Sb_Text>
                  </Button>
                </Col>
              </Row>
              <>
                {
                  account.projects.map((project) => (
                    <Row>
                      <Col>
                        <Row className="g-0" style={{ 'minHeight': 200 }}>
                          <Col md="8">
                            <Sb_Container className="d-block mnh-100 ps-4 pt-4 pb-4">
                              
                                    <div className='project_container'>
                                      <Row className='mb-2'>
                                        <Col>
                                          <Sb_Text font={16} weight={500}>{project.name}</Sb_Text>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col className={`d-flex`}>
                                          <>
                                          {
                                            project.surveys.map((survey) => (
                                              <Sb_Main_Items key={survey._id} id={survey._id} text={survey.name} type='SURVEY' onClick={() => null} />
                                            ))
                                          }
                                          </>
                                        </Col>
                                        {
                                          project.surveys.length < 1 &&
                                          <Col className="d-flex mb-3 ms-4" style={{'opacity':'0.3'}}>
                                            <Sb_Text font={48} weight={900}>No Surveys</Sb_Text>
                                          </Col>
                                        }              
                                      </Row>
                                    </div>
                                
                            </Sb_Container>
                          </Col>
                          <Col style={{ 'minHeight': '100%' }}>
                            <Sb_Container className="pt-4 pe-4 d-block min-height-inherit">
                              <div className='member_container'>
                                <Row>
                                  <Col>
                                    <Sb_List items={concat(project.members)} listType="MEMBER" compType='DISPLAY' />
                                  </Col>
                                  {
                                      project.members.length < 1 && 
                                      <Col style={{'opacity':'0.3'}}>
                                      <Sb_Text font={20} weight={900}>No Enumerators</Sb_Text>
                                      </Col>
                                  }
                                </Row>
                              </div>
                            </Sb_Container>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
               ))
              }
            </>
            </Col>
          </Row>
        ))
      }
    </div>
    }
    </>
  )
}