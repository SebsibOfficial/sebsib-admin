import { Col, Row } from 'react-bootstrap'
import './View.css'
import Sb_Text from '../../components/Sb_Text/Sb_Text'
import Sb_ViewCard from '../../components/Sb_ViewCard/Sb_ViewCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import Sb_Loader from '../../components/Sb_Loader';
import { useState } from 'react';

interface ViewAll {
  accounts: any[],
  requests: any[],
  users: any[],
  projects: any[],
  surveys: any[],
  questions: any[],
  answers: any[],
  options: any[],
  inputTypes: any[],
  packages: any[],
  roles: any[],
}

export default function View() {
  const [pageLoading, setPageLoading] = useState(false);
  const [viewData, setViewData] = useState<ViewAll>();
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
	return (
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
                viewData?.accounts.map((account) => (
                  <Sb_ViewCard json={account}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Users</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.users.map((user) => (
                  <Sb_ViewCard json={user}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Projects</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.projects.map((project) => (
                  <Sb_ViewCard json={project}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>
					
					<Row className='mb-4'>
						<Sb_Text font={24}>Surveys</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.surveys.map((survey) => (
                  <Sb_ViewCard json={survey}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Questions</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.questions.map((question) => (
                  <Sb_ViewCard json={question}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Answers</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.answers.map((answer) => (
                  <Sb_ViewCard json={answer}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>
					
					<Row className='mb-4'>
						<Sb_Text font={24}>Options</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.options.map((option) => (
                  <Sb_ViewCard json={option}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Input Types</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.inputTypes.map((input) => (
                  <Sb_ViewCard json={input}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Packages</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.packages.map((apackage) => (
                  <Sb_ViewCard json={apackage}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Roles</Sb_Text>
					</Row>
					<Row className='g-0'>
          <Col className='d-flex' style={{'alignItems':'center'}}>
              {
                viewData?.roles.map((role) => (
                  <Sb_ViewCard json={role}/>
                ))
              }
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row></Row>
		</div>
      }
      </>
	)
}