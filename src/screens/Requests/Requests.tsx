import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { RequestCard, Sb_RequestCard } from "../../components/Sb_RequestCard/Sb_RequestCard";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

export default function Requests() {
	const [pageLoading, setPageLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [requests, setRequests] = useState<RequestCard[]>([
    {status: 'DECLINED', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'RENEWAL', organization: 'xasd'},
    {status: 'APPROVED', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'RENEWAL', organization: 'asd'},
    
    {bank:'cbe', transactionNo: '4576891320', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'REGISTER', organization: 'asd'}
  ]);

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
              {
                requests.filter((request:RequestCard) => request.status !== 'APPROVED' && request.status !== 'DECLINED').map((request:RequestCard) => (
                  <Sb_RequestCard data={request} id="id" onApprove={() => console.log('APPROVE')} onDecline={() => console.log('DECLINE')}/>
                ))
              }
						</Col>
					</Row>
				</Col>
				<Col md={{ span: 4, offset: 1 }}>
					<Row className="mb-3">
						<Col>
							<Sb_Text font={20}>History</Sb_Text>
						</Col>
            
            <Col md="6">
              <Form.Group className="mb-3" controlId="search">
                <Form.Control size="sm" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
              </Form.Group>
            </Col>
					</Row>
					<Row>
						<Col>
            {
                requests
                .filter((request:RequestCard) => request.status === 'APPROVED' || request.status === 'DECLINED')
                .filter((request:RequestCard) => request.organization.includes(search))
                .map((request:RequestCard) => (
                  <Sb_RequestCard data={request} id="id" onApprove={() => console.log('APPROVE')} onDecline={() => console.log('DECLINE')}/>
                ))
              }
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}