import { Col, Row } from "react-bootstrap";
import { RequestCard, Sb_RequestCard } from "../../components/Sb_RequestCard/Sb_RequestCard";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

export default function Requests() {
	var rq:RequestCard = {status: 'DECLINED', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'RENEWAL', organization: 'asd'}
	var ra:RequestCard = {bank:'cbe', transactionNo: '4576891320', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'REGISTER', organization: 'asd'}
	
	return (
		<div>
			<Row className="">
				<Col md="5">
					<Row className="mb-3">
						<Col>
							<Sb_Text font={20}>Registerations and Renewals</Sb_Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Sb_RequestCard data={ra} id="id" onApprove={() => console.log('APPROVE')} onDecline={() => console.log('DECLINE')}/>
							<Sb_RequestCard data={ra} id="id" onApprove={() => console.log('APPROVE')} onDecline={() => console.log('DECLINE')}/>
						</Col>
					</Row>
				</Col>
				<Col md={{ span: 4, offset: 1 }}>
					<Row className="mb-3">
						<Col>
							<Sb_Text font={20}>History</Sb_Text>
						</Col>
					</Row>
					<Row>
						<Col>
							<Sb_RequestCard data={rq} id="id" onApprove={() => console.log('APPROVE')} onDecline={() => console.log('DECLINE')}/>
							<Sb_RequestCard data={rq} id="id" onApprove={() => console.log('APPROVE')} onDecline={() => console.log('DECLINE')}/>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}