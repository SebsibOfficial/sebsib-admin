import { Col, Row } from 'react-bootstrap'
import './View.css'
import Sb_Text from '../../components/Sb_Text/Sb_Text'
import Sb_ViewCard from '../../components/Sb_ViewCard/Sb_ViewCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import Sb_Loader from '../../components/Sb_Loader';
import { useEffect, useState } from 'react';
import { GetAllInfoBrief } from '../../utils/api';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

interface ViewAll {
  accounts: any[],
  requests: any[],
  users: any[],
  projects: any[],
  surveys: any[],
  questions: any[],
  inputTypes: any[],
  packages: any[],
  roles: any[],
}

export default function View() {
  const [pageLoading, setPageLoading] = useState(true);
  const [viewData, setViewData] = useState<ViewAll>();
  let params = useParams();
  let navigate = useNavigate();
	var sample = {
		"_id": "63398d6ef1fd8e13863e1b23",
		"ownerId": "63398d6ef1fd8e13863e1b23",
		"packageId": "63398d6ef1fd8e13863e1b23",
		"enumratorId": "63398d6ef1fd8e13863e1b23",
		"organizationId": "63398d6ef1fd8e13863e1b23",
		"picture": "http://placehold.it/32x32",
		"age": 22,
		"eyeColor": "green",
		"name": "Penny Knox",
		"gender": "female"
	}

  useEffect(() => {
    GetAllInfoBrief(3).then(result => {
      if (result.code == 200) {
        setPageLoading(false)
        setViewData({
          accounts: result.data.accounts,
          requests: result.data.requests,
          users: result.data.users,
          projects: result.data.projects,
          surveys: result.data.surveys,
          questions: result.data.questions,
          inputTypes: result.data.inputTypes,
          packages: result.data.packages,
          roles: result.data.roles
        })
      } else {
        console.log(result.data)
      }
    }).catch((err) => {
      console.log(err)
    })  
  }, [])

	return (
    <>
    {
      params.collection ? <Outlet/> :
      <>
       {
      pageLoading ? <Sb_Loader full/> :
        <div>
          <Row>
            <Col>
              <Row className='mb-4'>
                <Sb_Text font={24}>Accounts</Sb_Text>
              </Row>
              <Row className='g-0'>
                <Col className='d-flex' style={{'alignItems':'center'}}>
                  {
                    viewData?.accounts.map((account, index) => (
                      <Sb_ViewCard key={index+"ac"} json={account}/>
                    ))
                  }
                  <FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => navigate('accounts', {state: true})}/>
                </Col>
              </Row>

              <Row className='mb-4'>
                <Sb_Text font={24}>Users</Sb_Text>
              </Row>
              <Row className='g-0'>
              <Col className='d-flex' style={{'alignItems':'center'}}>
                  {
                    viewData?.users.map((user, index) => (
                      <Sb_ViewCard key={index+"us"} json={user}/>
                    ))
                  }
                  <FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => navigate('users', {state: true})}/>
                </Col>
              </Row>

              <Row className='mb-4'>
                <Sb_Text font={24}>Projects</Sb_Text>
              </Row>
              <Row className='g-0'>
              <Col className='d-flex' style={{'alignItems':'center'}}>
                  {
                    viewData?.projects.map((project, index) => (
                      <Sb_ViewCard key={index+"pr"} json={project}/>
                    ))
                  }
                  <FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => navigate('projects', {state: true})}/>
                </Col>
              </Row>
              
              <Row className='mb-4'>
                <Sb_Text font={24}>Surveys</Sb_Text>
              </Row>
              <Row className='g-0'>
              <Col className='d-flex' style={{'alignItems':'center'}}>
                  {
                    viewData?.surveys.map((survey, index) => (
                      <Sb_ViewCard key={index+"s"} json={survey}/>
                    ))
                  }
                  <FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => navigate('surveys', {state: true})}/>
                </Col>
              </Row>

              <Row className='mb-4'>
                <Sb_Text font={24}>Questions</Sb_Text>
              </Row>
              <Row className='g-0'>
              <Col className='d-flex' style={{'alignItems':'center'}}>
                  {
                    viewData?.questions.map((question, index) => (
                      <Sb_ViewCard key={index+"q"} json={question}/>
                    ))
                  }
                  <FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => navigate('questions', {state: true})}/>
                </Col>
              </Row>

              <Row className='mb-4'>
                <Sb_Text font={24}>Input Types</Sb_Text>
              </Row>
              <Row className='g-0'>
              <Col className='d-flex' style={{'alignItems':'center'}}>
                  {
                    viewData?.inputTypes.map((input, index) => (
                      <Sb_ViewCard key={index+"i"} json={input}/>
                    ))
                  }
                  <FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => navigate('inputTypes', {state: true})}/>
                </Col>
              </Row>

              <Row className='mb-4'>
                <Sb_Text font={24}>Packages</Sb_Text>
              </Row>
              <Row className='g-0'>
              <Col className='d-flex' style={{'alignItems':'center'}}>
                  {
                    viewData?.packages.map((apackage, index) => (
                      <Sb_ViewCard key={index+"p"} json={apackage}/>
                    ))
                  }
                  <FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => navigate('packages', {state: true})}/>
                </Col>
              </Row>

              <Row className='mb-4'>
                <Sb_Text font={24}>Roles</Sb_Text>
              </Row>
              <Row className='g-0'>
              <Col className='d-flex' style={{'alignItems':'center'}}>
                  {
                    viewData?.roles.map((role, index) => (
                      <Sb_ViewCard key={index+"r"} json={role}/>
                    ))
                  }
                  <FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => navigate('roles', {state: true})}/>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row></Row>
        </div>
          }
      </>
    }
      </>
	)
}