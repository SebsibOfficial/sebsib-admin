import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { RequestCard, Sb_RequestCard } from "../../components/Sb_RequestCard/Sb_RequestCard";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { NotifContext } from "../../states/NotifContext";
import { CreateAccount, DecideRequest, EditAccount, GetRequests } from "../../utils/api";
import { translateIds } from "../../utils/helpers";

export default function Requests() {
  const Notif = useContext(NotifContext);
	const [pageLoading, setPageLoading] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [requests, setRequests] = useState<RequestCard[]>([
    // {status: 'DECLINED', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'RENEWAL', organization: 'xasd'},
    // {status: 'APPROVED', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'RENEWAL', organization: 'asd'},
    
    // {bank:'cbe', transactionNo: '4576891320', firstname: 'Abebe', lastname: 'Demeke', phone: '0998754334', email: 'yasgidbhk@asgh.as', package:'free', type: 'REGISTER', organization: 'asd'}
  ]);

  useEffect(() => {
    GetRequests().then(result => {
      if (result.code == 200) {
        setPageLoading(false);
        var Requests:RequestCard[] = [];
        (result.data as []).forEach((req:any) => {
          Requests.push({
            id: req._id,
            firstname: req.firstName,
            lastname: req.lastName,
            type: req.type,
            email: req.email,
            phone: req.phone,
            package: translateIds("ID", req.packageId),
            organization: req.orgName,
            longOrgId: req.orgId,
            transactionNo: req.transactionNo,
            bank: req.bank,
            status: req.status,
            duration: req.subType
          })
        })
        setRequests(Requests)
      } else console.log(result.data)
    }).catch((err) => console.log(err))
  }, [])

  function addMonthsUTC (date:any, count:any) {
    if (date && count) {
      var m, d = (date = new Date(+date)).getUTCDate()
      date.setUTCMonth(date.getUTCMonth() + count, 1)
      m = date.getUTCMonth()
      date.setUTCDate(d)
      if (date.getUTCMonth() !== m) date.setUTCDate(0)
    }
    var formated = date.getFullYear()+'-'+ (date.getMonth() + 1 ) +'-'+date.getDate()
    return formated;
  }

  function addyearsUTC (date:any, count:any) {
    if (date && count) {
      var m, d = (date = new Date(+date)).getUTCDate()
      date.setYear(date.getFullYear() + count, 1)
      m = date.getFullYear()
      date.setUTCDate(d)
      if (date.getFullYear() !== m) date.setUTCDate(0)
    }
    var formated = date.getFullYear()+'-'+ (date.getMonth() + 1 ) +'-'+date.getDate()
    return formated;
  }

  function decideDate(subType: string, type: string, currDate?: string) {
    var dt = "";
    if (type == "REGISTER") {
      if (subType == "ONE_MONTH")
        dt = addMonthsUTC(new Date(), 1)
      else if (subType == "ONE_YEAR")
        dt = addyearsUTC(new Date(), 1)
    } else {
      if (subType == "ONE_MONTH")
        dt = addMonthsUTC(new Date(currDate ?? ''), 1)
      else if (subType == "ONE_YEAR")
        dt = addyearsUTC(new Date(currDate ?? ''), 1)
    }
    return dt;
  }

  async function renewAccount (id: string, accountName: string, ownerEmail:string, ownerFirstName: string, ownerLastName:string, ownerPhone:string, packageId: string, expiryDate:string) {
    var result = await EditAccount(id,
      {accountName: accountName, 
      ownerEmail:ownerEmail, 
      ownerFirstName: ownerFirstName, 
      ownerLastName:ownerLastName, 
      ownerPhone:ownerPhone, 
      packageId: packageId, 
      expiryDate:expiryDate
    })
      if (result.code == 200) {
        setBtnLoading(false)
        Notif?.setNotification({type:"OK", message:"Account Renewed", id:1})
      } else {
        console.log(result.data)
        Notif?.setNotification({type:"ERROR", message:result.data.message, id:1})
        setBtnLoading(false)
      }
  }

  async function reloadRequests () {
    var result = await GetRequests()
    if (result.code == 200) {
      setPageLoading(false);
      var Requests:RequestCard[] = [];
      (result.data as []).forEach((req:any) => {
        Requests.push({
          id: req._id,
          firstname: req.firstName,
          lastname: req.lastName,
          type: req.type,
          email: req.email,
          phone: req.phone,
          package: translateIds("ID", req.packageId),
          organization: req.orgName,
          longOrgId: req.orgId,
          transactionNo: req.transactionNo,
          bank: req.bank,
          status: req.status,
          duration: req.subType
        })
      })
      setRequests(Requests)
    } else {
      console.log(result.data)
      Notif?.setNotification({type:"ERROR", message:result.data.message, code:result.code, id:1})
    }
  }

  async function registerAccount (accountName: string, ownerEmail:string,  ownerFirstName: string,   ownerLastName: string,  ownerPhone:string,  packageId: string, expiryDate: string) {
    var result = await CreateAccount(
      {accountName: accountName, 
      ownerEmail:ownerEmail, 
      ownerFirstName: ownerFirstName, 
      ownerLastName: ownerLastName, 
      ownerPhone:ownerPhone, 
      packageId: packageId, 
      expiryDate: expiryDate
    })
    if (result.code == 200) {
      setBtnLoading(false)
    } else {
      console.log(result.data)
      Notif?.setNotification({type:"ERROR", message:result.data.message, id:1})
      setBtnLoading(false)
    }
  }

  function onDecisionHandler (decision: "APPROVE" | "DECLINE", id: string) {
    var reqObj = requests.filter((req) => req.id == id)[0];
    if (decision == 'APPROVE') {
      // IF APPROVED IS CLICKED
      if (reqObj.type == "REGISTER") {
        // IF REGISTER, CREATE ACCOUNT
        registerAccount(reqObj.organization, reqObj.email, 
          reqObj.firstname, reqObj.lastname, reqObj.phone,
          translateIds("TEXT", reqObj.package), decideDate(reqObj.duration, reqObj.type)).then(() => {
            // APPROVE REQUEST
            DecideRequest({descision: decision, requestId: id}).then((result) => {
              if (result.code == 200) {
                Notif?.setNotification({type:"OK", message:"Approved & Account Created", id:1})
                reloadRequests();
              } else {
                console.log(result.data)
                Notif?.setNotification({type:"ERROR", message:result.data.message, id:1})
                setBtnLoading(false)
              } 
            }).catch(err => {
              console.log(err)
            })
        })
      }
      else if(reqObj.type == "RENEWAL") {
        // IF RENEWAL, EDIT ACCOUNT NEW DATE, PACKAGE
        var dt = new Date();
        var formDate = dt.toISOString().replace(/T.*/,'');
        renewAccount(reqObj.longOrgId, reqObj.organization, reqObj.email, 
          reqObj.firstname, reqObj.lastname, reqObj.phone, 
          translateIds("TEXT", reqObj.package), 
          decideDate(reqObj.duration, reqObj.type, formDate)).then(() => {
            // APPROVE REQUEST
            DecideRequest({descision: decision, requestId: id}).then((result) => {
              if (result.code == 200) {
                Notif?.setNotification({type:"OK", message:"Approved & Account Renewed", id:1})
                reloadRequests()
              } else {
                console.log(result.data)
                Notif?.setNotification({type:"ERROR", message:result.data.message, id:1})
                setBtnLoading(false)
              } 
            }).catch(err => {
              console.log(err)
            })
        })
      }
    } else {
      // IF DECLINED
      DecideRequest({descision: decision, requestId: id}).then((result) => {
        if (result.code == 200) {
          Notif?.setNotification({type:"OK", message:"Request Denied", id:1})
          reloadRequests();
        } else {
          console.log(result.data)
          Notif?.setNotification({type:"ERROR", message:result.data.message, id:1})
          setBtnLoading(false)
        } 
      }).catch(err => {
        console.log(err)
      })
      reloadRequests()
      Notif?.setNotification({type:"OK", message:"Request Declined", id:1})
    }
  }

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
                requests.filter((request:RequestCard) => request.status !== 'APPROVED' && request.status !== 'DECLINED').map((request:RequestCard, index: number) => (
                  <Sb_RequestCard key={index} data={request} onApprove={(id: any) => onDecisionHandler("APPROVE", id)} onDecline={(id: any) => onDecisionHandler("DECLINE", id)}/>
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
                <Form.Control size="sm" type="text" placeholder="Search by Organization" onChange={(e) => setSearch(e.target.value)}/>
              </Form.Group>
            </Col>
					</Row>
					<Row>
						<Col>
            {
                requests
                .filter((request:RequestCard) => request.status === 'APPROVED' || request.status === 'DECLINED')
                .filter((request:RequestCard) => request.organization.includes(search))
                .map((request:RequestCard, index:number) => (
                  <Sb_RequestCard key={index} data={request} onApprove={() => console.log('APPROVE')} onDecline={() => console.log('DECLINE')}/>
                ))
              }
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}