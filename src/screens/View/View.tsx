import { Col, Row } from 'react-bootstrap'
import './View.css'
import Sb_Text from '../../components/Sb_Text/Sb_Text'
import Sb_ViewCard from '../../components/Sb_ViewCard/Sb_ViewCard'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function View() {
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
		<div>
			<Row>
				<Col>
					<Row className='mb-4'>
						<Sb_Text font={24}>Accounts</Sb_Text>
					</Row>
					<Row className='g-0'>
						<Col className='d-flex' style={{'alignItems':'center'}}>
							<Sb_ViewCard json={sample}/>
							<Sb_ViewCard json={sample}/>
							<Sb_ViewCard json={sample}/>
							<Sb_ViewCard json={sample}/>
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>
					<Row className='mb-4'>
						<Sb_Text font={24}>Accounts</Sb_Text>
					</Row>
					<Row className='g-0'>
						<Col className='d-flex' style={{'alignItems':'center'}}>
							<Sb_ViewCard json={sample}/>
							<Sb_ViewCard json={sample}/>
							<Sb_ViewCard json={sample}/>
							<Sb_ViewCard json={sample}/>
							<FontAwesomeIcon style={{'cursor':'pointer'}} icon={faArrowAltCircleRight} size="2x" onClick={() => console.log('More')}/>
						</Col>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Users</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Projects</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>
					
					<Row className='mb-4'>
						<Sb_Text font={24}>Surveys</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Questions</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Answers</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>
					
					<Row className='mb-4'>
						<Sb_Text font={24}>Options</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Input Types</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Packages</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>

					<Row className='mb-4'>
						<Sb_Text font={24}>Roles</Sb_Text>
					</Row>
					<Row className='g-0'>
					</Row>
				</Col>
			</Row>
			<Row></Row>
		</div>
	)
}