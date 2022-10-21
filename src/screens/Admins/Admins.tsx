import { useContext, useEffect, useReducer, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Member_Card from "../../components/Sb_Member_Card/Sb_Member_Card";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { useAuth } from "../../states/AuthContext";
import { NotifContext } from "../../states/NotifContext";
import { AddAdmin, DeleteAdmin, GetAdmins } from "../../utils/api";
import { decodeJWT, translateIds } from "../../utils/helpers";

interface Admin {
  _id: string,
  name: string
}

export default function Admins() {
  const {token, setAuthToken} = useAuth();
  const Notif = useContext(NotifContext);
	/*############# STATES ############### */
	const [adminEmail, setadminEmail] = useState("");
	const [adminFirstName, setadminFirstName] = useState("");
	const [adminLastName, setadminLastName] = useState("");
	const [adminPassword, setadminPassword] = useState("");
  const [adminRole, setAdminRole] = useState("ADMIN");
	const [pageLoading, setPageLoading] = useState(false);
	const [btnLoading, setBtnLoading] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([
    // { _id: "String", name: "Admin 1" },
    // { _id: "String", name: "Admin 2" }
  ]);

  useEffect(() => {
    GetAdmins().then(result => {
      if (result.code == 200) {
        var admins:Admin[] = [];
        (result.data as []).forEach((admin:any) => {
          admins.push({_id: admin._id, name: admin.firstName+' '+admin.lastName})
        })
        setAdmins(admins);
      } else console.log(result.data)
    }).catch((err) => console.log(err))
  }, [])  

  function clearform () {
    setadminEmail("")
    setadminFirstName("")
    setadminLastName("")
    setadminPassword("")
    setAdminRole("ADMIN")
  }

  function deleteAdminHandler (id: string) {
    if (id !== decodeJWT(token as string)._id){
      DeleteAdmin(id).then(result => {
        if (result.code == 200) {
          Notif?.setNotification({type:"OK", message:"Admin Deleted", id:1})
          GetAdmins().then(result => {
            if (result.code == 200) {
              var admins:Admin[] = [];
              (result.data as []).forEach((admin:any) => {
                admins.push({_id: admin._id, name: admin.firstName+' '+admin.lastName})
              })
              setAdmins(admins);
            } else console.log(result.data)
          }).catch((err) => console.log(err))
        } else {
          console.log(result.data);
          Notif?.setNotification({type:"ERROR", message:result.data.message, code:result.code, id:1})
        }
      })
    } else {
      Notif?.setNotification({type:"ERROR", message:"Can't delete self", code:403, id:1})
    }
  }

  function addAdminHandler () {
    setBtnLoading(true)
    console.log(">>", adminRole);
    AddAdmin({adminFirstName: adminFirstName, adminLastName: adminLastName, adminEmail: adminEmail, password: adminPassword, roleId: translateIds('TEXT', adminRole)})
    .then(result => {
      if (result.code == 200) {
        Notif?.setNotification({type:"OK", message:"Admin Created", id:1})
        clearform()
        GetAdmins().then(result => {
          if (result.code == 200) {
            var admins:Admin[] = [];
            (result.data as []).forEach((admin:any) => {
              admins.push({_id: admin._id, name: admin.firstName+' '+admin.lastName})
            })
            setAdmins(admins);
          } else console.log(result.data)
        }).catch((err) => console.log(err))
        setBtnLoading(false)
      } else {
        console.log(result.data);
        setBtnLoading(false)
        Notif?.setNotification({type:"ERROR", message:result.data.message, code:result.code, id:1})
      }
    })
  }
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
							<Form.Select size="sm" id="Select" onChange={(e) => {setAdminRole(e.target.value);}}>
								<option value={"ADMIN"}>Admin</option>
								<option value={"SUPER"}>Super Admin</option>
							</Form.Select>
						</Form.Group>
						<Button className="mt-3" size="sm" style={{ 'float': 'right' }} onClick={() => addAdminHandler()}>
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
              {
                admins.map((admin:Admin) => (
                  <Col key={admin._id}>
                    <Sb_Member_Card id={admin._id} name={admin.name} onDelete={(id) => deleteAdminHandler(id)} onClick={(id) => console.log("CLICK ADMIN")}/>
                  </Col>
                ))
              }
						</Row>
					</Col>
				</Row>
			</Col>
	)
}