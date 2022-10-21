import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useReducer, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { actionType } from "../../components/Sb_List_Item/Sb_List_Item";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Modal from "../../components/Sb_Modal/Sb_Modal";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { useAuth } from "../../states/AuthContext";
import { NotifContext } from "../../states/NotifContext";
import { CreateAccount, DeleteAccount, EditAccount, GetAccountInfo } from "../../utils/api";
import { translateIds } from "../../utils/helpers";

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
  const [accountPackage, setPackage] = useState("");
  const [accountExpiry, setAccountExpiry] = useState("");
  const [modalState, setModalState] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  /*------------- METHODS -------------- */

  function resetForms () {
    setAccountName("");
    setownerEmail("");
    setownerFirstName("");
    setownerLastName("");
    setownerPhone("");
    setPackage("");
    setAccountExpiry("");
  }

  useEffect(() => {
    if (props.pageType == "EDIT") {
      GetAccountInfo(params.id as string).then(result => {
        if (result.code == 200) {
          setAccountExpiry(result.data.expires.split('T')[0]);
          setPackage(translateIds("ID",result.data.packageId));
          setAccountName(result.data.name);
          setownerEmail(result.data.owner[0].email);
          setownerFirstName(result.data.owner[0].firstName);
          setownerLastName(result.data.owner[0].lastName);
          setownerPhone(result.data.owner[0].phone);
          setPageLoading(false)
        } else {
          console.log(result.data)
        }
      }).catch((err) => console.log(err))
    } else setPageLoading(false)
  }, [])

  function saveAddButtonHandler () {
    setBtnLoading(true);
    if (props.pageType === 'ADD'){
      CreateAccount(
        {accountName: accountName, 
        ownerEmail:ownerEmail, 
        ownerFirstName: ownerFirstName, 
        ownerLastName:ownerLastName, 
        ownerPhone:ownerPhone, 
        packageId: translateIds("TEXT", accountPackage), 
        expiryDate:accountExpiry
      }).then(result => {
        if (result.code == 200) {
          setBtnLoading(false)
          resetForms();
          Notif?.setNotification({type:"OK", message:"Account Created", id:1})
        } else {
          console.log(result.data)
          Notif?.setNotification({type:"ERROR", message:result.data.message, id:1})
          setBtnLoading(false)
        }
      })
      }
    else if (props.pageType === 'EDIT') {
      EditAccount(params.id as string,
        {accountName: accountName, 
        ownerEmail:ownerEmail, 
        ownerFirstName: ownerFirstName, 
        ownerLastName:ownerLastName, 
        ownerPhone:ownerPhone, 
        packageId: translateIds("TEXT", accountPackage), 
        expiryDate:accountExpiry
      }).then(result => {
        if (result.code == 200) {
          setBtnLoading(false)
          Notif?.setNotification({type:"OK", message:"Account Edited", id:1})
        } else {
          console.log(result.data)
          Notif?.setNotification({type:"ERROR", message:result.data.message, id:1})
          setBtnLoading(false)
        }
      })
    }
  }

  function deleteAccountHandler () {
    DeleteAccount(params.id as string).then(result => {
      if (result.code == 200) {
        console.log(result.data)
        setModalState(false)
        Notif?.setNotification({type:"OK", message:"Account Deleted", id:1})
        setTimeout(() => {
          navigate('/dashboard/accounts',{state: true})
        }, 750);
      } else {
        console.log(result.data);
        Notif?.setNotification({type:"ERROR", message:result.data.message, id:1})        
      }
    }).catch(err => {
      console.log(err)
    })
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
						<Form.Select size="sm" id="Select" onChange={(e) => setPackage(e.target.value)} value={accountPackage}>
              <option value={"FREE TRIAL"}>Free Trial</option>
              <option value={"STANDARD"}>Standard</option>
            </Form.Select>
					</Form.Group>
          <Form.Group className="mb-3" controlId="AddMemberEmail">
						<Form.Label><Sb_Text font={16}>Expires On</Sb_Text></Form.Label>
						<Form.Control size="sm" type="date" placeholder="DD-MM-YYYY" value={accountExpiry} onChange={(e) => setAccountExpiry(e.target.value)}/>
					</Form.Group>
          {
            props.pageType === 'EDIT' ? <Button className="mt-3" size="sm" variant="light" onClick={() => setModalState(true)}><Sb_Text color="--DangerRed">Delete Account</Sb_Text></Button> : null
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
       {/* ---------------------------------The Modal------------------------------------------------------ */}
       <Sb_Modal show={modalState} onHide={() => setModalState(false)} 
      header="Are You Sure?" width={30}>
          <>
            <div className="d-block text-center" style={{'fontSize':'4em'}}>
              <FontAwesomeIcon icon={faTrash}/>
              <Sb_Text font={20} weight={500} align="center">Are you sure you want to delete this account?
               This action can't be undone.</Sb_Text>
            </div>
            <div>
              <Button variant="danger" size="sm" className="mt-3 float-start" onClick={() => deleteAccountHandler()}>
                <Sb_Text font={16} color="--lightGrey">Continue</Sb_Text>
              </Button>
              <Button variant="secondary" size="sm" className="mt-3 float-end"  onClick={() => setModalState(false)}>
                <Sb_Text font={16} color="--lightGrey">Cancel</Sb_Text>
              </Button>
            </div>
          </>        
      </Sb_Modal>
    </Col>
  )
}