import { useContext, useEffect, useReducer, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { actionType } from "../../components/Sb_List_Item/Sb_List_Item";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { useAuth } from "../../states/AuthContext";
import { NotifContext } from "../../states/NotifContext";

interface Props {
  pageType: "ADD" | "EDIT"
}

export default function Add_Modify_Account(props:Props) {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();
  const {token, setAuthToken} = useAuth();
  const Notif = useContext(NotifContext);

  /*############# STATES ############### */
  const [accountName, setAccountName] = useState("");
  const [ownerEmail, setownerEmail] = useState("");
  const [ownerFirstName, setownerFirstName] = useState("");
  const [ownerLastName, setownerLastName] = useState("");
  const [ownerPhone, setownerPhone] = useState("");
  const [ownerPassword, setownerPassword] = useState("");
  const [accountPackage, setPackage] = useState("");
  const [accountExpiry, setAccountExpiry] = useState("");
  const [projectsInvolved, setProjectsInvolved] = useState<string[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  /*------------- METHODS -------------- */

  function saveAddButtonHandler () {
    setBtnLoading(true);
    if (props.pageType === 'ADD'){
        console.log("ADD")
      }
    else if (props.pageType === 'EDIT') {
      console.log("SAVE")
    }
  }

  return (
    pageLoading ? <Sb_Loader full/> :
    <Col>
      <Row className="mb-4">
        <Col md="4" className="me-4">
					<Form.Group className="mb-3" controlId="AccountName">
						<Form.Label><Sb_Text font={16}>Account Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name" value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberEmail">
						<Form.Label><Sb_Text font={16}>Owner Email</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Email" value={ownerEmail} onChange={(e) => setownerEmail(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberUsername">
            <Row>
              <Col>
                <Form.Label><Sb_Text font={16}>Owner First Name</Sb_Text></Form.Label>
                <Form.Control size="sm" type="text" placeholder="Name" value={ownerFirstName} onChange={(e) => setownerFirstName(e.target.value)}/>
              </Col>
              <Col>
                <Form.Label><Sb_Text font={16}>Owner Last Name</Sb_Text></Form.Label>
                <Form.Control size="sm" type="text" placeholder="Name" value={ownerLastName} onChange={(e) => setownerLastName(e.target.value)}/>
              </Col>
            </Row>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberEmail">
						<Form.Label><Sb_Text font={16}>Owner Phone</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Email" value={ownerPhone} onChange={(e) => setownerPhone(e.target.value)}/>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberPassword">
						<Form.Label><Sb_Text font={16}>Package</Sb_Text></Form.Label><br></br>
						<Form.Select size="sm" id="Select">
              <option value={"free-trail"}>Free Trial</option>
              <option value={"standard"}>Standard</option>
            </Form.Select>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberEmail">
						<Form.Label><Sb_Text font={16}>Expires On</Sb_Text></Form.Label>
						<Form.Control size="sm" type="date" placeholder="DD-MM-YYYY" value={accountExpiry} onChange={(e) => setAccountExpiry(e.target.value)}/>
					</Form.Group>
          {
            props.pageType === 'EDIT' ?
            <Form.Group className="mb-3" controlId="AddMemberPassword">
              <Form.Label><Sb_Text font={16}>Password</Sb_Text></Form.Label><br></br>
              <Form.Label><Sb_Text weight={300} font={12}>Do not forget this password, Copy it if you can</Sb_Text></Form.Label>
              <Form.Control size="sm" type="text" placeholder="Password" value={ownerPassword} onChange={(e) => setownerPassword(e.target.value)}/>
					  </Form.Group> :
            null
          }
          {
            props.pageType === 'EDIT' ? <Button className="mt-3" size="sm" variant="light"><Sb_Text color="--DangerRed">Delete Account</Sb_Text></Button> : null
          }
          <Button className="mt-3" size="sm" style={{'float':'right'}} onClick={() => saveAddButtonHandler()}>
          <Sb_Text font={12} color="--lightGrey">
            {
              btnLoading ? <Sb_Loader/> :<span>{props.pageType === 'ADD' ? 'Add Account' : 'Save Changes'}</span>
            }
          </Sb_Text>
        </Button>
        </Col>
      </Row>
    </Col>
  )
}