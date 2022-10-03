import { useContext, useEffect, useReducer, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Member_Card from "../../components/Sb_Member_Card/Sb_Member_Card";
import Sb_Text from "../../components/Sb_Text/Sb_Text";

export default function Admins() {

	/*############# STATES ############### */
	const [accountName, setAccountName] = useState("");
	const [adminEmail, setadminEmail] = useState("");
	const [adminFirstName, setadminFirstName] = useState("");
	const [adminLastName, setadminLastName] = useState("");
	const [ownerPhone, setownerPhone] = useState("");
	const [adminPassword, setadminPassword] = useState("");
	const [accountPackage, setPackage] = useState("");
	const [accountExpiry, setAccountExpiry] = useState("");
	const [projectsInvolved, setProjectsInvolved] = useState<string[]>([]);
	const [pageLoading, setPageLoading] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);
	const [projIn, setProj] = useState(false);

	return (
		pageLoading ? <Sb_Loader full /> :
			<Col>
				<Row className="mb-4">
					<Col md="4" className="me-4">
						<Form.Group className="mb-3" controlId="AddMemberUsername">
							<Row>
								<Col>
									<Form.Label><Sb_Text font={16}>Admin First Name</Sb_Text></Form.Label>
									<Form.Control size="sm" type="text" placeholder="Name" value={adminFirstName} onChange={(e) => setadminFirstName(e.target.value)} />
								</Col>
								<Col>
									<Form.Label><Sb_Text font={16}>Admin Last Name</Sb_Text></Form.Label>
									<Form.Control size="sm" type="text" placeholder="Name" value={adminLastName} onChange={(e) => setadminLastName(e.target.value)} />
								</Col>
							</Row>
						</Form.Group>
						<Form.Group className="mb-3" controlId="AccountName">
							<Form.Label><Sb_Text font={16}>Admin Email</Sb_Text></Form.Label>
							<Form.Control size="sm" type="text" placeholder="Name" value={adminEmail} onChange={(e) => setadminEmail(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="AddMemberPassword">
							<Form.Label><Sb_Text font={16}>Password</Sb_Text></Form.Label><br></br>
							<Form.Label><Sb_Text weight={300} font={12}>Do not forget this password, Copy it if you can</Sb_Text></Form.Label>
							<Form.Control size="sm" type="text" placeholder="Password" value={adminPassword} onChange={(e) => setadminPassword(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="AddMemberPassword">
							<Form.Label><Sb_Text font={16}>Role</Sb_Text></Form.Label><br></br>
							<Form.Select size="sm" id="Select">
								<option value={"free-trail"}>Admin</option>
								<option value={"standard"}>Super Admin</option>
							</Form.Select>
						</Form.Group>
						<Button className="mt-3" size="sm" style={{ 'float': 'right' }} onClick={() => console.log("Add")}>
							<Sb_Text font={12} color="--lightGrey">
								{
									btnLoading ? <Sb_Loader /> : <span>Add Admin</span>
								}
							</Sb_Text>
						</Button>
					</Col>
					<Col md={{ span: 3, offset: 1 }}>
						<Row className="mb-3">
							<Col>
								<Sb_Text font={20}>Admins</Sb_Text>
							</Col>
						</Row>
						<Row>
							<Col>
								<Sb_Member_Card id={"member._id"} name={"member.name"} onDelete={(id) => console.log("DELETE_ADMIN")} onClick={(id) => console.log("CLICK ADMIN")}/>
							</Col>
							<Col>
								<Sb_Member_Card id={"member._id"} name={"member.name"} onDelete={(id) => console.log("DELETE_ADMIN")} onClick={(id) => console.log("CLICK ADMIN")}/>
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
	)
}